import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'data', 'blog.json');
const ADMIN_SECRET = process.env.BLOG_ADMIN_SECRET || "SUPER_SECRET_KEY_REPLACE_ME";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle GET request
    try {
      if (!fs.existsSync(dataPath)) {
        // If blog.json doesn't exist, return an empty array
        return res.status(200).json([]);
      }
      const fileContent = fs.readFileSync(dataPath, 'utf-8');
      if (fileContent.trim() === '') {
        // If blog.json is empty, return an empty array
        return res.status(200).json([]);
      }
      const posts = JSON.parse(fileContent);
      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error reading blog data' });
    }
  } else if (req.method === 'POST') {
    // Handle POST request
    const providedSecret = req.headers['x-admin-secret'];
    if (providedSecret !== ADMIN_SECRET) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const newPostData = req.body;

      let posts = [];
      if (fs.existsSync(dataPath)) {
        const fileContent = fs.readFileSync(dataPath, 'utf-8');
        if (fileContent.trim() !== '') {
          posts = JSON.parse(fileContent);
        }
      }

      const newPost = {
        id: Date.now().toString(),
        slug: newPostData.title.toLowerCase().replace(/\s+/g, '-'),
        author: 'Admin', // Hardcoded author
        date: new Date().toISOString(), // Hardcoded date
        ...newPostData,
      };

      posts.push(newPost);

      fs.writeFileSync(dataPath, JSON.stringify(posts, null, 2));

      return res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error writing blog data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
