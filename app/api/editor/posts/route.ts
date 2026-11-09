import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "node:buffer";
import { blogPosts } from "../../../../data/blog";
import { calculatorArticles, type CalculatorArticle } from "../../../../data/calculator-articles";
import bundledEditorPosts from "../../../../data/editor-posts.json";

export const dynamic = "force-dynamic";

const REPO = "km7max-cmd/cornerspan";
const BRANCH = "main";
const POSTS_FILE = "data/editor-posts.json";
const OVERRIDES_FILE = "data/editor-overrides.json";

type Revisioned<T> = { sha: string; value: T };
type Overrides = Record<string, Partial<CalculatorArticle>>;

function response(body: object, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" },
  });
}

function authorized(request: NextRequest) {
  const password = process.env.CORNERSPAN_EDITOR_PASSWORD;
  const token = process.env.CORNERSPAN_GITHUB_TOKEN;
  if (!password || !token) return { ok: false, status: 503, error: "Editor secrets are not configured in Cloudflare." };
  const header = request.headers.get("authorization") ?? "";
  const candidate = header.startsWith("Bearer ") ? header.slice(7) : "";
  let difference = candidate.length ^ password.length;
  // Equal-work comparison for same-sized passwords; never return the secret.
  for (let i = 0; i < Math.max(candidate.length, password.length); i++) {
    difference |= (candidate.charCodeAt(i) || 0) ^ (password.charCodeAt(i) || 0);
  }
  if (difference !== 0) return { ok: false, status: 401, error: "Incorrect editor password." };
  return { ok: true, status: 200, token };
}

async function gitFile<T>(token: string, path: string): Promise<Revisioned<T>> {
  const r = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`GitHub read failed (${r.status}). Check the repository token permissions.`);
  const file = (await r.json()) as { content: string; sha: string };
  const json = Buffer.from(file.content.replace(/\\s/g, ""), "base64").toString("utf8");
  return { value: JSON.parse(json) as T, sha: file.sha };
}

async function gitWrite(token: string, path: string, sha: string, data: unknown, message: string) {
  const r = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(JSON.stringify(data, null, 2) + "\\n", "utf8").toString("base64"),
      sha,
      branch: BRANCH,
    }),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`GitHub publish failed (${r.status}). Check token write access and branch protection.`);
  const result = (await r.json()) as { commit?: { sha?: string } };
  return result.commit?.sha ?? "";
}

function isArticle(x: unknown): x is CalculatorArticle {
  if (!x || typeof x !== "object") return false;
  const a = x as Partial<CalculatorArticle>;
  return (
    typeof a.slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug) && a.slug.length <= 100 &&
    typeof a.title === "string" && a.title.trim().length >= 8 && a.title.length <= 180 &&
    typeof a.description === "string" && a.description.trim().length >= 40 && a.description.length <= 320 &&
    typeof a.category === "string" && a.category.length > 0 &&
    typeof a.calculatorHref === "string" && a.calculatorHref.startsWith("/calculators") &&
    typeof a.formula === "string" &&
    Array.isArray(a.tags) && a.tags.every(x => typeof x === "string") &&
    Array.isArray(a.intro) && a.intro.length > 0 && a.intro.every(x => typeof x === "string" && x.trim()) &&
    Array.isArray(a.example) && a.example.every(row => Array.isArray(row) && row.length === 3 && row.every(x => typeof x === "string")) &&
    Array.isArray(a.sections) && a.sections.length > 0 &&
    a.sections.every(s => !!s && typeof s.id === "string" && typeof s.title === "string" && s.title.trim() && Array.isArray(s.paragraphs) && s.paragraphs.every(p => typeof p === "string")) &&
    Array.isArray(a.mistakes) && a.mistakes.every(x => typeof x === "string") &&
    Array.isArray(a.faqs) && a.faqs.every(f => !!f && typeof f.question === "string" && typeof f.answer === "string") &&
    Array.isArray(a.sources) && a.sources.every(s => !!s && typeof s.label === "string" && typeof s.href === "string") &&
    Array.isArray(a.related) && a.related.every(x => typeof x === "string")
  );
}

export async function GET(request: NextRequest) {
  const auth = authorized(request);
  if (!auth.ok) return response({ error: auth.error }, auth.status);
  try {
    const [postsFile, overridesFile] = await Promise.all([
      gitFile<CalculatorArticle[]>(auth.token!, POSTS_FILE),
      gitFile<Overrides>(auth.token!, OVERRIDES_FILE),
    ]);
    if (!Array.isArray(postsFile.value) || !overridesFile.value || Array.isArray(overridesFile.value)) {
      throw new Error("Editor content files are invalid.");
    }

    const merged = new Map(calculatorArticles.map(a => [a.slug, a] as const));
    for (const [slug, update] of Object.entries(overridesFile.value)) {
      const old = merged.get(slug);
      if (old) merged.set(slug, { ...old, ...update, slug, publishedAt: old.publishedAt });
    }
    for (const article of postsFile.value) merged.set(article.slug, article);
    const custom = blogPosts.filter(p => !merged.has(p.slug));

    return response({
      articles: [...merged.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
      codeManaged: custom.map(p => ({ slug: p.slug, title: p.title })),
      revisions: { posts: postsFile.sha, overrides: overridesFile.sha },
    });
  } catch (error) {
    return response({ error: error instanceof Error ? error.message : "Could not load posts." }, 502);
  }
}

export async function POST(request: NextRequest) {
  const auth = authorized(request);
  if (!auth.ok) return response({ error: auth.error }, auth.status);
  try {
    const raw = await request.text();
    if (raw.length > 300_000) return response({ error: "Article data is too large." }, 413);
    const payload = JSON.parse(raw) as { article?: unknown; expectedSha?: unknown };
    if (!isArticle(payload.article) || typeof payload.expectedSha !== "string") {
      return response({ error: "Required article fields are missing or invalid. Check title, description, introduction and sections." }, 400);
    }
    const article = payload.article;
    const slug = article.slug;
    const today = new Date().toISOString().slice(0, 10);

    const [postsFile, overridesFile] = await Promise.all([
      gitFile<CalculatorArticle[]>(auth.token!, POSTS_FILE),
      gitFile<Overrides>(auth.token!, OVERRIDES_FILE),
    ]);
    const isPublishedNew = postsFile.value.some(p => p.slug === slug);
    const deployedNew = (bundledEditorPosts as CalculatorArticle[]).some(p => p.slug === slug);
    const isOriginal = !isPublishedNew && !deployedNew && calculatorArticles.some(p => p.slug === slug);
    const reserved = blogPosts.some(p => p.slug === slug) && !calculatorArticles.some(p => p.slug === slug);
    if (reserved) return response({ error: "This article has a custom code-managed layout and cannot yet be edited here." }, 409);

    const isOverride = isOriginal;
    const target = isOverride ? overridesFile : postsFile;
    if (target.sha !== payload.expectedSha) {
      return response({ error: "Another publish changed this content file. Reload the dashboard to avoid overwriting those changes." }, 409);
    }
    const existing = isOverride
      ? calculatorArticles.find(p => p.slug === slug)
      : postsFile.value.find(p => p.slug === slug);

    const clean: CalculatorArticle = {
      ...article,
      slug,
      title: article.title.trim(),
      description: article.description.trim(),
      category: article.category.trim(),
      tags: article.tags.map(s => s.trim()).filter(Boolean),
      publishedAt: existing?.publishedAt ?? today,
      modifiedAt: today,
      image: typeof article.image === "string" ? article.image : null,
      seoTitle: typeof article.seoTitle === "string" ? article.seoTitle.trim() : undefined,
    };
    if (!existing && blogPosts.some(p => p.slug === slug)) {
      return response({ error: "This URL slug already belongs to an existing post." }, 409);
    }
    let commitSha = "";
    if (isOverride) {
      const next: Overrides = { ...overridesFile.value, [slug]: clean };
      commitSha = await gitWrite(auth.token!, OVERRIDES_FILE, overridesFile.sha, next, `Edit article: ${slug}`);
    } else {
      const updated = [...postsFile.value.filter(p => p.slug !== slug), clean];
      commitSha = await gitWrite(auth.token!, POSTS_FILE, postsFile.sha, updated, `Publish article: ${slug}`);
    }
    return response({
      ok: true,
      slug,
      commitUrl: `https://github.com/${REPO}/commit/${commitSha}`,
      message: "Saved to GitHub. The post appears on the live website after Cloudflare successfully deploys this commit.",
    });
  } catch (error) {
    return response({ error: error instanceof Error ? error.message : "Publish failed." }, 502);
  }
}
