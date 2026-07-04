import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { getAllPosts, excerpt } from "@/lib/blog";
import { buildMetadata, localizedUrl } from "@/lib/seo";
import { jsonLd } from "@/lib/schema";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    locale,
    path: "/blog",
    title: t("blog.title"),
    description: t("blog.description"),
    // Blog nur auf Deutsch: Canonical immer auf die DE-URL, kein hreflang.
    canonicalLocale: "de",
  });
}

export default function BlogPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);

  const posts = getAllPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog - Thomas Schwabauer",
    description:
      "Artikel zu Webentwicklung, React, Flutter, Angular und Mobile Apps. Thomas Schwabauer - Fullstack Developer aus Wetzlar.",
    url: localizedUrl(locale, "/blog"),
    publisher: {
      "@type": "Person",
      name: "Thomas Schwabauer",
      url: localizedUrl(locale, "/"),
    },
  };

  return (
    <div className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(blogSchema)}
      />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Artikel zu Webentwicklung, React, Flutter, Angular und Mobile Apps.
            Insights und Erfahrungen von Thomas Schwabauer – Fullstack Developer
            aus Wetzlar.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">
              Noch keine Beiträge – bald geht es los!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-card text-card-foreground rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border overflow-hidden flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                  {post.cover && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.cover}
                        alt={post.coverAlt ?? post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {excerpt(post)}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {post.date &&
                          new Date(post.date).toLocaleDateString("de-DE")}
                      </span>
                      <span className="text-primary font-medium group-hover:underline">
                        Weiterlesen →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
