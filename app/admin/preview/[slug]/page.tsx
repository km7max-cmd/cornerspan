import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasAdminAccess } from "../../../../lib/admin-auth";
import { draftDatabase, getDraft } from "../../../../lib/admin-drafts";
import CmsArticle from "../../../../components/blog/CmsArticle";
import CalculatorArticle from "../../../../components/blog/CalculatorArticle";
import { calculatorArticles } from "../../../../data/calculator-articles";
import { blogPosts } from "../../../../data/blog";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Private Post Preview | CornerSpan", robots: { index: false, follow: false } };

function PreviewUnavailable({ title, explanation }: { title: string; explanation: string }) {
  return <main className="mx-auto max-w-3xl px-6 py-16">
    <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
    <p className="mt-4 text-slate-700">{explanation}</p>
    <a href="/admin" className="mt-6 inline-block rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white">
      Return to post editor
    </a>
  </main>;
}

export default async function PreviewPage({ params, searchParams }: {
  params: Promise<{slug:string}>;
  searchParams: Promise<{replaceBody?:string}>;
}) {
  // A missing or expired session should lead back to sign-in, not a misleading 404.
  if (!(await hasAdminAccess())) redirect("/admin/login");
  const { slug } = await params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) notFound();
  const db = draftDatabase();
  if (!db) return <PreviewUnavailable title="Preview database unavailable" explanation="This preview deployment cannot access its draft database. Reopen the latest branch preview and check the ADMIN_DB binding." />;
  const draft = await getDraft(db, slug);
  if (!draft) return <PreviewUnavailable title="Saved draft not found" explanation="This article is not in the database connected to this preview deployment. Return to the editor, reload saved drafts, and make sure you opened the latest branch preview." />;
  const { replaceBody } = await searchParams;
  const legacy = blogPosts.some(post => post.slug === slug);
  if (legacy && replaceBody !== "1") {
    const article = calculatorArticles.find(post => post.slug === slug);
    if (article) return <>
      <p className="mx-auto mt-6 max-w-4xl rounded-lg bg-amber-100 p-4 text-amber-900">Private metadata preview. The original article body is preserved. Nothing has been published.</p>
      <CalculatorArticle article={{ ...article, title: draft.title, seoTitle: draft.title,
        description: draft.description, category: draft.category, tags: draft.tags,
        modifiedAt: draft.updatedAt }} />
    </>;
    return <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">A complete replacement is required</h1>
      <p className="my-5">This article uses a custom layout. Metadata-only publishing is unavailable. To change it, choose a complete Markdown replacement and preview it before publishing.</p>
      <a href={`/blog/${slug}`} className="text-blue-700 underline">View existing article</a>
    </section>;
  }
  return <CmsArticle post={{ ...draft, modifiedAt: draft.updatedAt }} preview />;
}
