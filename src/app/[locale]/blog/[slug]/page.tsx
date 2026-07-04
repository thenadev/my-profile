import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getAllPosts, getPostBySlug, excerpt } from "@/lib/blog";
import { buildMetadata, localizedUrl } from "@/lib/seo";
import { buildArticleSchema, jsonLd } from "@/lib/schema";

interface BlogPostPageParams {
  locale: Locale;
  slug: string;
}

export function generateStaticParams(): { locale: Locale; slug: string }[] {
  const posts = getAllPosts();
  // Kartesisches Produkt aus allen Slugs × allen Locales.
  // Slug ROH lassen — er kann Klammern enthalten (z.B. "...(2025-comparison)").
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
  if (!post) {
    return {};
  }
  return buildMetadata({
    locale,
    // In URLs muss der Slug URL-encodiert sein (Klammern etc.).
    path: `/blog/${encodeURIComponent(slug)}`,
    title: post.title,
    description: excerpt(post),
    ogType: "article",
    // Blog-Artikel nur auf Deutsch: Canonical immer auf die DE-URL,
    // kein de/en-hreflang (verhindert Duplicate Content).
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
  if (!post) {
    notFound();
  }

  const canonicalUrl = localizedUrl(locale, `/blog/${encodeURIComponent(slug)}`);
  const articleSchema = buildArticleSchema({
    title: post.title,
    description: excerpt(post),
    url: canonicalUrl,
    datePublished: post.date,
    author: post.author,
  });

  return (
    <div className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(articleSchema)}
      />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <nav className="mb-10">
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
            Back to Blog
          </Link>
        </nav>

        <article className="bg-card text-card-foreground rounded-lg shadow-xl p-6 sm:p-8 lg:p-10 border border-border">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground leading-tight">
              {post.title}
            </h1>
            <div className="text-base text-muted-foreground">
              <span>By {post.author}</span> |{" "}
              <span>Published on {new Date(post.date).toLocaleDateString()}</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
