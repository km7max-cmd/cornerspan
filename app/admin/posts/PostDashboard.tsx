"use client";

import { useState } from "react";
import type { CalculatorArticle as Article } from "../../../data/calculator-articles";

type Entry = { slug: string; title: string };
type LoadData = {
  articles: Article[];
  codeManaged: Entry[];
  newSlugs: string[];
  revisions: { posts: string; overrides: string };
};
type Tab = "article" | "seo" | "examples" | "faq" | "preview";
const DRAFT_KEY = "cornerspan-editor-local-drafts-v1";
const inputStyle = "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const labelStyle = "block text-sm font-semibold text-slate-800";
const secondaryButton = "rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50";

function paragraphs(value: string) {
  return value.split(/\n\s*\n/g).map(v => v.trim()).filter(Boolean);
}
function lines(value: string) {
  return value.split("\n").map(v => v.trim()).filter(Boolean);
}
function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
function getDrafts(): Record<string, Article> {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}") as Record<string, Article>;
  } catch {
    return {};
  }
}
function emptyPost(): Article {
  const today = new Date().toISOString().slice(0, 10);
  return {
    slug: "", title: "", seoTitle: "", description: "", category: "Estimating",
    tags: [], calculatorHref: "/calculators", publishedAt: today, modifiedAt: today,
    intro: [""], formula: "", example: [["Project dimensions", "", ""]],
    sections: [{ id: "method", title: "How to calculate", paragraphs: [""] }],
    mistakes: [], faqs: [{ question: "", answer: "" }], sources: [], related: [],
    image: null,
  };
}
function Field({ label, value, onChange, hint, multi, rows = 4, disabled, placeholder }: {
  label: string; value: string; onChange: (text: string) => void; hint?: string;
  multi?: boolean; rows?: number; disabled?: boolean; placeholder?: string;
}) {
  return <label className={labelStyle}>
    {label}
    {multi
      ? <textarea rows={rows} className={inputStyle} value={value} disabled={disabled}
          onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      : <input className={inputStyle} value={value} disabled={disabled}
          onChange={e => onChange(e.target.value)} placeholder={placeholder} />}
    {hint && <span className="mt-1 block text-xs font-normal text-slate-500">{hint}</span>}
  </label>;
}

export default function PostDashboard() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [catalog, setCatalog] = useState<LoadData | null>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [existingSlug, setExistingSlug] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("article");
  const [query, setQuery] = useState("");
  const [draftSlugs, setDraftSlugs] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [problem, setProblem] = useState("");
  const [lastCommit, setLastCommit] = useState("");

  function edit<K extends keyof Article>(key: K, value: Article[K]) {
    setArticle(previous => previous ? { ...previous, [key]: value } : previous);
  }
  function editSection(index: number, patch: Partial<Article["sections"][number]>) {
    if (!article) return;
    edit("sections", article.sections.map((s, i) => i === index ? { ...s, ...patch } : s));
  }

  async function load(secret: string, selectSlug?: string) {
    const r = await fetch("/api/editor/posts", {
      headers: { Authorization: "Bearer " + secret },
      cache: "no-store",
    });
    const data = await r.json() as LoadData & { error?: string };
    if (!r.ok) throw new Error(data.error || "Could not open the dashboard.");
    setCatalog(data);
    setDraftSlugs(Object.keys(getDrafts()));
    setAuthenticated(true);
    if (selectSlug) {
      const match = data.articles.find(a => a.slug === selectSlug);
      if (match) { setArticle(clone(match)); setExistingSlug(selectSlug); }
    }
  }

  async function signIn() {
    setBusy(true); setProblem(""); setMessage("");
    try {
      await load(password);
      setMessage("Connected. Select a post to edit, or create a new one.");
    } catch (error) {
      setProblem(error instanceof Error ? error.message : "Could not sign in.");
    } finally { setBusy(false); }
  }

  function openPost(post: Article) {
    const draft = getDrafts()[post.slug];
    setArticle(draft && window.confirm("A draft saved on this device exists. Restore it?") ? clone(draft) : clone(post));
    setExistingSlug(post.slug);
    setTab("article"); setProblem(""); setMessage(""); setLastCommit("");
  }
  function newPost() {
    setArticle(emptyPost()); setExistingSlug(null);
    setTab("article"); setProblem(""); setMessage(""); setLastCommit("");
  }
  function saveLocalDraft() {
    if (!article || !article.slug) {
      setProblem("Enter a URL slug before saving a local draft.");
      return;
    }
    try {
      const drafts = getDrafts();
      drafts[article.slug] = article;
      localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
      setDraftSlugs(Object.keys(drafts));
      setMessage("Draft saved on this device only. It is not on GitHub or the public website.");
      setProblem("");
    } catch {
      setProblem("This browser could not store a local draft. Copy the text before leaving.");
    }
  }
  async function publish() {
    if (!article || !catalog) return;
    if (!article.slug || !article.title || !article.description || !article.sections.length) {
      setProblem("Add a URL slug, title, description and at least one section first.");
      return;
    }
    if (!window.confirm("Publish this article to the main GitHub branch? It will be public after a successful Cloudflare deployment.")) return;
    setBusy(true); setProblem(""); setMessage(""); setLastCommit("");
    try {
      const alreadyThere = catalog.articles.some(a => a.slug === article.slug);
      const isNewInGit = catalog.newSlugs.includes(article.slug);
      const expectedSha = alreadyThere && !isNewInGit ? catalog.revisions.overrides : catalog.revisions.posts;
      const r = await fetch("/api/editor/posts", {
        method: "POST",
        headers: { Authorization: "Bearer " + password, "Content-Type": "application/json" },
        body: JSON.stringify({ article, expectedSha, mode: existingSlug ? "edit" : "create", originalSlug: existingSlug }),
      });
      const result = await r.json() as { error?: string; commitUrl?: string; message?: string };
      if (!r.ok) throw new Error(result.error || "Could not publish.");
      const drafts = getDrafts();
      delete drafts[article.slug];
      localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
      setDraftSlugs(Object.keys(drafts));
      setLastCommit(result.commitUrl || "");
      setMessage(result.message || "Saved to GitHub.");
      await load(password, article.slug);
    } catch (error) {
      setProblem(error instanceof Error ? error.message : "Publish failed.");
    } finally { setBusy(false); }
  }

  const visible = (catalog?.articles || []).filter(p =>
    (p.title + " " + p.slug + " " + p.category).toLowerCase().includes(query.toLowerCase())
  );
  const tabs: { key: Tab; label: string }[] = [
    { key: "article", label: "Article" }, { key: "seo", label: "SEO & Media" },
    { key: "examples", label: "Examples" }, { key: "faq", label: "FAQs & Sources" },
    { key: "preview", label: "Preview" },
  ];

  return <div className="min-h-screen bg-slate-50 pb-16">
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-700 px-3 py-2 font-black text-white">CS</div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Post Editor Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">CornerSpan · Manage construction articles without editing TypeScript files</p>
          </div>
        </div>
      </div>
    </div>

    <div className="mx-auto max-w-7xl px-4 pt-7 sm:px-6">
      {!authenticated ? <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-slate-950">Editor sign in</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Enter the password set as the Cloudflare runtime secret. The GitHub token stays on the server, not in your browser.</p>
        <div className="mt-6">
          <label className={labelStyle}>Admin password
            <input className={inputStyle} type="password" value={password} autoComplete="off"
              onChange={e => setPassword(e.target.value)} onKeyDown={e => { if (e.key === "Enter") void signIn(); }} />
          </label>
          <button type="button" onClick={() => void signIn()} disabled={busy || !password}
            className="mt-4 w-full rounded-xl bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50">
            {busy ? "Connecting…" : "Open dashboard"}
          </button>
        </div>
        {problem && <p role="alert" className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{problem}</p>}
        <p className="mt-5 text-xs leading-5 text-slate-500">Not configured yet? Add CORNERSPAN_EDITOR_PASSWORD and CORNERSPAN_GITHUB_TOKEN as Cloudflare Worker secrets before signing in.</p>
      </div> :
      <div className="grid gap-6 lg:grid-cols-[285px_minmax(0,1fr)]">
        <aside className="self-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">
          <div className="border-b border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900">Posts</h2>
              <span className="text-sm text-slate-500">{catalog?.articles.length || 0}</span>
            </div>
            <button type="button" onClick={newPost} className="mt-3 w-full rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800">+ Add new post</button>
            <input aria-label="Search posts" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search articles…"
              className={inputStyle} />
          </div>
          <div className="max-h-[560px] overflow-y-auto p-2">
            {visible.map(p => <button type="button" key={p.slug} onClick={() => openPost(p)}
              className={"mb-1 w-full rounded-xl px-3 py-3 text-left hover:bg-blue-50 " + (existingSlug === p.slug ? "bg-blue-50 ring-1 ring-blue-200" : "")}>
              <span className="block text-sm font-semibold leading-5 text-slate-900">{p.title}</span>
              <span className="mt-1 block text-xs text-slate-500">{p.category} · {p.publishedAt}</span>
            </button>)}
            {visible.length === 0 && <p className="p-4 text-sm text-slate-500">No matching posts.</p>}
            {draftSlugs.length > 0 && <>
              <div className="my-3 border-t border-slate-200 px-3 pt-3 text-xs font-bold uppercase tracking-wide text-slate-500">Local drafts · this device</div>
              {draftSlugs.map(slug => <button type="button" key={slug} onClick={() => {
                const draft = getDrafts()[slug];
                if (!draft) return;
                setArticle(clone(draft));
                setExistingSlug(catalog?.articles.some(p => p.slug === slug) ? slug : null);
                setTab("article"); setProblem(""); setMessage(""); setLastCommit("");
              }} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-blue-800 hover:bg-blue-50">
                {getDrafts()[slug]?.title || slug}
              </button>)}
            </>}
            {!!catalog?.codeManaged.length && <>
              <div className="my-3 border-t border-slate-200 px-3 pt-3 text-xs font-bold uppercase tracking-wide text-slate-500">Custom-layout posts (view only)</div>
              {catalog.codeManaged.map(p => <a key={p.slug} href={"/blog/" + p.slug} target="_blank" rel="noreferrer"
                className="block rounded-xl px-3 py-2 text-xs text-slate-600 hover:bg-slate-50">{p.title} ↗</a>)}
            </>}
          </div>
          <div className="border-t border-slate-200 p-3">
            <button type="button" className={secondaryButton + " w-full"} onClick={() => {
              setAuthenticated(false); setPassword(""); setCatalog(null); setArticle(null); setExistingSlug(null);
              setMessage(""); setProblem(""); setLastCommit("");
            }}>Sign out</button>
          </div>
        </aside>

        <section className="min-w-0">
          {!article ? <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Choose an article</h2>
            <p className="mt-2 text-sm text-slate-600">Select a post from the left, or start writing a new one.</p>
            <button onClick={newPost} type="button" className="mt-5 rounded-xl bg-blue-700 px-5 py-2.5 font-bold text-white">Create a post</button>
          </div> : <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">{existingSlug ? "Editing published article" : "New article"}</p>
                  <h2 className="mt-1 max-w-2xl break-words text-xl font-bold text-slate-950">{article.title || "Untitled post"}</h2>
                  <p className="mt-1 break-all text-xs text-slate-500">/blog/{article.slug || "your-slug"}</p>
                </div>
                <a href={existingSlug ? "/blog/" + existingSlug : "/blog"} target="_blank" rel="noreferrer"
                  className="text-sm font-semibold text-blue-700 underline">Open website ↗</a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button type="button" className={secondaryButton} onClick={saveLocalDraft}>Save local draft</button>
                <button type="button" onClick={() => setTab("preview")} className={secondaryButton}>Preview</button>
                <button type="button" onClick={() => void publish()} disabled={busy}
                  className="rounded-xl bg-blue-700 px-5 py-2 text-sm font-bold text-white hover:bg-blue-800 disabled:opacity-50">
                  {busy ? "Publishing…" : "Publish to GitHub"}
                </button>
              </div>
              <p className="mt-3 text-xs text-slate-500">Local drafts stay on this browser. Publish commits changes to GitHub; the site changes after Cloudflare deployment. Review calculations and content before publishing.</p>
              {problem && <p role="alert" className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{problem}</p>}
              {message && <p role="status" className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">{message}</p>}
              {lastCommit && <a href={lastCommit} target="_blank" rel="noreferrer" className="mt-2 block break-all text-sm font-semibold text-blue-700 underline">View GitHub commit ↗</a>}
            </div>

            <nav aria-label="Editor sections" className="flex gap-2 overflow-x-auto border-b border-slate-200 px-5 py-3 sm:px-6">
              {tabs.map(t => <button key={t.key} type="button" onClick={() => setTab(t.key)}
                className={"shrink-0 rounded-lg px-3 py-2 text-sm font-semibold " + (tab === t.key ? "bg-blue-700 text-white" : "text-slate-600 hover:bg-slate-100")}>{t.label}</button>)}
            </nav>

            <div className="space-y-6 p-5 sm:p-6">
              {tab === "article" && <>
                <Field label="Post title (H1)" value={article.title} onChange={v => {
                  if (!existingSlug && (!article.slug || article.slug === article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))) {
                    edit("slug", v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
                  }
                  edit("title", v);
                }} placeholder="How many gallons of paint for a 12x12 room?" />
                <Field label="Introduction" value={article.intro.join("\n\n")} multi rows={7}
                  hint="Separate paragraphs with a blank line." onChange={v => edit("intro", paragraphs(v))} />
                <Field label="Calculation formula" value={article.formula} multi rows={3} onChange={v => edit("formula", v)} />
                <div className="flex items-center justify-between border-t border-slate-200 pt-5">
                  <h3 className="text-lg font-bold text-slate-900">Article sections</h3>
                  <button type="button" className={secondaryButton} onClick={() => edit("sections", [...article.sections,
                    { id: "section-" + Date.now(), title: "New section", paragraphs: [""] }])}>+ Add section</button>
                </div>
                {article.sections.map((section, index) => <div key={section.id + index} className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex justify-between gap-3">
                    <span className="text-sm font-bold text-slate-700">Section {index + 1}</span>
                    <button type="button" className="text-xs font-semibold text-rose-700 underline"
                      onClick={() => edit("sections", article.sections.filter((_, i) => i !== index))}>Remove</button>
                  </div>
                  <Field label="Heading (H2)" value={section.title} onChange={v => editSection(index, { title: v })} />
                  <Field label="Paragraphs" value={section.paragraphs.join("\n\n")} multi rows={6}
                    hint="Separate paragraphs with a blank line." onChange={v => editSection(index, { paragraphs: paragraphs(v) })} />
                  {section.table && <p className="text-xs text-slate-500">Existing comparison table is preserved when you edit this section.</p>}
                </div>)}
              </>}
              {tab === "seo" && <>
                <Field label="URL slug" value={article.slug} disabled={!!existingSlug} onChange={v =>
                  edit("slug", v.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                  hint={existingSlug ? "Existing URLs are locked to protect indexed links and canonical URLs." : "Use lowercase words separated by hyphens. Cannot be changed after publishing."} />
                <Field label="SEO title (optional)" value={article.seoTitle || ""} onChange={v => edit("seoTitle", v)}
                  hint="Used in search titles when provided; otherwise the post title is used." />
                <Field label="Meta description" value={article.description} multi rows={3} onChange={v => edit("description", v)}
                  hint={String(article.description.length) + " characters. Write a helpful, specific summary."} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Category" value={article.category} onChange={v => edit("category", v)} />
                  <Field label="Calculator URL" value={article.calculatorHref} onChange={v => edit("calculatorHref", v)}
                    hint="Example: /calculators/paint" />
                </div>
                <Field label="Tags" value={article.tags.join(", ")} onChange={v => edit("tags", v.split(",").map(s => s.trim()))}
                  hint="Separate tags with commas." />
                <Field label="Image path (existing site asset)" value={article.image || ""} onChange={v => edit("image", v || null)}
                  hint="Example: /paint-guide.webp. Image upload is not included in this version." />
                <Field label="Image alt text" value={article.imageAlt || ""} onChange={v => edit("imageAlt", v)} />
                <Field label="Image caption" value={article.imageCaption || ""} onChange={v => edit("imageCaption", v)} multi rows={2} />
                <Field label="Related reading links" value={article.related.join("\n")} onChange={v => edit("related", lines(v))}
                  multi rows={3} hint="One internal URL per line." />
              </>}
              {tab === "examples" && <>
                <h3 className="text-lg font-bold text-slate-900">Worked example table</h3>
                <Field label="Example steps" value={article.example.map(row => row.join("\t")).join("\n")}
                  onChange={v => edit("example", v.split("\n").filter(Boolean).map(line => {
                    const cells = line.split("\t");
                    return [cells[0] || "", cells[1] || "", cells.slice(2).join(" ") || ""];
                  }))} multi rows={9}
                  hint="One row per line, three columns separated by the Tab key. Copy from a spreadsheet for easier editing." />
                <Field label="Common mistakes" value={article.mistakes.join("\n")} onChange={v => edit("mistakes", lines(v))}
                  multi rows={6} hint="Write one mistake per line." />
              </>}
              {tab === "faq" && <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-slate-900">Frequently asked questions</h3>
                  <button type="button" className={secondaryButton} onClick={() => edit("faqs", [...article.faqs, { question: "", answer: "" }])}>+ Add FAQ</button>
                </div>
                {article.faqs.map((f, i) => <div key={i} className="space-y-3 rounded-xl border border-slate-200 p-4">
                  <div className="flex justify-end"><button type="button" className="text-xs font-semibold text-rose-700 underline"
                    onClick={() => edit("faqs", article.faqs.filter((_, index) => index !== i))}>Remove FAQ</button></div>
                  <Field label="Question" value={f.question} onChange={v => edit("faqs", article.faqs.map((x, idx) => idx === i ? { ...x, question: v } : x))} />
                  <Field label="Answer" value={f.answer} multi rows={3}
                    onChange={v => edit("faqs", article.faqs.map((x, idx) => idx === i ? { ...x, answer: v } : x))} />
                </div>)}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
                  <h3 className="text-lg font-bold text-slate-900">References and sources</h3>
                  <button type="button" className={secondaryButton} onClick={() => edit("sources", [...article.sources, { label: "", href: "" }])}>+ Add source</button>
                </div>
                {article.sources.map((source, i) => <div key={i} className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-2">
                  <Field label="Source label" value={source.label} onChange={v => edit("sources", article.sources.map((x, idx) => idx === i ? { ...x, label: v } : x))} />
                  <Field label="Source URL" value={source.href} onChange={v => edit("sources", article.sources.map((x, idx) => idx === i ? { ...x, href: v } : x))} />
                  <button type="button" className="text-left text-xs font-semibold text-rose-700 underline sm:col-span-2"
                    onClick={() => edit("sources", article.sources.filter((_, idx) => idx !== i))}>Remove source</button>
                </div>)}
              </>}
              {tab === "preview" && <div className="mx-auto max-w-3xl text-slate-700">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-blue-700">Editor preview · Not yet public</p>
                <h2 className="text-3xl font-extrabold text-slate-950">{article.title || "Untitled article"}</h2>
                <p className="mt-2 text-sm text-slate-500">{article.category} · /blog/{article.slug}</p>
                {article.intro.map((p, i) => <p key={i} className="mt-5 leading-8">{p}</p>)}
                <h3 className="mt-8 text-2xl font-bold text-slate-950">Calculation formula</h3>
                <p className="mt-3 rounded-xl bg-blue-50 p-4">{article.formula}</p>
                <h3 className="mt-8 text-2xl font-bold text-slate-950">Worked example</h3>
                <div className="mt-4 overflow-x-auto"><table className="min-w-[480px] w-full text-left text-sm">
                  <thead><tr>{["Step", "Calculation", "Result"].map(h => <th key={h} className="border p-3">{h}</th>)}</tr></thead>
                  <tbody>{article.example.map((r, i) => <tr key={i}>{r.map((v, j) => <td key={j} className="border p-3">{v}</td>)}</tr>)}</tbody>
                </table></div>
                {article.sections.map((s, i) => <section key={i} className="mt-8">
                  <h3 className="text-2xl font-bold text-slate-950">{s.title}</h3>
                  {s.paragraphs.map((p, j) => <p key={j} className="mt-3 leading-8">{p}</p>)}
                </section>)}
                <h3 className="mt-8 text-2xl font-bold text-slate-950">FAQs</h3>
                {article.faqs.map((f, i) => <div key={i} className="mt-4 border-b border-slate-200 pb-4"><h4 className="font-bold">{f.question}</h4><p className="mt-2">{f.answer}</p></div>)}
              </div>}
            </div>
          </div>}
        </section>
      </div>}
    </div>
  </div>;
}
