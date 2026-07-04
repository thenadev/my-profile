import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
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
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-card text-card-foreground p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary hover:text-primary/80 hover:underline transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    By {post.author} on{" "}
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-auto">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary font-medium hover:text-primary/80 hover:underline transition-colors"
                  >
                    Read more &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
