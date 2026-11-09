"use client";

import { useEffect, useMemo, useState } from "react";

type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  body?: string;
};
type Draft = Post & { updatedAt?: string; revision: number };

const emptyPost: Post = {
  slug: "", title: "", description: "", category: "Construction",
  tags: [], publishedAt: "", body: "",
};
function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminPostEditor({ posts }: { posts: Post[] }) {
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState<Post>(emptyPost);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [publishedSlugs, setPublishedSlugs] = useState<string[]>([]);
  const [replaceBody, setReplaceBody] = useState(false);
  useEffect(() => {
    let active = true;
    fetch("/api/admin/drafts", { cache: "no-store", credentials: "same-origin" })
      .then(async response => {
        if (!response.ok) throw new Error(response.status === 503 ? "Database unavailable. Configure D1 before saving." : "Unable to load drafts.");
        return response.json() as Promise<{drafts: Draft[]}>;
      })
      .then(data => {
        if (!active) return;
        setDrafts(Object.fromEntries(data.drafts.map(draft => [draft.slug, draft])));
        setReady(true);
      })
      .catch(error => {
        if (!active) return;
        setMessage(error instanceof Error ? error.message : "Unable to load drafts.");
      });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    fetch("/api/admin/publish", { cache: "no-store", credentials: "same-origin" })
      .then(async response => {
        if (!response.ok) throw new Error("Publication status is unavailable. Run both D1 migrations.");
        return response.json() as Promise<{ posts: { slug: string }[] }>;
      })
      .then(data => setPublishedSlugs(data.posts.map(post => post.slug)))
      .catch(error => setMessage(error instanceof Error ? error.message : "Publication status unavailable."));
  }, []);
  const allPosts = useMemo(() => {
    const combined = new Map(posts.map(p => [p.slug, p]));
    Object.values(drafts).forEach(post => combined.set(post.slug, post));
    return [...combined.values()].filter(p => (p.title + " " + p.slug).toLowerCase().includes(query.toLowerCase()));
  }, [posts, drafts, query]);
  function openPost(post: Post) {
    setSelected(post.slug);
    setForm({ ...post, tags: [...post.tags] });
    setReplaceBody(false);
    setMessage("");
  }
  function newPost() {
    setSelected(null);
    setReplaceBody(true);
    setForm({ ...emptyPost, tags: [], publishedAt: new Date().toISOString().slice(0, 10) });
    setMessage("");
  }
  async function saveDraft() {
    if (!ready || busy) return;
    const slug = slugify(form.slug || form.title);
    if (!slug || !form.title.trim()) {
      setMessage("A title and URL slug are required.");
      return;
    }
    if (selected && slug !== selected) {
      setMessage("Changing an existing URL slug is disabled to protect SEO and backlinks.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/drafts", {
        method: "POST", cache: "no-store", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slug, body: form.body || "",
          expectedRevision: drafts[slug]?.revision ?? 0 }),
      });
      const result = await response.json() as { draft?: Draft; error?: string };
      if (!response.ok || !result.draft) {
        throw new Error(result.error || "Could not save draft.");
      }
      const saved = result.draft;
      setDrafts(previous => ({ ...previous, [slug]: saved }));
      setSelected(slug);
      setForm(saved);
      setMessage("Saved to D1 database as a draft. Live published content has NOT changed.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save draft.");
    } finally {
      setBusy(false);
    }
  }
  async function publishPost() {
    const slug = slugify(form.slug || form.title);
    const saved = drafts[slug];
    if (!saved || !selected || !ready) { setMessage("Save this draft first."); return; }
    if (JSON.stringify({ ...form, updatedAt: undefined, revision: undefined }) !==
        JSON.stringify({ ...saved, updatedAt: undefined, revision: undefined })) {
      setMessage("Unsaved changes. Save draft before publishing.");
      return;
    }
    if (!window.confirm("Publish the saved version to CornerSpan? Check the preview and SEO description first.")) return;
    setBusy(true);
    try {
      const response = await fetch("/api/admin/publish", {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({slug, revision: saved.revision, replaceBody}),
      });
      const result = await response.json() as { published?: boolean; error?: string };
      if (!response.ok || !result.published) throw new Error(result.error || "Publish failed.");
      setPublishedSlugs(old => [...new Set([...old, slug])]);
      setMessage("Published. Verify the live URL, content and canonical SEO before sharing.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Publish failed.");
    } finally { setBusy(false); }
  }
  async function unpublishPost() {
    if (!selected || !publishedSlugs.includes(selected)) return;
    if (!window.confirm("Remove the CMS publication? Existing built-in articles will revert to their original versions.")) return;
    setBusy(true);
    try {
      const response = await fetch("/api/admin/publish?slug=" + encodeURIComponent(selected), {
        method: "DELETE", credentials: "same-origin",
      });
      const result = await response.json() as { unpublished?: boolean; error?: string };
      if (!response.ok || !result.unpublished) throw new Error(result.error || "Could not unpublish.");
      setPublishedSlugs(old => old.filter(slug => slug !== selected));
      setMessage("CMS publication removed. Built-in legacy articles remain available.");
    } catch(error) {
      setMessage(error instanceof Error ? error.message : "Unpublish failed.");
    } finally { setBusy(false); }
  }
  function exportDraft() {
    const payload = JSON.stringify({ ...form, slug: slugify(form.slug || form.title) }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = (slugify(form.slug || form.title) || "post") + "-draft.json";
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Development dashboard — not a publishing system.</strong> Drafts are saved to the configured Cloudflare D1 database.
          Existing article bodies are currently React components and cannot be changed here.
          Publishing requires verified Cloudflare Access and the configured D1 database. Existing article pages are retained unless you explicitly replace the body.
        </div>
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-sm font-semibold text-blue-700">CornerSpan / Admin</p>
            <h1 className="text-3xl font-bold">Post dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">{posts.length} existing posts · {Object.keys(drafts).length} local drafts</p>
          </div>
          <button onClick={newPost} className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800">+ New draft</button>
        </header>
        <div className="grid gap-5 lg:grid-cols-[310px_minmax(0,1fr)]">
          <aside className="rounded-xl border bg-white p-4 shadow-sm">
            <label htmlFor="post-search" className="mb-2 block text-sm font-semibold">Search posts</label>
            <input id="post-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by title or slug" className="mb-3 w-full rounded-lg border p-3" />
            <div className="max-h-[75vh] space-y-1 overflow-auto">
              {allPosts.map(post => (
                <button key={post.slug} onClick={() => openPost(post)} className={`block w-full rounded-lg px-3 py-3 text-left hover:bg-blue-50 ${selected === post.slug ? "bg-blue-50 ring-1 ring-blue-300" : ""}`}>
                  <span className="block text-sm font-semibold">{post.title}</span>
                  <span className="mt-1 block break-all text-xs text-slate-500">/blog/{post.slug}</span>
                  {publishedSlugs.includes(post.slug) && <span className="mr-2 text-xs font-semibold text-green-700">Published in CMS</span>}{drafts[post.slug] && <span className="text-xs font-semibold text-amber-700">D1 draft</span>}
                </button>
              ))}
              {allPosts.length === 0 && <p className="p-3 text-sm text-slate-500">No matching posts.</p>}
            </div>
          </aside>
          <section className="rounded-xl border bg-white p-5 shadow-sm md:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">{selected ? "Edit draft metadata" : "New post draft"}</h2>
              {selected && <a target="_blank" rel="noreferrer" href={`/blog/${selected}`} className="text-sm font-semibold text-blue-700 underline">View live post</a>}
            </div>
            <form onSubmit={e => {e.preventDefault(); saveDraft();}} className="space-y-5">
              <label className="block text-sm font-semibold">Post title
                <input value={form.title} onChange={e => setForm({...form,title:e.target.value})} className="mt-1 block w-full rounded-lg border p-3 font-normal" required maxLength={160} />
              </label>
              <label className="block text-sm font-semibold">URL slug
                <input value={form.slug} onChange={e => setForm({...form,slug:e.target.value})} readOnly={selected !== null} className="mt-1 block w-full rounded-lg border p-3 font-normal read-only:bg-slate-100" placeholder="new-construction-guide" />
                <span className="mt-1 block text-xs font-normal text-slate-500">Existing slugs are locked to protect indexed URLs.</span>
              </label>
              <label className="block text-sm font-semibold">SEO description
                <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={3} className="mt-1 block w-full rounded-lg border p-3 font-normal" />
                <span className="mt-1 block text-xs font-normal text-slate-500">{form.description.length} characters</span>
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm font-semibold">Category
                  <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="mt-1 block w-full rounded-lg border p-3 font-normal" />
                </label>
                <label className="block text-sm font-semibold">Tags (comma-separated)
                  <input value={form.tags.join(", ")} onChange={e=>setForm({...form,tags:e.target.value.split(",").map(s=>s.trim()).filter(Boolean)})} className="mt-1 block w-full rounded-lg border p-3 font-normal" />
                </label>
              </div>
              <label className="block text-sm font-semibold">New draft body (Markdown notes only)
                <textarea value={form.body || ""} onChange={e=>setForm({...form,body:e.target.value})} rows={9} placeholder="Draft your new article here. Not connected to published articles." className="mt-1 block w-full rounded-lg border p-3 font-mono text-sm font-normal" />
              </label>
              <label className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm">
                <input type="checkbox" checked={replaceBody} disabled={!selected && !form.title.trim()} onChange={e=>setReplaceBody(e.target.checked)} className="mt-1"/>
                <span><strong>Publish this Markdown body as the complete article.</strong> For built-in posts, leave unchecked to preserve the current article body and change only its metadata. Replacing the body removes special embedded calculators/figures, so review the preview carefully.</span>
              </label>
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50" disabled={!ready || busy}>{busy ? "Saving..." : "Save D1 draft"}</button>
                <button type="button" onClick={publishPost} disabled={!ready || busy || !selected} className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white disabled:opacity-50">Publish saved draft</button>
                {selected && drafts[selected] && <a href={`/admin/preview/${selected}`} target="_blank" rel="noreferrer" className="rounded-lg border border-blue-300 px-5 py-3 font-semibold text-blue-700">Preview saved draft</a>}
                {selected && publishedSlugs.includes(selected) && <button type="button" onClick={unpublishPost} disabled={busy} className="rounded-lg border border-red-300 px-5 py-3 font-semibold text-red-700">Unpublish CMS version</button>}
                <button type="button" onClick={exportDraft} className="rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50">Export JSON</button>
              </div>
              {message && <p role="status" className="rounded-lg bg-slate-100 p-3 text-sm">{message}</p>}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
