"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface Blog {
  id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  image_path: string;
  created_at: string;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [author, setAuthor] = useState('Khurshid Alom');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('https://kode.devkayy.in/api/blogs.php');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAddModal = () => {
    setTitle('');
    setSlug('');
    setAuthor('Khurshid Alom');
    setContent('');
    setImage(null);
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (blog: Blog) => {
    setTitle(blog.title);
    setSlug(blog.slug);
    setAuthor(blog.author);
    setContent(blog.content);
    setImage(null);
    setEditingId(blog.id);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    
    if (editingId) {
      // Update
      await fetch(`https://kode.devkayy.in/api/blogs.php?id=${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ title, slug, author, content })
      });
    } else {
      // Create
      const data = new FormData();
      data.append('title', title);
      data.append('slug', slug);
      data.append('author', author);
      data.append('content', content);
      if (image) data.append('image', image);

      await fetch('https://kode.devkayy.in/api/blogs.php', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
      });
    }

    setShowModal(false);
    fetchBlogs();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    const token = localStorage.getItem('admin_token');
    
    await fetch(`https://kode.devkayy.in/api/blogs.php?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchBlogs();
  };



  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blogs</h1>
          <p className="text-zinc-400">Write and manage your articles.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-zinc-200 transition-colors">
          <Plus size={18} /> Compose Blog
        </button>
      </div>

      <div className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/50 text-zinc-400 text-sm">
              <th className="p-4 font-medium">Article</th>
              <th className="p-4 font-medium">Permalink</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-4 text-center text-zinc-500">Loading...</td></tr>
            ) : blogs.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-center text-zinc-500">No blogs found.</td></tr>
            ) : (
              blogs.map(blog => (
                <tr key={blog.id} className="border-b border-zinc-900/50 hover:bg-zinc-900/20">
                  <td className="p-4">
                    <div className="font-bold text-white mb-1">{blog.title}</div>
                    <div className="text-xs text-zinc-500">By {blog.author}</div>
                  </td>
                  <td className="p-4 text-zinc-400 text-sm">/{blog.slug}</td>
                  <td className="p-4 text-zinc-400 text-sm">{new Date(blog.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEditModal(blog)} className="text-zinc-400 hover:text-white p-2 transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(blog.id)} className="text-zinc-400 hover:text-red-500 p-2 transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-white mb-6">{editingId ? 'Edit Blog' : 'Compose Blog'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Title</label>
                  <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-zinc-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Custom Slug (Optional)</label>
                  <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-zinc-500 outline-none" placeholder="auto-generated-from-title" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Author</label>
                  <input required type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-zinc-500 outline-none" />
                </div>
              </div>

              {!editingId && (
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Cover Image</label>
                  <input required type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-400 focus:border-zinc-500 outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-zinc-200" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Content</label>
                <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 text-black">
                  <JoditEditor
                    value={content}
                    config={{ theme: 'dark', height: 400, readonly: false }}
                    onBlur={newContent => setContent(newContent)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
