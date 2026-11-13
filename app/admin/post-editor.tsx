"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { initialBodyReplacement, samePostContent, type PostContent } from "../../lib/admin-editor-state";

type Post = PostContent & { builtIn?: boolean; bodyOverride?: boolean };
type Draft = Post & { updatedAt?: string; revision: number };

const emptyPost: Post = {
  slug: "", title: "", description: "", category: "Construction",
  tags: [], publishedAt: "", body: "",
};
function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminPostEditor({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const editorRef = useRef<HTMLElement>(null);
  const [reloadNonce, setReloadNonce] = useState(0);
  const [draftLoadError, setDraftLoadError] = useState("");
  const [storageTestStatus, setStorageTestStatus] = useState("");
  const [storageTesting, setStorageTesting] = useState(false);
  const [publicationLoadError, setPublicationLoadError] = useState("");
  const showEditor = () => {
    // On narrow screens the editor is below a long post list; move to it after selection.
    window.requestAnimationFrame(() => editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const retryConnection = () => {
    setDraftLoadError("");
    setPublicationLoadError("");
    setReady(false);
    setPublicationReady(false);
    setReloadNonce(value => value + 1);
  };
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState<Post>(emptyPost);
  const [tagsText, setTagsText] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [publishedRevisions, setPublishedRevisions] = useState<Record<string, number>>({});
  const [publicationReady, setPublicationReady] = useState(false);
  const [publishedBodyModes, setPublishedBodyModes] = useState<Record<string, boolean>>(
    () => Object.fromEntries(posts.map(post => [post.slug, post.bodyOverride === true]))
  );
  const publishedSlugs = Object.keys(publishedRevisions);
  const [replaceBody, setReplaceBody] = useState(false);
  useEffect(() => {
    let active = true;
    setDraftLoadError("");
    fetch("/api/admin/drafts", { cache: "no-store", credentials: "same-origin" })
      .then(async response => {
        if (!response.ok) throw new Error(response.status === 503 ? "Database unavailable. Configure D1 before saving." : "Unable to load drafts.");
        return response.json() as Promise<{drafts: Draft[]}>;
      })
      .then(data => {
        if (!active) return;
        setDrafts(Object.fromEntries(data.drafts.map(draft => [draft.slug, draft])));
        setDraftLoadError("");
        setReady(true);
      })
      .catch(error => {
        if (!active) return;
        setDraftLoadError(error instanceof Error ? error.message : "Unable to load drafts.");
      });
    return () => { active = false; };
  }, [reloadNonce]);
  useEffect(() => {
    let active = true;
    setPublicationLoadError("");
    fetch("/api/admin/publish", { cache: "no-store", credentials: "same-origin" })
      .then(async response => {
        if (!response.ok) throw new Error("Publication status is unavailable. Run both D1 migrations.");
        return response.json() as Promise<{ posts: { slug: string; revision: number }[] }>;
      })
      .then(data => {
        if (!active) return;
        setPublishedRevisions(Object.fromEntries(data.posts.map(post => [post.slug, post.revision])));
        setPublicationLoadError("");
        setPublicationReady(true);
      })
      .catch(error => { if (active) setPublicationLoadError(error instanceof Error ? error.message : "Publication status unavailable."); });
    return () => { active = false; };
  }, [reloadNonce]);
  const allPosts = useMemo(() => {
    const combined = new Map(posts.map(p => [p.slug, p]));
    Object.values(drafts).forEach(post => combined.set(post.slug, post));
    return [...combined.values()].filter(p => (p.title + " " + p.slug).toLowerCase().includes(query.toLowerCase()));
  }, [posts, drafts, query]);
  function openPost(post: Post) {
    setSelected(post.slug);
    setForm({ ...post, tags: [...post.tags] });
    setTagsText(post.tags.join(", "));
    setReplaceBody(initialBodyReplacement({
      builtIn: posts.find(item => item.slug === post.slug)?.builtIn,
      bodyOverride: publishedBodyModes[post.slug],
    }));
    setMessage("");
    showEditor();
  }
  function newPost() {
    setSelected(null);
    setReplaceBody(true);
    setForm({ ...emptyPost, tags: [], publishedAt: new Date().toISOString().slice(0, 10) });
    setTagsText("");
    setMessage("");
    showEditor();
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
      setTagsText(saved.tags.join(", "));
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
    if (!saved || !selected || !ready || !publicationReady || busy) { setMessage("Save the draft and wait for publication status to load."); return; }
    if (!samePostContent(form, saved)) {
      setMessage("Unsaved changes. Save draft before publishing.");
      return;
    }
    if (!window.confirm("Publish the saved version to CornerSpan? Check the preview and SEO description first.")) return;
    setBusy(true);
    try {
      const response = await fetch("/api/admin/publish", {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({slug, revision: saved.revision, replaceBody,
          expectedPublicationRevision: publishedRevisions[slug] ?? 0}),
      });
      const result = await response.json() as { published?: boolean; revision?: number; error?: string };
      if (!response.ok || !result.published || !result.revision) throw new Error(result.error || "Publish failed.");
      const revision = result.revision;
      setPublishedRevisions(old => ({ ...old, [slug]: revision }));
      setPublishedBodyModes(old => ({ ...old, [slug]: replaceBody }));
      router.refresh();
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
      const response = await fetch("/api/admin/publish?slug=" + encodeURIComponent(selected) +
        "&revision=" + publishedRevisions[selected], {
        method: "DELETE", credentials: "same-origin",
      });
      const result = await response.json() as { unpublished?: boolean; error?: string };
      if (!response.ok || !result.unpublished) throw new Error(result.error || "Could not unpublish.");
      setPublishedRevisions(old => {
        const next = { ...old }; delete next[selected]; return next;
      });
      setPublishedBodyModes(old => ({ ...old, [selected]: false }));
      router.refresh();
      setMessage("CMS publication removed. Built-in legacy articles remain available.");
    } catch(error) {
      setMessage(error instanceof Error ? error.message : "Unpublish failed.");
    } finally { setBusy(false); }
  }
  async function deleteDraft() {
    if (!selected || !drafts[selected]) return;
    if (!window.confirm("Delete the saved D1 draft? This does not delete any published article.")) return;
    setBusy(true);
    setMessage("");
    try {
      const previous = drafts[selected];
      const response = await fetch("/api/admin/drafts?slug=" + encodeURIComponent(selected) +
        "&revision=" + previous.revision, { method: "DELETE", credentials: "same-origin" });
      const data = await response.json() as { deleted?: boolean; error?: string };
      if (!response.ok || !data.deleted) throw new Error(data.error || "Could not delete draft.");
      setDrafts(current => {
        const next = { ...current };
        delete next[selected];
        return next;
      });
      const original = posts.find(post => post.slug === selected);
      if (original) { setForm(original); setTagsText(original.tags.join(", ")); }
      else { setSelected(null); setForm({ ...emptyPost }); setTagsText(""); }
      setMessage("Draft deleted. Published content remains unchanged.");
    } catch(error) {
      setMessage(error instanceof Error ? error.message : "Could not delete draft.");
    } finally { setBusy(false); }
  }
  async function runSafeStorageTest() {
    if (busy || storageTesting || !ready) return;
    setStorageTesting(true);
    setStorageTestStatus("Testing temporary D1 draft storage. Nothing will be published...");
    // New unique test slug; deliberately not present in the built-in article catalog.
    const slug = "admin-storage-check-" + Date.now().toString(36) + "-" +
      Math.random().toString(36).slice(2, 10);
    let revision: number | null = null;
    let wroteDraft = false;
    let failure = "";
    try {
      const post = {
        slug, title: "CornerSpan Temporary Storage Check",
        description: "Temporary private verification of database write, read, and delete operations.",
        category: "Construction", tags: ["admin-self-test"], publishedAt: "",
        body: "## Test only\n\nA temporary unpublished record.",
        expectedRevision: 0,
      };
      const created = await fetch("/api/admin/drafts", {
        method: "POST", cache: "no-store", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (!created.ok) throw Error("Draft write failed (HTTP " + created.status + ").");
      wroteDraft = true;
      const createdBody = await created.json() as { draft?: Draft };
      revision = createdBody.draft?.revision ?? null;
      if (!Number.isSafeInteger(revision) || (revision ?? 0) < 1)
        throw Error("Database did not return a saved draft revision.");

      const saved = await fetch("/api/admin/drafts", { cache: "no-store", credentials: "same-origin" });
      if (!saved.ok) throw Error("Draft read failed (HTTP " + saved.status + ").");
      const data = await saved.json() as { drafts?: Draft[] };
      const row = data.drafts?.find(draft => draft.slug === slug);
      if (!row || row.revision !== revision || row.title !== post.title || row.body !== post.body)
        throw Error("Saved draft did not match database read-back.");

      // A saved draft must NEVER be visible on a public article URL.
      const publicPage = await fetch("/blog/" + slug, { cache: "no-store" });
      if (publicPage.status !== 404)
        throw Error("Unpublished draft did not return HTTP 404 on its public URL.");

      const published = await fetch("/api/admin/publish", {
        cache: "no-store", credentials: "same-origin",
      });
      if (!published.ok) throw Error("Could not verify the publication table.");
      const publications = await published.json() as { posts?: { slug: string }[] };
      if (publications.posts?.some(post => post.slug === slug))
        throw Error("Unexpected test draft in published posts.");
    } catch (error) {
      failure = error instanceof Error ? error.message : "Storage test failed.";
    } finally {
      if (wroteDraft) {
        try {
          // Recover the revision if the write succeeded but its JSON response was interrupted.
          if (!revision) {
            const response = await fetch("/api/admin/drafts", {
              cache: "no-store", credentials: "same-origin",
            });
            if (response.ok) {
              const data = await response.json() as { drafts?: Draft[] };
              revision = data.drafts?.find(draft => draft.slug === slug)?.revision ?? null;
            }
          }
          if (!revision) throw Error("Temporary test record may need manual cleanup.");
          const removed = await fetch(
            "/api/admin/drafts?slug=" + encodeURIComponent(slug) + "&revision=" + revision,
            { method: "DELETE", credentials: "same-origin" },
          );
          if (!removed.ok) throw Error("Temporary test draft could not be deleted (HTTP " + removed.status + ").");
          const verify = await fetch("/api/admin/drafts", {
            cache: "no-store", credentials: "same-origin",
          });
          if (!verify.ok) throw Error("Could not verify draft deletion.");
          const remaining = await verify.json() as { drafts?: Draft[] };
          if (remaining.drafts?.some(draft => draft.slug === slug))
            throw Error("Temporary test draft still exists after deletion.");
        } catch (error) {
          const cleanError = error instanceof Error ? error.message : "Cleanup failed.";
          failure = [failure, cleanError, "Check draft slug: " + slug].filter(Boolean).join(" ");
        }
      }
      setStorageTestStatus(failure
        ? "Test failed: " + failure + " No content was published."
        : "PASS: D1 draft saved, reloaded, hidden from public blog, and deleted. No content was published.");
      setStorageTesting(false);
    }
  }

  async function signOut() {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
      if (!response.ok) throw Error("Could not end session.");
      window.location.replace("/admin/login");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not sign out.");
    }
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
    <div className="min-h-screen bg-slate-100 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Save a draft, preview it, then publish.</strong> Saving a draft does not change your live site.
          Existing article bodies stay in place unless you choose to publish a complete replacement.
        </div>
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-sm font-semibold text-blue-700">CornerSpan / Admin</p>
            <h1 className="text-3xl font-bold">Post dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">{posts.length} existing posts · {Object.keys(drafts).length} saved drafts</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={newPost} disabled={busy} className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white disabled:opacity-50">+ New draft</button>
            <button onClick={signOut} className="rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700">Sign out</button>
          </div>
        </header>
        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 text-sm" role="status" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="space-y-1">
              <p className={ready ? "font-semibold text-green-700" : draftLoadError ? "font-semibold text-red-700" : "font-semibold text-slate-700"}>
                Draft database: {ready ? "Connected" : draftLoadError ? "Connection failed" : "Connecting..."}
              </p>
              <p className={publicationReady ? "text-green-700" : publicationLoadError ? "text-red-700" : "text-slate-600"}>
                Publishing status: {publicationReady ? "Ready" : publicationLoadError ? "Unavailable" : "Loading..."}
              </p>
              {(draftLoadError || publicationLoadError) && <p className="text-red-700">
                {draftLoadError || publicationLoadError} {draftLoadError ? "Drafts cannot be saved until the database is connected." : "Draft saving remains available, but publishing is temporarily unavailable."}
              </p>}
            </div>
            {(draftLoadError || publicationLoadError) && <button type="button" onClick={retryConnection}
              className="rounded-lg border border-blue-300 px-4 py-2 font-semibold text-blue-700">Retry connection</button>}
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm">
          <button type="button" onClick={runSafeStorageTest}
            disabled={!ready || busy || storageTesting}
            className="rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white disabled:opacity-50">
            {storageTesting ? "Testing D1..." : "Test draft storage safely"}
          </button>
          <p className="min-w-0 flex-1 text-slate-700">
            Creates, checks, and deletes a temporary <strong>unpublished</strong> draft. Existing articles are untouched.
          </p>
          {storageTestStatus && <p role="status" className="w-full break-words font-semibold text-slate-800">{storageTestStatus}</p>}
        </div>
        <div className="grid gap-5 lg:grid-cols-[310px_minmax(0,1fr)]">
          <aside className="rounded-xl border bg-white p-4 shadow-sm">
            <label htmlFor="post-search" className="mb-2 block text-sm font-semibold">Search posts</label>
            <input id="post-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by title or slug" className="mb-3 w-full rounded-lg border p-3" />
            <div className="max-h-[75vh] space-y-1 overflow-auto">
              {allPosts.map(post => (
                <button key={post.slug} disabled={busy} onClick={() => openPost(post)} className={`block w-full rounded-lg px-3 py-3 text-left hover:bg-blue-50 ${selected === post.slug ? "bg-blue-50 ring-1 ring-blue-300" : ""}`}>
                  <span className="block text-sm font-semibold">{post.title}</span>
                  <span className="mt-1 block break-all text-xs text-slate-500">/blog/{post.slug}</span>
                  {publishedSlugs.includes(post.slug) && <span className="mr-2 text-xs font-semibold text-green-700">Published in CMS</span>}{drafts[post.slug] && <span className="text-xs font-semibold text-amber-700">D1 draft</span>}
                </button>
              ))}
              {allPosts.length === 0 && <p className="p-3 text-sm text-slate-500">No matching posts.</p>}
            </div>
          </aside>
          <section ref={editorRef} id="post-editor" className="scroll-mt-4 rounded-xl border bg-white p-5 shadow-sm md:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">{selected ? "Edit post draft" : "New post draft"}</h2>
              {selected && <a target="_blank" rel="noreferrer" href={`/blog/${selected}`} className="text-sm font-semibold text-blue-700 underline">View live post</a>}
            </div>
            <form onSubmit={e => {e.preventDefault(); saveDraft();}} className="space-y-5">
              <fieldset disabled={busy} className="space-y-5">
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
                  <input value={tagsText} onChange={e => {
                    const value = e.target.value;
                    setTagsText(value);
                    setForm(previous => ({ ...previous, tags: value.split(",").map(tag => tag.trim()).filter(Boolean) }));
                  }} className="mt-1 block w-full rounded-lg border p-3 font-normal" />
                </label>
              </div>
              <label className="block text-sm font-semibold">Article body (Markdown)
                <textarea value={form.body || ""} onChange={e=>setForm({...form,body:e.target.value})} rows={9} placeholder="Write the complete article in Markdown. Use ## section headings, lists, tables, links and images." className="mt-1 block w-full rounded-lg border p-3 font-mono text-sm font-normal" />
              </label>
              <label className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm">
                <input type="checkbox" checked={replaceBody} disabled={!selected && !form.title.trim()} onChange={e=>setReplaceBody(e.target.checked)} className="mt-1"/>
                <span><strong>Publish this Markdown body as the complete article.</strong> For built-in posts, leave unchecked to preserve the current article body and change only its metadata. Replacing the body removes special embedded calculators/figures, so review the preview carefully.</span>
              </label>
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50" disabled={!ready || busy}>{busy ? "Saving..." : "Save D1 draft"}</button>
                <button type="button" onClick={publishPost} disabled={!ready || !publicationReady || busy || !selected} className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white disabled:opacity-50">Publish saved draft</button>
                {selected && drafts[selected] && <a href={`/admin/preview/${selected}?replaceBody=${replaceBody ? "1" : "0"}`} className="rounded-lg border border-blue-300 px-5 py-3 font-semibold text-blue-700">Preview saved draft</a>}
                {selected && publishedSlugs.includes(selected) && <button type="button" onClick={unpublishPost} disabled={busy} className="rounded-lg border border-red-300 px-5 py-3 font-semibold text-red-700">Unpublish CMS version</button>}
                {selected && drafts[selected] && <button type="button" onClick={deleteDraft} disabled={busy} className="rounded-lg border border-amber-400 px-5 py-3 font-semibold text-amber-800">Delete draft</button>}
                <button type="button" onClick={exportDraft} className="rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50">Export JSON</button>
              </div>
              {message && <p role="status" className="rounded-lg bg-slate-100 p-3 text-sm">{message}</p>}
              </fieldset>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
