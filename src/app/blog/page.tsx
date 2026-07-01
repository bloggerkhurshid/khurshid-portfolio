"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Blog {
  id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  image_path: string;
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://kode.devkayy.in/api/blogs.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">Writing.</h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl">
            Thoughts, tutorials, and deep dives into web development, design, and software architecture.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-muted py-20 border-t border-border">Loading articles...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-muted py-20 border-t border-border">No articles published yet.</div>
        ) : (
          <div className="flex flex-col border-t border-border">
            {posts.map((post, index) => (
              <motion.a
                key={post.id}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 py-10 border-b border-border hover:bg-white/[0.02] transition-colors -mx-6 px-6 sm:mx-0 sm:px-4 md:px-6 rounded-none sm:rounded-lg"
              >
                <div className="w-full md:w-48 shrink-0 text-sm font-medium text-gray-500 uppercase tracking-widest mt-1">
                  {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-200 group-hover:text-white transition-colors tracking-tight">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed font-light line-clamp-2">
                    {post.content
                      .replace(/<[^>]*>?/gm, '')
                      .replace(/&nbsp;/g, ' ')
                      .replace(/&#39;/g, "'")
                      .replace(/&amp;/g, '&')
                      .replace(/&quot;/g, '"')
                      .replace(/&lt;/g, '<')
                      .replace(/&gt;/g, '>')}
                  </p>
                  <div className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                    <span>By {post.author}</span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white ml-2">
                      →
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
