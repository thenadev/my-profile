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
  content: string; // Assuming content might also be available
}

const BlogPage: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/blog');
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch posts');
        }
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center text-foreground">Blog</h1>

        {loading && (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">Loading posts...</p>
            {/* Optional: Add a spinner here */}
          </div>
        )}

        {error && (
          <div className="text-center py-10 bg-destructive/10 text-destructive p-4 rounded-md">
            <p className="text-xl font-semibold">Oops!</p>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
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
                    By {post.author} on {new Date(post.date).toLocaleDateString()}
                  </p>
                  {/* Example of content snippet - assuming post.content is plain text */}
                  {/* <p className="text-foreground/80 mb-4">{post.content.substring(0, 100)}...</p> */}
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
};

export default BlogPage;
