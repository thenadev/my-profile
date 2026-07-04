import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  /** Slug = Dateiname ohne .md */
  slug: string;
  title: string;
  date: string;
  author: string;
  /** Meta-Description (120–160 Zeichen). */
  description: string;
  /** Kernaussagen für die TLDR-Box. */
  tldr: string[];
  /** Pfad/URL zum Titelbild (z.B. /blog/<slug>/cover.png) oder undefined. */
  cover?: string;
  coverAlt?: string;
  tags: string[];
  /** true = wird in Produktion nicht ausgeliefert. */
  draft: boolean;
  /** Markdown-Body (ohne Frontmatter). */
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v));
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}

function parseFile(fileName: string): BlogPost {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug: (data.slug as string) || slug,
    title: (data.title as string) ?? slug,
    date: data.date ? new Date(data.date as string).toISOString() : "",
    author: (data.author as string) ?? "Thomas Schwabauer",
    description: (data.description as string) ?? "",
    tldr: toStringArray(data.tldr),
    cover: (data.cover as string) || undefined,
    coverAlt: (data.coverAlt as string) || undefined,
    tags: toStringArray(data.tags),
    draft: data.draft === true,
    content: content.trim(),
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(parseFile)
    // Entwürfe nur in der Entwicklung anzeigen.
    .filter((post) => !post.draft || process.env.NODE_ENV !== "production");

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

/**
 * Meta-Description: bevorzugt das Frontmatter-Feld, sonst die ersten
 * ~155 Zeichen des Bodys (Markdown-Syntax grob entfernt).
 */
export function excerpt(post: BlogPost, maxLength = 155): string {
  if (post.description) return post.description;
  const text = post.content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`~[\]()!-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, text.lastIndexOf(" ", maxLength - 1))}…`;
}

/** Grobe Lesezeit in Minuten (200 Wörter/Min). */
export function readingMinutes(post: BlogPost): number {
  const words = post.content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
