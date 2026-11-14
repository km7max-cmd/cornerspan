import { safeUrl } from './cms-model';
export type InlineToken = { type: 'text' | 'strong' | 'em' | 'code' | 'link' | 'image'; text: string; url?: string; title?: string; linkUrl?: string };
export type MarkdownBlock = {
  type: 'heading' | 'paragraph' | 'code' | 'list' | 'table' | 'rule';
  text: string; depth?: number; id?: string; items?: string[]; rows?: string[][]; ordered?: boolean;
};
export function inlineTokens(text: string): InlineToken[] {
  const pattern = /(\[!\[[^\]\n]*\]\([^\s)]+(?:\s+"[^"\n]*")?\)\]\([^\s)]+\)|!?\[[^\]\n]*\]\([^\s)]+(?:\s+"[^"\n]*")?\)|\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g;
  const tokens: InlineToken[] = []; let offset = 0; let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > offset) tokens.push({ type: 'text', text: text.slice(offset, match.index) });
    const part = match[1];
    const linked = /^\[!\[([^\]\n]*)\]\(([^\s)]+)(?:\s+"([^"\n]*)")?\)\]\(([^\s)]+)\)$/.exec(part);
    const resource = /^(!?)\[([^\]\n]*)\]\(([^\s)]+)(?:\s+"([^"\n]*)")?\)$/.exec(part);
    if (linked && safeUrl(linked[2], { image: true }) && safeUrl(linked[4])) {
      tokens.push({ type: 'image', text: linked[1], url: linked[2], title: linked[3], linkUrl: linked[4] });
    } else if (resource && (safeUrl(resource[3], { image: Boolean(resource[1]) }) || (!resource[1] && /^#[\w-]+$/.test(resource[3])))) {
      tokens.push({ type: resource[1] ? 'image' : 'link', text: resource[2], url: resource[3], title: resource[4] });
    } else if (part.startsWith('**')) tokens.push({ type: 'strong', text: part.slice(2, -2) });
    else if (part.startsWith('*')) tokens.push({ type: 'em', text: part.slice(1, -1) });
    else if (part.startsWith('`')) tokens.push({ type: 'code', text: part.slice(1, -1) });
    else tokens.push({ type: 'text', text: part });
    offset = pattern.lastIndex;
  }
  if (offset < text.length) tokens.push({ type: 'text', text: text.slice(offset) });
  return tokens;
}
export function plainText(value: string): string { return inlineTokens(value).filter(t => t.type !== 'image').map(t => t.text).join(''); }
export function anchorBase(value: string): string {
  return plainText(value).normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
}
export function parseMarkdown(body: string): MarkdownBlock[] {
  const lines = body.replace(/\r\n?/g, '\n').split('\n'); const blocks: MarkdownBlock[] = [];
  const used = new Set<string>(); let i = 0;
  const startsBlock = (line: string) => /^(#{1,6}\s|[-*]\s|\d+\.\s|\|.+\|$|---$|```)/.test(line.trim());
  while (i < lines.length) {
    const line = lines[i].trim(); if (!line) { i++; continue; }
    if (line.startsWith('```')) {
      const code: string[] = []; i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) code.push(lines[i++]);
      if (i < lines.length) i++;
      blocks.push({ type: 'code', text: code.join('\n') }); continue;
    }
    const heading = /^(#{1,6})\s+(.+?)(?:\s+#+)?$/.exec(line);
    if (heading) {
      const base = anchorBase(heading[2]); let id = base; let n = 2;
      while (used.has(id)) id = `${base}-${n++}`;
      used.add(id);
      blocks.push({ type: 'heading', text: heading[2], depth: heading[1].length, id }); i++; continue;
    }
    if (/^\|.+\|$/.test(line)) {
      const rows: string[][] = [];
      while (i < lines.length && /^\|.+\|$/.test(lines[i].trim())) {
        const cells = lines[i++].trim().slice(1, -1).split('|').map(cell => cell.trim());
        if (!cells.every(cell => /^:?-{3,}:?$/.test(cell))) rows.push(cells);
      }
      blocks.push({ type: 'table', text: rows.flat().join(' '), rows }); continue;
    }
    if (/^[-*]\s|^\d+\.\s/.test(line)) {
      const ordered = /^\d+\./.test(line); const pattern = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
      const items: string[] = [];
      while (i < lines.length && pattern.test(lines[i].trim())) items.push(lines[i++].trim().replace(pattern, ''));
      blocks.push({ type: 'list', text: items.join(' '), items, ordered }); continue;
    }
    if (line === '---') { blocks.push({ type: 'rule', text: '' }); i++; continue; }
    const paragraph = [line]; i++;
    while (i < lines.length && lines[i].trim() && !startsBlock(lines[i])) paragraph.push(lines[i++].trim());
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }
  return blocks;
}
export function contentsFor(blocks: MarkdownBlock[]) { return blocks.filter(block => block.type === 'heading' && (block.depth === 2 || block.depth === 3)); }
export function wordCount(text: string): number { return (text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || []).length; }
