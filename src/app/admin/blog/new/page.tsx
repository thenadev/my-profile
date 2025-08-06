"use client";

import { useState, FormEvent } from 'react';
import { NextPage } from 'next';
import Link from 'next/link'; // For potential redirection or links

const NewBlogPostPage: NextPage = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Secret': secretKey,
        },
        body: JSON.stringify({ title, content, author }),
      });

      const responseData = await response.json();

      if (response.status === 201) {
        setSuccessMessage(`Post "${responseData.title}" created successfully! Slug: ${responseData.slug}`);
        // Clear form
        setTitle('');
        setContent('');
        setAuthor('');
        // Optionally clear secretKey or keep it if user might post multiple times
        // setSecretKey(''); 
      } else {
        setErrorMessage(responseData.message || `Error: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      setErrorMessage(error.message || 'An unexpected error occurred. Check the console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Create New Blog Post</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Fill out the form below to publish a new article to the blog.
          </p>
        </header>
      
        <div className="bg-card text-card-foreground p-6 sm:p-8 rounded-lg shadow-xl border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder-muted-foreground"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-foreground mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={12}
                className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder-muted-foreground"
                placeholder="Write your blog post content here. Markdown is supported."
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-foreground mb-1">
                Author
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder-muted-foreground"
                placeholder="Author's name"
              />
            </div>

            <div>
              <label htmlFor="secretKey" className="block text-sm font-medium text-foreground mb-1">
                Admin Secret Key
              </label>
              <input
                type="password"
                id="secretKey"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder-muted-foreground"
                placeholder="Enter admin secret key"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                This key is required to authorize post creation. Keep it confidential.
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Creating Post...' : 'Create Post'}
              </button>
            </div>
          </form>

          {successMessage && (
            <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 text-green-700 dark:text-green-400 rounded-md">
              <p className="font-semibold mb-1">Success!</p>
              <p className="text-sm">{successMessage}</p>
              {successMessage.includes("Slug:") && (
                 <Link href={`/blog/${successMessage.split('Slug: ')[1].trim()}`} 
                       className="text-sm font-medium text-green-800 dark:text-green-300 hover:underline mt-1 block">
                    View Post &rarr;
                 </Link>
              )}
            </div>
          )}

          {errorMessage && (
            <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-md">
              <p className="font-semibold mb-1">Error Creating Post</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}
        </div>
        <div className="mt-10 text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
               </svg>
              Back to Blog
            </Link>
        </div>
      </div>
    </div>
  );
};

export default NewBlogPostPage;
