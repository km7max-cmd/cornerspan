import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasAdminAccess } from "../../../../lib/admin-auth";
import { draftDatabase, getDraft } from "../../../../lib/admin-drafts";
import CmsArticle from "../../../../components/blog/CmsArticle";
import CalculatorArticle from "../../../../components/blog/CalculatorArticle";
import { calculatorArticles } from "../../../../data/calculator-articles";
import { blogPosts } from "../../../../data/blog";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Private Post Preview | CornerSpan", robots: { index: false, follow: false } };

export default async function PreviewPage({ params, searchParams }: {
  params: Promise<{slug:string}>;
  searchParams: Promise<{replaceBody?:string}>;
}) {
  if (!(await hasAdminAccess())) notFound();
  const { slug } = await params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) notFound();
  const db = draftDatabase();
  if (!db) notFound();
  const draft = await getDraft(db, slug);
  if (!draft) notFound();
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
