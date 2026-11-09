import type { Metadata } from "next";
import { blogPosts } from "../../data/blog";
import AdminPostEditor from "./post-editor";

export const metadata: Metadata = {
  title: "Post Editor | CornerSpan",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const posts = blogPosts.map(({ slug, title, description, category, tags, publishedAt }) => ({
    slug, title, description, category, tags, publishedAt,
  }));
  return <AdminPostEditor posts={posts} />;
}
