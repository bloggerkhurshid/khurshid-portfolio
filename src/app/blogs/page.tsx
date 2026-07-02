import React from 'react';
import BlogListClient from '@/components/BlogListClient';

async function getBlogs() {
  try {
    const res = await fetch('https://kode.devkayy.in/api/blogs.php', { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function BlogPage() {
  const blogsData = await getBlogs();
  const posts = Array.isArray(blogsData) ? blogsData : [];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-background relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <BlogListClient posts={posts} />
      </div>
    </div>
  );
}
