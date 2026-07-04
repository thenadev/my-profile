import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  getAllPosts,
  getPostBySlug,
  excerpt,
  readingMinutes,
} from "@/lib/blog";
import { buildMetadata, localizedUrl, SITE_URL } from "@/lib/seo";
import { buildArticleSchema, jsonLd } from "@/lib/schema";

interface BlogPostPageParams {
  locale: Locale;
  slug: string;
}

// Nur zur Build-Zeit bekannte Slugs rendern; unbekannte → 404 (kein
// Runtime-Dateizugriff, da src/content nicht ins Runner-Image kopiert wird).
export const dynamicParams = false;

export function generateStaticParams(): { locale: Locale; slug: string }[] {
  const posts = getAllPosts();
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  );
}

export function generateMetadata({
  params: { locale, slug },
}: {
  params: BlogPostPageParams;
}): Metadata {
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    path: `/blog/${encodeURIComponent(slug)}`,
    title: post.title,
    description: excerpt(post),
    ogType: "article",
    ...(post.cover ? { ogImage: post.cover } : {}),
    // Blog nur auf Deutsch: Canonical immer auf DE, kein de/en-hreflang.
    canonicalLocale: "de",
  });
}

export default function BlogPostPage({
  params: { locale, slug },
}: {
  params: BlogPostPageParams;
}) {
  unstable_setRequestLocale(locale);

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const canonicalUrl = localizedUrl(locale, `/blog/${encodeURIComponent(slug)}`);
  const articleSchema = buildArticleSchema({
    title: post.title,
    description: excerpt(post),
    url: canonicalUrl,
    datePublished: post.date,
    author: post.author,
    image: post.cover ? `${SITE_URL}${post.cover}` : undefined,
  });

  return (
    <div className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(articleSchema)}
      />
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Zurück zum Blog
          </Link>
        </nav>

        <article>
          <header className="mb-8">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground leading-tight">
              {post.title}
            </h1>
            <div className="text-sm text-muted-foreground">
              <span>{post.author}</span>
              {post.date && (
                <>
                  {" · "}
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("de-DE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </>
              )}
              {" · "}
              <span>{readingMinutes(post)} Min. Lesezeit</span>
            </div>
          </header>

          {post.cover && (
            <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden rounded-2xl border border-border">
              <Image
                src={post.cover}
                alt={post.coverAlt ?? post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          {post.tldr.length > 0 && (
            <aside className="mb-10 rounded-2xl border border-primary/30 bg-primary/5 p-5 md:p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-primary mb-3">
                TL;DR
              </p>
              <ul className="space-y-2">
                {post.tldr.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-primary prose-img:rounded-xl">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeHighlight]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
