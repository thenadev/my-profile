import "server-only";
import fs from "fs";
import path from "path";

export interface BlogPost {
  id: number;
  slug: string;
  author: string;
  date: string;
  title: string;
  content: string;
}

const BLOG_FILE = path.join(process.cwd(), "src", "data", "blog.json");

export function getAllPosts(): BlogPost[] {
  const raw = fs.readFileSync(BLOG_FILE, "utf-8");
  const posts = JSON.parse(raw) as BlogPost[];
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

/** Erste ~155 Zeichen des Inhalts als Meta-Description. */
export function excerpt(post: BlogPost, maxLength = 155): string {
  const text = post.content.replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, text.lastIndexOf(" ", maxLength - 1))}…`;
}
