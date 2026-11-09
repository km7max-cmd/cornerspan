import { getCloudflareContext } from "@opennextjs/cloudflare";

export type DraftRecord = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  body: string;
  updatedAt: string;
  revision: number;
};

type Row = {
  slug: string; title: string; description: string; category: string;
  tags_json: string; published_at: string; body: string;
  updated_at: string; revision: number;
};
type D1Stmt = {
  bind: (...values: (string | number | null)[]) => D1Stmt;
  all: <T>() => Promise<{ results: T[] }>;
  first: <T>() => Promise<T | null>;
  run: () => Promise<{ success: boolean; meta?: { changes?: number } }>;
};
type D1Db = { prepare: (query: string) => D1Stmt };

export function draftDatabase(): D1Db | null {
  try {
    const env = getCloudflareContext().env as unknown as Record<string, unknown>;
    const db = env.ADMIN_DB as D1Db | undefined;
    return db && typeof db.prepare === "function" ? db : null;
  } catch {
    return null;
  }
}
export function fromRow(row: Row): DraftRecord {
  let tags: string[] = [];
  try {
    const parsed: unknown = JSON.parse(row.tags_json);
    if (Array.isArray(parsed)) tags = parsed.filter((tag): tag is string => typeof tag === "string");
  } catch { /* corrupt stored tags produce empty list */ }
  return {
    slug: row.slug, title: row.title, description: row.description,
    category: row.category, tags, publishedAt: row.published_at,
    body: row.body, updatedAt: row.updated_at, revision: row.revision,
  };
}
export async function listDrafts(db: D1Db): Promise<DraftRecord[]> {
  const { results } = await db.prepare(
    "SELECT * FROM admin_post_drafts ORDER BY updated_at DESC LIMIT 500"
  ).all<Row>();
  return results.map(fromRow);
}
export async function getDraft(db: D1Db, slug: string): Promise<DraftRecord | null> {
  const row = await db.prepare("SELECT * FROM admin_post_drafts WHERE slug = ?")
    .bind(slug).first<Row>();
  return row ? fromRow(row) : null;
}
export async function upsertDraft(db: D1Db, draft: Omit<DraftRecord, "updatedAt" | "revision">, expectedRevision: number): Promise<boolean> {
  const fields: (string | number)[] = [
    draft.title, draft.description, draft.category,
    JSON.stringify(draft.tags), draft.publishedAt, draft.body,
  ];
  // Insert-only for a new draft; conditional update for an existing revision.
  // Never overwrite another editor's newer revision.
  const result = expectedRevision === 0
    ? await db.prepare(`INSERT OR IGNORE INTO admin_post_drafts
        (slug, title, description, category, tags_json, published_at, body)
        VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(draft.slug, ...fields).run()
    : await db.prepare(`UPDATE admin_post_drafts
        SET title=?, description=?, category=?, tags_json=?, published_at=?, body=?,
          revision=revision+1, updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now')
        WHERE slug=? AND revision=?`).bind(...fields, draft.slug, expectedRevision).run();
  return Boolean(result.success && (result.meta?.changes ?? 0) > 0);
}
