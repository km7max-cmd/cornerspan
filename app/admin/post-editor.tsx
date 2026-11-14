"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { initialBodyReplacement, samePostContent, type PostContent } from "../../lib/admin-editor-state";
import { defaultSeo, seoSettings, type SeoSettings, type MediaImage } from "../../lib/cms-model";
import { analyzeSeo, linkingSuggestions } from "../../lib/seo-analysis";
import CmsArticle from "../../components/blog/CmsArticle";
import SeoPanel, { Score, SearchPreview, SocialPreview } from "./seo-panel";
import MediaManager, { ImageFields } from "./media-manager";
import "./admin.css";

export type Post = PostContent & { builtIn?: boolean; bodyOverride?: boolean };
type Draft = Post & { updatedAt?: string; revision: number };

const emptyPost: Post = {
  slug: "", title: "", description: "", category: "Construction",
  tags: [], publishedAt: "", body: "",
};
function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminPostEditor({ posts, environment = "Environment not verified" }: { posts: Post[]; environment?: string }) {
  const router = useRouter();
  const [view, setView] = useState<'overview' | 'posts' | 'editor' | 'seo' | 'media' | 'settings'>('overview');
  const [filter, setFilter] = useState<'all' | 'drafts' | 'published'>('all');
  const [editorTab, setEditorTab] = useState<'content' | 'preview' | 'analysis'>('content');
  const [approveLegacy, setApproveLegacy] = useState(false);
  const [loadedRevision, setLoadedRevision] = useState(0);
  const [loadedPublicationRevision, setLoadedPublicationRevision] = useState(0);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
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
    setMessage("Connection reloaded. Reopen an article to load a newer saved revision; unsaved edits remain in this editor.");
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
        if (!response.ok) throw new Error("Publication status is unavailable. Check that all D1 migrations are applied in this environment.");
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
    return [...combined.values()];
  }, [posts, drafts]);
  function openPost(post: Post) {
    if (dirty && !window.confirm('Discard unsaved changes before opening another post?')) return;
    setLoadedRevision(drafts[post.slug]?.revision || 0);
    setLoadedPublicationRevision(publishedRevisions[post.slug] || 0);
    setApproveLegacy(false); setView('editor'); setEditorTab('content');
    setSelected(post.slug);
    setForm({ ...post, tags: [...post.tags], seo: seoSettings(post.seo) });
    setTagsText(post.tags.join(", "));
    setReplaceBody(post.seo?.bodyReplacement ?? initialBodyReplacement({
      builtIn: posts.find(item => item.slug === post.slug)?.builtIn,
      bodyOverride: publishedBodyModes[post.slug],
    }));
    setMessage("");
    showEditor();
  }
  function newPost() {
    if (dirty && !window.confirm('Discard unsaved changes and start a new post?')) return;
    setView('editor'); setEditorTab('content'); setLoadedRevision(0); setLoadedPublicationRevision(0); setApproveLegacy(false);
    setSelected(null);
    setReplaceBody(true);
    setForm({ ...emptyPost, seo: { ...defaultSeo(), bodyReplacement: true }, tags: [], publishedAt: new Date().toISOString().slice(0, 10) });
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
          expectedRevision: loadedRevision }),
      });
      const result = await response.json() as { draft?: Draft; error?: string };
      if (!response.ok || !result.draft) {
        throw new Error(result.error || "Could not save draft.");
      }
      const saved = result.draft;
      setDrafts(previous => ({ ...previous, [slug]: saved }));
      setSelected(slug);
      setForm(saved); setLoadedRevision(saved.revision);
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
    if (legacy && !approveLegacy) { setMessage('Existing article protected. Review and explicitly approve this article update.'); return; }
    if (!window.confirm(`Publish the saved version on ${window.location.host}? Review the preview and SEO first.`)) return;
    setBusy(true);
    try {
      const response = await fetch("/api/admin/publish", {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({slug, revision: saved.revision, replaceBody,
          expectedPublicationRevision: loadedPublicationRevision, approveLegacyUpdate: approveLegacy}),
      });
      const result = await response.json() as { published?: boolean; revision?: number; error?: string };
      if (!response.ok || !result.published || !result.revision) throw new Error(result.error || "Publish failed.");
      const revision = result.revision; setLoadedPublicationRevision(revision);
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
        "&revision=" + loadedPublicationRevision, {
        method: "DELETE", credentials: "same-origin",
      });
      const result = await response.json() as { unpublished?: boolean; error?: string };
      if (!response.ok || !result.unpublished) throw new Error(result.error || "Could not unpublish.");
      setPublishedRevisions(old => {
        const next = { ...old }; delete next[selected]; return next;
      });
      setPublishedBodyModes(old => ({ ...old, [selected]: false })); setLoadedPublicationRevision(0);
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
      const previous = { ...drafts[selected], revision: loadedRevision };
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
      setLoadedRevision(0); setView("posts");
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
  const seo = seoSettings(form.seo);
  const legacy = posts.find(p => p.slug === selected)?.builtIn === true;
  const saved = selected ? drafts[selected] : undefined;
  const baseline = saved || posts.find(p => p.slug === selected);
  const dirty = baseline ? !samePostContent(form, baseline) : Boolean(form.title || form.body || form.description || form.seo?.metaTitle);
  const analysis = useMemo(() => analyzeSeo(form, allPosts), [form, allPosts]);
  const suggestions = useMemo(() => linkingSuggestions(form, posts), [form, posts]);
  const isPublished = (post: Post) => posts.some(p => p.slug === post.slug && p.builtIn) || publishedSlugs.includes(post.slug);
  const filtered = allPosts.filter(p => `${p.title} ${p.slug} ${p.category} ${p.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()) && (filter === 'all' || (filter === 'drafts' ? Boolean(drafts[p.slug]) : isPublished(p))));
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', warn); return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  function setSeo<K extends keyof SeoSettings>(key: K, value: SeoSettings[K]) { setForm(old => ({ ...old, seo: { ...seoSettings(old.seo), [key]: value } })); }
  function insertMarkdown(before: string, after = '') {
    const body = form.body || ''; const start = bodyRef.current?.selectionStart ?? body.length; const end = bodyRef.current?.selectionEnd ?? start;
    setForm(old => ({ ...old, body: body.slice(0, start) + before + body.slice(start, end) + after + body.slice(end) }));
    window.requestAnimationFrame(() => { bodyRef.current?.focus(); bodyRef.current?.setSelectionRange(start + before.length, end + before.length); });
  }
  function useImage(image: MediaImage, placement: 'featured' | 'inline') {
    if (placement === 'featured') setSeo('featuredImage', image);
    else {
      const markdown = `![${image.alt.replace(/[\[\]\n]/g, ' ')}](${image.url}${image.title ? ' "' + image.title.replace(/["\n]/g, '') + '"' : ''})`;
      setForm(old => ({ ...old, body: (old.body || '') + `\n\n${image.linkUrl ? `[${markdown}](${image.linkUrl})` : markdown}\n` }));
    }
    setView('editor'); setEditorTab('content'); setMessage(placement === 'featured' ? 'Featured image selected. Save the draft to keep it.' : 'Image inserted at the end of the article.');
  }
  function navigate(next: typeof view, nextFilter?: typeof filter) { setView(next); if (nextFilter) setFilter(nextFilter); }
  const previewHref = selected && saved && !dirty ? `/admin/preview/${selected}?replaceBody=${replaceBody ? '1' : '0'}` : undefined;
  const field = (label: string, key: 'title' | 'description' | 'slug' | 'category' | 'publishedAt', help?: string) => <label className="cms-field">{label}{key === 'description' ? <textarea rows={3} value={form[key]} onChange={e => setForm(old => ({ ...old, [key]: e.target.value }))}/> : <input type={key === 'publishedAt' ? 'date' : 'text'} value={form[key]} readOnly={key === 'slug' && Boolean(selected)} onChange={e => setForm(old => ({ ...old, [key]: e.target.value }))}/>} {help && <small>{help}</small>}</label>;
  const seoText = (label: string, key: 'metaTitle' | 'focusKeyword' | 'canonicalUrl' | 'ogTitle' | 'ogDescription' | 'ogImage', help?: string) => <label className="cms-field">{label}<input value={seo[key]} onChange={e => setSeo(key, e.target.value)}/>{help && <small>{help}</small>}</label>;
  const renderPosts = () => <section className="cms-card cms-posts-card"><div className="cms-card-heading"><div><span className="cms-eyebrow">Content library</span><h2>{filter === 'drafts' ? 'Saved drafts' : filter === 'published' ? 'Published posts' : 'All posts'}</h2></div><span className="cms-badge">{filtered.length} posts</span></div>
    <div className="cms-list-controls"><label className="cms-search">Search posts<input type="search" placeholder="Search titles, categories or tags…" value={query} onChange={e => setQuery(e.target.value)}/></label><label className="cms-filter-label">Status<select value={filter} onChange={e => setFilter(e.target.value as typeof filter)}><option value="all">All statuses</option><option value="drafts">Has draft</option><option value="published">Published</option></select></label></div>
    <div className="cms-post-list"><div className="cms-list-head"><span>Article</span><span>Status</span><span>SEO</span><span>Updated</span></div>{filtered.map(post => <button className="cms-post-row" key={post.slug} disabled={busy || !ready || !publicationReady} onClick={() => openPost(post)}><span className="cms-post-title"><strong>{post.title}</strong><small>{post.category} · /blog/{post.slug}</small></span><span className="cms-status-wrap"><span className={`cms-status ${isPublished(post) ? 'published' : 'draft'}`}>{isPublished(post) ? 'Published' : 'Draft'}</span>{drafts[post.slug] && isPublished(post) && <small>Draft changes</small>}</span><Score score={analyzeSeo(post, allPosts).score} compact/><time>{drafts[post.slug]?.updatedAt?.slice(0, 10) || post.publishedAt || '—'}</time></button>)}</div>
    {!filtered.length && <div className="cms-empty"><strong>No matching posts</strong><p>Try another search or create a new draft.</p></div>}
  </section>;
  return <div className="cms-shell">
    <aside className="cms-sidebar"><a className="cms-brand" href="/admin"><span>C<span>↗</span></span><div>CornerSpan<small>CONTENT STUDIO</small></div></a><p className="cms-nav-label">WORKSPACE</p><nav aria-label="Admin navigation">{([
      ['overview', '◫', 'Dashboard Overview'], ['posts', '▤', 'All Posts'], ['new', '+', 'Add New Post'], ['drafts', '▧', 'Drafts'], ['published', '✓', 'Published Posts'], ['seo', '◉', 'SEO Analysis'], ['media', '▣', 'Media Library'], ['editor', '✎', 'Post Editor'], ['settings', '⚙', 'Settings'],
    ] as const).map(([key, icon, label]) => <button key={key} disabled={busy} aria-current={((view === key && (key !== 'posts' || filter === 'all')) || view === 'posts' && filter === key) ? 'page' : undefined} onClick={() => key === 'new' ? newPost() : key === 'drafts' ? navigate('posts', 'drafts') : key === 'published' ? navigate('posts', 'published') : navigate(key, key === 'posts' ? 'all' : undefined)}><span aria-hidden="true">{icon}</span>{label}{key === 'drafts' && <small>{Object.keys(drafts).length}</small>}</button>)}</nav><div className="cms-sidebar-bottom"><span className="cms-connected-dot"/>{ready ? 'Draft database connected' : 'Connecting to drafts…'}<p>USA construction content</p><button onClick={signOut} disabled={busy}>Sign out ↗</button></div></aside>
    <div className="cms-workspace"><header className="cms-topbar"><span>Workspace <b>/</b> {view === 'editor' ? 'Post editor' : view === 'seo' ? 'SEO analysis' : view === 'media' ? 'Media library' : view === 'overview' ? 'Overview' : view === 'settings' ? 'Settings' : 'Posts'}</span><div className="cms-actions"><span className="cms-private-label">● {environment} · Private admin</span><button className="cms-primary" onClick={newPost} disabled={busy}>+ New draft</button></div></header>
      <div className="cms-content"><div className="cms-page-title"><div><span className="cms-eyebrow">CORNERSPAN CONTENT STUDIO</span><h1>{view === 'editor' ? (selected ? 'Refine your article' : 'Start something useful') : view === 'overview' ? 'Build better content.' : view === 'seo' ? 'Your content, at a glance.' : view === 'media' ? 'A library for your ideas.' : view === 'settings' ? 'Workspace settings' : 'Your articles, organized.'}</h1><p>{view === 'editor' ? 'Write clearly. Check the details. Preview before you publish.' : `${posts.length} existing posts · ${Object.keys(drafts).length} saved drafts`}</p></div>{view === 'editor' && <span className={`cms-badge ${dirty ? 'warning' : 'good'}`}>{dirty ? 'Unsaved changes' : saved ? `Saved · Revision ${saved.revision}` : 'New draft'}</span>}</div>
      {(draftLoadError || publicationLoadError) && <div className="cms-notice cms-error" role="alert">{draftLoadError || publicationLoadError}<button onClick={retryConnection}>Retry connection</button></div>}
      {message && <p className="cms-notice" role="status">{message}</p>}
      {view === 'overview' && <><div className="cms-overview-grid"><div className="cms-stat"><span>Published articles</span><strong>{allPosts.filter(isPublished).length}</strong><small>Useful guides for real projects</small></div><div className="cms-stat"><span>Work in progress</span><strong>{Object.keys(drafts).length}</strong><small>Saved drafts, ready to refine</small></div><div className="cms-stat"><span>Drafts to review</span><strong>{Object.values(drafts).filter(p => analyzeSeo(p, allPosts).score < 80).length}</strong><small>Use the checklist as a writing aid</small></div></div><div className="cms-welcome"><div><span className="cms-eyebrow">FROM MEASUREMENT TO CONFIDENCE</span><h2>Help someone get their<br/>next project right.</h2><p>Start with a real question. Add a worked example, explain the assumptions, and connect readers with the right calculator.</p><button className="cms-primary" onClick={newPost}>Write a new article ↗</button></div><div className="cms-blueprint" aria-hidden="true"><span>01</span><div>Plan → Measure → Build</div><i/><i/><i/></div></div>{renderPosts()}</>}
      {view === 'posts' && renderPosts()}
      {view === 'seo' && <><p className="cms-notice">Scores are editorial suggestions. Legacy articles with custom layouts may have incomplete editor text and should be reviewed on their public page.</p><div className="cms-seo-library">{allPosts.map(post => { const a = analyzeSeo(post, allPosts); return <button className="cms-card cms-seo-post" key={post.slug} disabled={busy || !ready || !publicationReady} onClick={() => { openPost(post); setEditorTab('analysis'); }}><Score score={a.score}/><div><strong>{post.title}</strong><p>{a.checks.filter(c => c.status === 'FAIL').length} problems · {a.checks.filter(c => c.status === 'WARNING').length} suggestions</p><small>Open checklist →</small></div></button>; })}</div></>}
      {view === 'media' && <MediaManager onUse={useImage}/>}
      {view === 'settings' && <section className="cms-card cms-settings"><h2>Connection & publishing</h2><dl><div><dt>Environment</dt><dd>{environment}</dd></div><div><dt>Draft database</dt><dd>Draft database: {ready ? 'Connected' : 'Unavailable'}</dd></div><div><dt>Publication database</dt><dd>Publishing status: {publicationReady ? 'Ready' : 'Unavailable'}</dd></div><div><dt>Content language / audience</dt><dd>English · United States</dd></div><div><dt>Login</dt><dd>Signed session · Secure, HttpOnly cookie · Same-origin writes</dd></div><div><dt>Image uploads</dt><dd>Unavailable until secure upload storage is configured. Image URLs are supported.</dd></div><div><dt>Existing URLs</dt><dd>Locked after saving a post</dd></div></dl><p className="cms-help">Save Draft keeps edits private. Publish affects only the environment you are signed into. Existing articles require an explicit approval checkbox.</p><div className="cms-actions"><button onClick={retryConnection}>Reload connections</button><button onClick={signOut}>Sign out</button><button disabled={!ready || busy || storageTesting} onClick={runSafeStorageTest}>{storageTesting ? 'Testing D1…' : 'Test draft storage safely'}</button></div>{storageTestStatus && <p role="status" className="cms-notice">{storageTestStatus}</p>}</section>}
      {view === 'editor' && <section id="post-editor" ref={editorRef} className="cms-editor"><div className="cms-editor-toolbar"><div className="cms-tabs" role="tablist" aria-label="Editor views">{(['content', 'preview', 'analysis'] as const).map(tab => <button role="tab" aria-selected={editorTab === tab} key={tab} onClick={() => setEditorTab(tab)}>{tab === 'content' ? 'Content editor' : tab === 'preview' ? 'Live article preview' : 'SEO analysis'}</button>)}</div><div className="cms-actions"><button disabled={busy} onClick={exportDraft}>Export draft</button><button className="cms-primary" onClick={saveDraft} disabled={!ready || busy}>{busy ? 'Working…' : 'Save Draft'}</button></div></div>
        <div className={`cms-editor-grid ${editorTab !== 'content' ? 'single' : ''}`}>
        {editorTab === 'content' && <div className="cms-editor-main"><fieldset disabled={busy}>
          <section className="cms-card"><div className="cms-card-heading"><h2>Article essentials</h2><span className="cms-badge">{legacy ? 'Existing article' : 'Markdown post'}</span></div>{field('H1 Article Title', 'title', `${form.title.length} characters · One H1 is generated from this field.`)}{field('URL Slug', 'slug', selected ? 'Locked to preserve existing links.' : 'Leave blank to generate from the title on save.')}<div className="cms-grid-two">{field('Article Category', 'category')}<label className="cms-field">Tags (comma-separated)<input value={tagsText} onChange={e => { setTagsText(e.target.value); setForm(old => ({ ...old, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })); }}/></label></div>
            {legacy && <div className="cms-notice">This is an existing published article. Drafts are private; its public URL and original content stay in place until you explicitly publish an approved update.<label className="cms-checkbox"><input type="checkbox" checked={replaceBody} onChange={e => { setReplaceBody(e.target.checked); setSeo("bodyReplacement", e.target.checked); }}/>Publish a complete Markdown replacement</label></div>}
          </section>
          <section className="cms-card cms-writing-card"><div className="cms-card-heading"><h2>Write your article</h2><span className="cms-badge">Markdown</span></div><div className="cms-format-tools" role="toolbar" aria-label="Markdown formatting">{[['H2', '\n## ', ''], ['H3', '\n### ', ''], ['H4', '\n#### ', ''], ['Bold', '**', '**'], ['Italic', '*', '*'], ['Link', '[', '](/calculators)'], ['List', '\n- ', ''], ['Table', '\n\n| Material | Quantity |\n| --- | --- |\n| ', ' |  |\n']] .map(([label, before, after]) => <button type="button" key={label} onClick={() => insertMarkdown(before, after)}>{label}</button>)}<button type="button" onClick={() => setView('media')}>Image</button></div><label className="cms-field cms-body-label">Article body (Markdown)<textarea ref={bodyRef} rows={22} value={form.body || ''} placeholder="Start with the reader’s question…\n\n## What you need to measure\n\nExplain the steps and show a worked example." onChange={e => setForm(old => ({ ...old, body: e.target.value }))}/></label><div className="cms-writing-stats"><span>{analysis.stats.words} words</span><span>{analysis.stats.characters} characters</span><span>{analysis.stats.readingMinutes} min read</span><span>{analysis.stats.paragraphs} paragraphs</span></div></section>
          <section className="cms-card"><div className="cms-card-heading"><h2>Search appearance</h2><span className="cms-badge">Google preview</span></div>{seoText('SEO Meta Title', 'metaTitle', `${seo.metaTitle.length} characters · Suggested 30–60. Leave blank to use the H1 title.`)}{field('SEO Meta Description', 'description', `${form.description.length} characters · Suggested 120–160, with a useful summary.`)}<SearchPreview post={form}/><div className="cms-grid-two">{seoText('Focus Keyword', 'focusKeyword')}<label className="cms-field">Secondary Keywords (comma-separated)<input value={seo.secondaryKeywords.join(',')} onChange={e => setSeo('secondaryKeywords', e.target.value.split(','))}/></label></div></section>
          <section className="cms-card"><div className="cms-card-heading"><h2>Featured image</h2><button type="button" onClick={() => setView('media')}>Choose from library</button></div><ImageFields value={seo.featuredImage} onChange={image => setSeo('featuredImage', image)}/></section>
          <section className="cms-card"><h2>Table of Contents</h2><label className="cms-checkbox"><input type="checkbox" checked={seo.tocEnabled} onChange={e => setSeo('tocEnabled', e.target.checked)}/>Generate Table of Contents from H2 and H3 headings</label><p className="cms-help">{analysis.stats.h2} H2 · {analysis.stats.h3} H3 · {analysis.stats.h4} H4. Headings get unique anchors in the preview and article.</p>{analysis.headings.length ? <ol className="cms-outline">{analysis.headings.map(h => <li key={h.id} className={h.depth === 3 ? 'sub' : ''}><span>H{h.depth}</span>{h.text}<small>#{h.id}</small></li>)}</ol> : <p className="cms-help">Add descriptive H2 sections to build the contents list.</p>}</section>
          <section className="cms-card"><h2>Related reading suggestions</h2><p className="cms-help">Based on shared topics in the existing catalog. Choose links that help the reader.</p>{suggestions.length ? suggestions.map(p => <div className="cms-link-suggestion" key={p.slug}><span>{p.title}</span><button type="button" onClick={() => setForm(old => ({ ...old, body: (old.body || '') + `\n\n[${p.title}](/blog/${p.slug})` }))}>Insert link</button></div>) : <p className="cms-help">Add a title, category or focus keyword to find related guides.</p>}</section>
          <details className="cms-card cms-advanced"><summary>Advanced SEO & social sharing</summary><div>{seoText('Canonical URL', 'canonicalUrl', 'Leave blank for the established CornerSpan article URL. A different canonical excludes this URL from the sitemap.')}<div className="cms-grid-two"><label className="cms-field">Search indexing<select value={seo.noindex ? 'noindex' : 'index'} onChange={e => setSeo('noindex', e.target.value === 'noindex')}><option value="index">Index — allow search indexing</option><option value="noindex">Noindex — request search exclusion</option></select></label><label className="cms-field">Link following<select value={seo.nofollow ? 'nofollow' : 'follow'} onChange={e => setSeo('nofollow', e.target.value === 'nofollow')}><option value="follow">Follow</option><option value="nofollow">Nofollow</option></select></label></div><label className="cms-checkbox"><input type="checkbox" checked={seo.schemaEnabled} onChange={e => setSeo('schemaEnabled', e.target.checked)}/>Include Article structured data</label>{seoText('Open Graph Title', 'ogTitle')}{seoText('Open Graph Description', 'ogDescription')}{seoText('Open Graph Image', 'ogImage', 'Defaults to the featured image. Shared by Open Graph and Twitter/X.')}<SocialPreview post={form}/></div></details>
        </fieldset><section className="cms-card cms-publish"><h2>Ready for review?</h2><p>Save the latest changes, open the saved preview, then publish when the article is ready.</p>{legacy && <label className="cms-checkbox"><input type="checkbox" checked={approveLegacy} onChange={e => setApproveLegacy(e.target.checked)}/>I approve updating this existing published article</label>}<div className="cms-actions">{previewHref ? <a href={previewHref}>Preview saved draft ↗</a> : <span className="cms-help">Save changes to enable the saved preview.</span>}<button className="cms-primary" disabled={busy || !saved || dirty || !publicationReady || (legacy && !approveLegacy)} onClick={publishPost}>Publish saved draft</button>{selected && publishedSlugs.includes(selected) && <button disabled={busy} onClick={unpublishPost}>Unpublish CMS version</button>}{saved && <button className="cms-danger" disabled={busy} onClick={deleteDraft}>Delete draft</button>}</div>{selected && isPublished(form) && <a className="cms-text-link" href={`/blog/${selected}`}>View published article ↗</a>}</section></div>}
        {editorTab === 'preview' && <div className="cms-card cms-live-preview"><p className="cms-preview-label">LIVE DRAFT PREVIEW · {legacy && !replaceBody ? 'Markdown representation; saved preview shows the preserved original layout' : 'Uses the public article renderer'}</p><CmsArticle post={{ ...form, body: form.body || '' }} preview/></div>}
        {(editorTab === 'content' || editorTab === 'analysis') && <div className="cms-analysis-column"><SeoPanel post={form} catalog={allPosts}/>{editorTab === 'analysis' && <section className="cms-card"><h2>Search & sharing</h2><SearchPreview post={form}/><SocialPreview post={form}/></section>}</div>}
        </div></section>}
      <footer className="cms-footnote">CornerSpan Content Studio · Drafts stay private until you publish.<span>Helpful content comes first.</span></footer>
      </div>
    </div>
  </div>;
}
