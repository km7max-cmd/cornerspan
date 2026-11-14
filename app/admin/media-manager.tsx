'use client';
import { useEffect, useState } from 'react';
import { emptyImage, safeUrl, type MediaImage, type MediaRecord } from '../../lib/cms-model';
export function ImageFields({ value, onChange, prefix = 'Featured image' }: { value: MediaImage; onChange: (image: MediaImage) => void; prefix?: string }) {
  const change = (key: keyof MediaImage, item: string | number | null) => onChange({ ...value, [key]: item });
  return <>
    <div className="cms-grid-two">{([['url', 'URL'], ['alt', 'ALT text'], ['title', 'title'], ['caption', 'caption'], ['sourceUrl', 'source URL'], ['linkUrl', 'click-through link']] as const).map(([key, label]) => <label className="cms-field" key={key}>{prefix} {label}<input type={key.includes('Url') || key === 'url' ? 'url' : 'text'} value={value[key]} onChange={e => change(key, e.target.value)} placeholder={key === 'url' ? 'https://… or /images/…' : key === 'alt' ? 'Describe what the image shows' : 'Optional'}/></label>)}</div>
    <div className="cms-grid-two">{(['width', 'height'] as const).map(key => <label className="cms-field" key={key}>{prefix} {key} (px)<input type="number" min="1" max="20000" value={value[key] ?? ''} onChange={e => change(key, e.target.value ? Number(e.target.value) : null)}/></label>)}</div>
    <p className="cms-help">Use a descriptive filename such as gravel-driveway-depth.webp. Add dimensions to reserve image space. Only use images you may publish.</p>
    {value.url && !safeUrl(value.url, { image: true }) && <p className="cms-error">Enter an HTTPS or site-relative image URL.</p>}
    {value.url && safeUrl(value.url, { image: true }) && <figure className="cms-image-preview"><img src={value.url} alt={value.alt} onLoad={e => { if (!value.width && !value.height) onChange({ ...value, width: e.currentTarget.naturalWidth || null, height: e.currentTarget.naturalHeight || null }); }}/><figcaption>{value.width && value.height ? `${value.width} × ${value.height} px` : 'Dimensions not recorded'}{!value.alt.trim() && ' · ALT text is missing'}</figcaption></figure>}
  </>;
}
export default function MediaManager({ onUse }: { onUse: (image: MediaImage, placement: 'featured' | 'inline') => void }) {
  const [media, setMedia] = useState<MediaRecord[]>([]); const [form, setForm] = useState<MediaImage>(emptyImage());
  const [edit, setEdit] = useState<MediaRecord | null>(null); const [query, setQuery] = useState(''); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  useEffect(() => { let active = true; fetch('/api/admin/media', { cache: 'no-store' }).then(async r => { const data = await r.json(); if (!r.ok) throw Error(data.error); if (active) setMedia(data.media); }).catch(e => { if (active) setMessage(e.message); }); return () => { active = false; }; }, []);
  async function save() {
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/admin/media', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: form, id: edit?.id, expectedRevision: edit?.revision || 0 }) });
      const data = await response.json(); if (!response.ok) throw Error(data.error);
      setMedia(old => [data.media, ...old.filter(m => m.id !== data.media.id)]); setEdit(null); setForm(emptyImage()); setMessage('Image saved to the media library. Articles change only when you select and publish an image.');
    } catch (e) { setMessage(e instanceof Error ? e.message : 'Could not save image'); } finally { setBusy(false); }
  }
  return <div className="cms-media-layout"><section className="cms-card"><div className="cms-card-heading"><div><span className="cms-eyebrow">Reusable images</span><h2>Media Library</h2></div><span className="cms-badge">{media.length} images</span></div>
    <label className="cms-field">Search images<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Title, ALT text or filename"/></label>
    <div className="cms-media-grid">{media.filter(m => `${m.url} ${m.title} ${m.alt}`.toLowerCase().includes(query.toLowerCase())).map(m => <div className="cms-media-item" key={m.id}><img src={m.url} alt={m.alt} loading="lazy"/><strong>{m.title || m.alt || 'Untitled image'}</strong><p>{m.width && m.height ? `${m.width} × ${m.height}` : 'Dimensions unknown'} · {m.alt ? 'ALT added' : 'Missing ALT'}</p><div className="cms-actions"><button onClick={() => onUse(m, 'featured')}>Set featured</button><button onClick={() => onUse(m, 'inline')}>Insert in article</button><button onClick={() => { setEdit(m); setForm(m); }}>Edit details</button></div></div>)}</div>
    {!media.length && <div className="cms-empty"><strong>Your image collection starts here</strong><p>Add a hosted image URL, ALT text and source details. Then reuse it in your articles.</p></div>}
  </section><section className="cms-card"><h2>{edit ? 'Edit image details' : 'Add image by URL'}</h2><p className="cms-help">File uploads are unavailable: no verified R2 or other upload storage is configured. Hosted image URLs work now.</p><fieldset disabled={busy}><ImageFields value={form} onChange={setForm} prefix="Library image"/><div className="cms-actions"><button className="cms-primary" onClick={save}>{busy ? 'Saving…' : 'Save image'}</button>{edit && <button onClick={() => { setEdit(null); setForm(emptyImage()); }}>Cancel edit</button>}</div></fieldset>{message && <p role="status" className="cms-notice">{message}</p>}</section></div>;
}
