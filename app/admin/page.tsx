import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "../../data/blog";
import { hasAdminAccess } from "../../lib/admin-auth";
import AdminPostEditor from "./post-editor";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Post Editor | CornerSpan",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  // Deny even when the Cloudflare Access application has not been configured yet.
  if (!(await hasAdminAccess())) notFound();
  const posts = blogPosts.map(({ slug, title, description, category, tags, publishedAt }) => ({
    slug, title, description, category, tags, publishedAt,
  }));
  return <AdminPostEditor posts={posts} />;
}
