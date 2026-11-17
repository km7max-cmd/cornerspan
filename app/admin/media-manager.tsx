'use client';
import { useEffect, useState, type ChangeEvent } from 'react';
import { emptyImage, safeUrl, type MediaImage, type MediaRecord } from '../../lib/cms-model';
import { MAX_IMAGE_BYTES } from '../../lib/cms-upload';
import { MAX_D1_IMAGE_BYTES } from '../../lib/cms-d1-images';


/** Optimize only in the browser. Keeps each D1 image small and avoids a new storage subscription. */
async function optimizeForD1(file: File): Promise<{ blob: Blob; width: number | null; height: number | null }> {
  if (file.size <= MAX_D1_IMAGE_BYTES) {
    try {
      const bitmap = await createImageBitmap(file);
      const result = { blob: file as Blob, width: bitmap.width, height: bitmap.height };
      bitmap.close();
      return result;
    } catch {
      return { blob: file, width: null, height: null };
    }
  }
  if (typeof createImageBitmap !== 'function') throw Error('Please choose a smaller image (under 350 KB).');
  let bitmap: ImageBitmap;
  try { bitmap = await createImageBitmap(file); }
  catch { throw Error('This image could not be opened. Choose a JPG, PNG or WebP photo.'); }
  try {
    for (const maxEdge of [1400, 1100, 850, 650, 500]) {
      const ratio = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
      const width = Math.max(1, Math.round(bitmap.width * ratio));
      const height = Math.max(1, Math.round(bitmap.height * ratio));
      const canvas = document.createElement('canvas');
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw Error('Browser image optimization is unavailable.');
      ctx.drawImage(bitmap, 0, 0, width, height);
      for (const quality of [0.82, 0.68, 0.52]) {
        const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/webp', quality));
        if (blob && blob.type === 'image/webp' && blob.size >= 12 && blob.size <= MAX_D1_IMAGE_BYTES) {
          return { blob, width, height };
        }
      }
    }
    throw Error('Photo is still too large after compression. Try a simpler or smaller photo.');
  } finally {
    bitmap.close();
  }
}

export function ImageFields({ value, onChange, prefix = 'Featured image', uploadAvailable }: { value: MediaImage; onChange: (image: MediaImage) => void; prefix?: string; uploadAvailable?: boolean }) {
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const change = (key: keyof MediaImage, item: string | number | null) => onChange({ ...value, [key]: item });

  async function uploadFromDevice(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file || uploading) return;
    if (uploadAvailable === false) { setUploadMessage('Image upload storage is not ready. You can still paste an image URL.'); return; }
    if (!file.size || file.size > MAX_IMAGE_BYTES) {
      setUploadMessage('Choose an image that is 5 MB or smaller.');
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp', ''].includes(file.type)) {
      setUploadMessage('Use a JPG, PNG or WebP image.');
      return;
    }
    setUploading(true);
    setUploadMessage('');
    try {
      // The server picks ImageKit Forever Free when configured; D1 remains a small
      // optional fallback. Never make the user compress to 350 KB for ImageKit.
      const capabilityResponse = await fetch('/api/admin/media/upload', {
        method: 'GET', credentials: 'same-origin', cache: 'no-store',
      });
      const capability = await capabilityResponse.json() as { uploadAvailable?: boolean; provider?: string; error?: string };
      if (!capabilityResponse.ok || !capability.uploadAvailable) {
        throw Error(capability.error || 'Image upload storage is not connected yet. An image URL still works.');
      }
      let optimized: { blob: Blob; width: number | null; height: number | null };
      if (capability.provider === 'd1') {
        optimized = await optimizeForD1(file);
      } else {
        let width: number | null = null;
        let height: number | null = null;
        try {
          const image = await createImageBitmap(file);
          width = image.width; height = image.height; image.close();
        } catch { /* Browser may not support reading dimensions. */ }
        optimized = { blob: file, width, height };
      }
      const response = await fetch('/api/admin/media/upload', {
        method: 'POST', credentials: 'same-origin', cache: 'no-store',
        headers: { 'Content-Type': optimized.blob.type || file.type || 'application/octet-stream' },
        body: optimized.blob,
      });
      const result = await response.json() as { url?: string; error?: string };
      if (!response.ok || !result.url) throw Error(result.error || 'Image upload failed.');
      const width = optimized.width;
      const height = optimized.height;
      const name = file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim().slice(0, 150);
      onChange({ ...value, url: result.url, title: value.title || name, width, height });
      setUploadMessage('Image uploaded. Add descriptive ALT text and save these details to keep it in the library or draft.');
    } catch (error) {
      setUploadMessage(error instanceof Error ? error.message : 'Unable to upload image.');
    } finally {
      setUploading(false);
    }
  }
  return <>
    <label className="cms-field">Upload {prefix.toLowerCase()} from your phone or computer
      <input type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        onChange={uploadFromDevice} disabled={uploading || uploadAvailable === false} aria-label={`Upload ${prefix.toLowerCase()} from device`}/>
    </label>
    <p className="cms-help">JPG, PNG or WebP up to 5 MB. ImageKit Forever Free stores full-size uploads (3 GB free storage, 20 GB delivery/month); small D1 backup uses automatic WebP compression. Image links still work.</p>
    {uploading && <p className="cms-notice" role="status">Uploading image…</p>}
    {uploadMessage && <p className={uploadMessage.startsWith('Image uploaded.') ? 'cms-notice' : 'cms-error'} role="status">{uploadMessage}</p>}
    <div className="cms-grid-two">{([['url', 'URL'], ['alt', 'ALT text'], ['title', 'title'], ['caption', 'caption'], ['sourceUrl', 'source URL'], ['linkUrl', 'click-through link']] as const).map(([key, label]) => <label className="cms-field" key={key}>{prefix} {label}<input type={key.includes('Url') || key === 'url' ? 'url' : 'text'} value={value[key]} onChange={e => change(key, e.target.value)} placeholder={key === 'url' ? 'https://… or /images/…' : key === 'alt' ? 'Describe what the image shows' : 'Optional'}/></label>)}</div>
    <div className="cms-grid-two">{(['width', 'height'] as const).map(key => <label className="cms-field" key={key}>{prefix} {key} (px)<input type="number" min="1" max="20000" value={value[key] ?? ''} onChange={e => change(key, e.target.value ? Number(e.target.value) : null)}/></label>)}</div>
    <p className="cms-help">Use a descriptive filename such as gravel-driveway-depth.webp. Add dimensions to reserve image space. Only use images you may publish.</p>
    {value.url && !safeUrl(value.url, { image: true }) && <p className="cms-error">Enter an HTTPS or site-relative image URL.</p>}
    {value.url && safeUrl(value.url, { image: true }) && <figure className="cms-image-preview"><img src={value.url} alt={value.alt} onLoad={e => { if (!value.width && !value.height) onChange({ ...value, width: e.currentTarget.naturalWidth || null, height: e.currentTarget.naturalHeight || null }); }}/><figcaption>{value.width && value.height ? `${value.width} × ${value.height} px` : 'Dimensions not recorded'}{!value.alt.trim() && ' · ALT text is missing'}</figcaption></figure>}
  </>;
}
export default function MediaManager({ onUse }: { onUse: (image: MediaImage, placement: 'featured' | 'inline') => void }) {
  const [media, setMedia] = useState<MediaRecord[]>([]); const [form, setForm] = useState<MediaImage>(emptyImage());
  const [uploadAvailable, setUploadAvailable] = useState<boolean | null>(null);
  const [edit, setEdit] = useState<MediaRecord | null>(null); const [query, setQuery] = useState(''); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  useEffect(() => { let active = true; fetch('/api/admin/media', { cache: 'no-store' }).then(async r => { const data = await r.json(); if (!r.ok) throw Error(data.error); if (active) { setMedia(data.media); setUploadAvailable(data.uploadAvailable === true); } }).catch(e => { if (active) setMessage(e.message); }); return () => { active = false; }; }, []);
  async function save() {
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/admin/media', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: form, id: edit?.id, expectedRevision: edit?.revision || 0 }) });
      const data = await response.json(); if (!response.ok) throw Error(data.error);
      setMedia(old => [data.media, ...old.filter(m => m.id !== data.media.id)]); setEdit(null); setForm(emptyImage()); setMessage('Image saved to the media library. Articles change only when you select and publish an image.');
    } catch (e) { setMessage(e instanceof Error ? e.message : 'Could not save image'); } finally { setBusy(false); }
  }
  async function remove(record: MediaRecord) {
    if (busy || !window.confirm('Delete this image from the media library? Images already used in articles will not change.')) return;
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/media?id=${encodeURIComponent(record.id)}&revision=${record.revision}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw Error(data.error || 'Could not delete image');
      setMedia(old => old.filter(item => item.id !== record.id));
      if (edit?.id === record.id) { setEdit(null); setForm(emptyImage()); }
      setMessage('Image removed from the media library. Existing article images were not changed.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not delete image');
    } finally { setBusy(false); }
  }
  return <div className="cms-media-layout"><section className="cms-card"><div className="cms-card-heading"><div><span className="cms-eyebrow">Reusable images</span><h2>Media Library</h2></div><span className="cms-badge">{media.length} images</span></div>
    <label className="cms-field">Search images<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Title, ALT text or filename"/></label>
    <div className="cms-media-grid">{media.filter(m => `${m.url} ${m.title} ${m.alt}`.toLowerCase().includes(query.toLowerCase())).map(m => <div className="cms-media-item" key={m.id}><img src={m.url} alt={m.alt} loading="lazy"/><strong>{m.title || m.alt || 'Untitled image'}</strong><p>{m.width && m.height ? `${m.width} × ${m.height}` : 'Dimensions unknown'} · {m.alt ? 'ALT added' : 'Missing ALT'}</p><div className="cms-actions"><button onClick={() => onUse(m, 'featured')}>Set featured</button><button onClick={() => onUse(m, 'inline')}>Insert in article</button><button onClick={() => { setEdit(m); setForm(m); }}>Edit details</button><button className="cms-danger" disabled={busy} onClick={() => remove(m)}>Remove from library</button></div></div>)}</div>
    {!media.length && <div className="cms-empty"><strong>Your image collection starts here</strong><p>Upload a JPG/PNG/WebP image from your device, or add an image URL. Save its ALT text and details to reuse it in your articles.</p></div>}
  </section><section className="cms-card"><h2>{edit ? 'Edit image details' : 'Upload or link an image'}</h2><p className="cms-help">Choose a photo from your device, or paste a hosted image URL. Set the ALT text and click Save image to reuse it in posts.</p>{uploadAvailable === false && <p className="cms-error" role="status">Image upload storage has not been connected yet. Add the ImageKit free-plan key securely; image links still work.</p>}<fieldset disabled={busy}><ImageFields value={form} onChange={setForm} prefix="Library image" uploadAvailable={uploadAvailable ?? undefined}/><div className="cms-actions"><button className="cms-primary" onClick={save}>{busy ? 'Saving…' : 'Save image'}</button>{edit && <button onClick={() => { setEdit(null); setForm(emptyImage()); }}>Cancel edit</button>}</div></fieldset>{message && <p role="status" className="cms-notice">{message}</p>}</section></div>;
}
