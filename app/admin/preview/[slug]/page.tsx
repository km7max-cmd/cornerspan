import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasAdminAccess } from "../../../../lib/admin-auth";
import { draftDatabase, getDraft } from "../../../../lib/admin-drafts";
import CmsArticle from "../../../../components/blog/CmsArticle";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Private Post Preview | CornerSpan", robots: { index: false, follow: false } };

export default async function PreviewPage({ params }: { params: Promise<{slug:string}> }) {
  if (!(await hasAdminAccess())) notFound();
  const { slug } = await params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) notFound();
  const db = draftDatabase();
  if (!db) notFound();
  const draft = await getDraft(db, slug);
  if (!draft) notFound();
  if (!draft.body.trim()) {
    return <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Metadata-only draft</h1>
      <p className="my-5">This draft does not replace the existing article body. Review the original article before publishing its metadata changes.</p>
      <a href={`/blog/${slug}`} className="text-blue-700 underline">View existing article</a>
    </section>;
  }
  return <CmsArticle post={{ ...draft, modifiedAt: draft.updatedAt }} preview />;
}
