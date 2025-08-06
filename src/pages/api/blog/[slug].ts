import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'data', 'blog.json');
const ADMIN_SECRET = process.env.BLOG_ADMIN_SECRET || "SUPER_SECRET_KEY_REPLACE_ME";

// Helper function to read blog data
const readBlogData = () => {
  if (!fs.existsSync(dataPath)) {
    return []; // Return empty array if file doesn't exist
  }
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  if (fileContent.trim() === '') {
    return []; // Return empty array if file is empty
  }
  return JSON.parse(fileContent);
};

// Helper function to write blog data
const writeBlogData = (data: any) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (typeof slug !== 'string') {
    return res.status(400).json({ message: 'Slug must be a string.' });
  }

  if (req.method === 'GET') {
    try {
      const posts = readBlogData();
      const post = posts.find((p: any) => p.slug === slug);

      if (post) {
        return res.status(200).json(post);
      } else {
        return res.status(404).json({ message: 'Blog post not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error reading blog data' });
    }
  } else if (req.method === 'PUT') {
    const providedSecret = req.headers['x-admin-secret'];
    if (providedSecret !== ADMIN_SECRET) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      let posts = readBlogData();
      const postIndex = posts.findIndex((p: any) => p.slug === slug);

      if (postIndex !== -1) {
        const updatedPostData = req.body;
        // Update the post, ensuring the slug from the URL is the source of truth
        // If the title changes, the slug in the post data should be updated
        const newSlug = updatedPostData.title ? updatedPostData.title.toLowerCase().replace(/\s+/g, '-') : slug;
        
        posts[postIndex] = {
          ...posts[postIndex], // Keep existing fields like id, author, date
          ...updatedPostData, // Apply updates from request body
          slug: newSlug, // Update slug based on title if present, otherwise keep original
        };
        
        // If the slug in the URL and the new slug from title are different, 
        // it implies we might want to update the slug itself.
        // For this implementation, we'll update the post's slug field,
        // but the lookup is still based on the original slug from the URL.
        // A more complex scenario might involve redirecting or creating a new entry.
        // For now, we ensure the slug field within the post object reflects the new title.
        if (slug !== newSlug && updatedPostData.title) {
            // If the slug is intended to change, we should update it in the object
            // This means the resource URL might need to change too, which is complex.
            // For now, the lookup uses the URL slug, but the saved object has the new slug.
            // This could lead to inconsistencies if not handled carefully on the client/frontend.
            // A better approach for changing slugs might be a separate endpoint or a more explicit mechanism.
            // Let's assume for now the slug in the URL is the primary identifier for *which* post to update.
            // The `slug` field *within* the post object gets updated if `title` is in `updatedPostData`.
        }


        writeBlogData(posts);
        return res.status(200).json(posts[postIndex]);
      } else {
        return res.status(404).json({ message: 'Blog post not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating blog data' });
    }
  } else if (req.method === 'DELETE') {
    const providedSecret = req.headers['x-admin-secret'];
    if (providedSecret !== ADMIN_SECRET) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      let posts = readBlogData();
      const postIndex = posts.findIndex((p: any) => p.slug === slug);

      if (postIndex !== -1) {
        posts.splice(postIndex, 1); // Remove the post
        writeBlogData(posts);
        return res.status(204).end();
      } else {
        return res.status(404).json({ message: 'Blog post not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting blog data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
