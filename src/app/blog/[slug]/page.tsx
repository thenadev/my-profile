"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';

interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
}

const BlogPostPage: NextPage<{ params: { slug: string } }> = ({ params }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      const fetchPost = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/blog/${params.slug}`);
          if (!res.ok) {
            if (res.status === 404) {
              setError('Post not found. It might have been moved or deleted.');
            } else {
              const errorData = await res.json();
              setError(errorData.message || 'Failed to fetch post');
            }
            setPost(null);
            return;
          }
          const data: Post = await res.json();
          setPost(data);
        } catch (err: any) {
          console.error(err);
          setError(err.message || 'An unknown error occurred while fetching the post.');
          setPost(null);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    } else {
      setError("No slug provided."); // Should not happen with Next.js routing
      setLoading(false);
    }
  }, [params.slug]);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <nav className="mb-10">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Blog
          </Link>
        </nav>

        {loading && (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">Loading post...</p>
            {/* Optional: Add a spinner here */}
          </div>
        )}

        {error && (
          <div className="text-center py-10 bg-destructive/10 text-destructive p-6 rounded-lg shadow-md">
            <p className="text-2xl font-semibold mb-2">Oops! Something went wrong.</p>
            <p className="text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && !post && (
          // This state is typically when error is set to "Post not found"
          // If error is not set but post is null, it's an unexpected state or params.slug was initially null
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">Post not found.</p>
          </div>
        )}

        {!loading && !error && post && (
          <article className="bg-card text-card-foreground rounded-lg shadow-xl p-6 sm:p-8 lg:p-10 border border-border">
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground leading-tight">{post.title}</h1>
              <div className="text-base text-muted-foreground">
                <span>By {post.author}</span> | <span>Published on {new Date(post.date).toLocaleDateString()}</span>
              </div>
            </header>
            
            {/* 
              For Markdown content, you would typically use a library like 'react-markdown'.
              Example: <ReactMarkdown className="prose prose-lg max-w-none text-foreground/90">{post.content}</ReactMarkdown>
              The `prose` classes from @tailwindcss/typography are designed for this.
              Ensure @tailwindcss/typography is installed and configured in tailwind.config.ts.
              If not using Markdown, the div below will render plain text.
            */}
            <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed">
              {/* Assuming post.content is plain text. If it's HTML, use dangerouslySetInnerHTML (with caution) or sanitize. */}
              {/* For simple text with line breaks, you might want to split by newline or use <pre> for preformatted text. */}
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
