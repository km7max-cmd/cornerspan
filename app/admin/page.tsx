import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "../../data/blog";
import { calculatorArticles, type CalculatorArticle } from "../../data/calculator-articles";
import { hasAdminAccess } from "../../lib/admin-auth";
import { listPublishedPosts } from "../../lib/published-posts";
import AdminPostEditor from "./post-editor";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Post Editor | CornerSpan",
  robots: { index: false, follow: false },
};

function cleanCell(text: string): string {
  return text.replace(/\|/g, " / ").replace(/\s+/g, " ").trim();
}

function table(headers: string[], rows: string[][]): string {
  if (!headers.length) return "";
  const head = "| " + headers.map(cleanCell).join(" | ") + " |";
  const divider = "| " + headers.map(() => "---").join(" | ") + " |";
  return [head, divider, ...rows.map(row => "| " + headers.map((_, index) => cleanCell(row[index] || "")).join(" | ") + " |")].join("\n");
}

function articleToMarkdown(article: CalculatorArticle): string {
  const content: string[] = [];
  if (article.image && /^\//.test(article.image)) content.push(`![${article.imageAlt || article.title}](${article.image})`);
  content.push(...article.intro);
  if (article.formula) content.push("## Calculation formula", article.formula);
  if (article.example?.length) content.push("## Worked example", table(["Step", "Method", "Result"], article.example));
  for (const section of article.sections) {
    content.push("## " + section.title, ...section.paragraphs);
    if (section.table) content.push(table(section.table.headers, section.table.rows));
  }
  if (article.mistakes?.length) content.push("## Common mistakes", ...article.mistakes.map(item => "- " + item));
  if (article.faqs?.length) {
    content.push("## Frequently asked questions");
    for (const faq of article.faqs) content.push("### " + faq.question, faq.answer);
  }
  if (article.sources?.length) content.push("## Sources", ...article.sources.map(source => "- [" + source.label + "](" + source.href + ")"));
  if (article.related?.length) content.push("## Related guides", ...article.related.filter(href => href.startsWith("/")).map(href => "- [Read related guide](" + href + ")"));
  return content.filter(Boolean).join("\n\n");
}

export default async function AdminPage() {
  if (!(await hasAdminAccess())) notFound();
  const catalog = blogPosts.map(({ slug, title, description, category, tags, publishedAt }) => {
    const article = calculatorArticles.find(item => item.slug === slug);
    return {
      slug, title, description, category, tags, publishedAt,
      body: article ? articleToMarkdown(article) : "",
    };
  });
  const posts = new Map(catalog.map(post => [post.slug, post]));
  for (const published of await listPublishedPosts()) {
    const old = posts.get(published.slug);
    posts.set(published.slug, {
      slug: published.slug,
      title: published.title,
      description: published.description,
      category: published.category,
      tags: published.tags,
      publishedAt: old?.publishedAt || published.publishedAt,
      body: published.bodyOverride ? published.body : (old?.body || ""),
    });
  }
  return <AdminPostEditor posts={[...posts.values()]} />;
}
