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
      const res = await fetch('/api/blogs.php');
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
      await fetch(`/api/blogs.php?id=${editingId}`, {
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

      await fetch('/api/blogs.php', {
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
    
    await fetch(`/api/blogs.php?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchBlogs();
  };



  return (
    <div className="p-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Blogs</h1>
          <p className="text-muted-foreground">Write and manage your articles.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-display font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5">
          <Plus size={18} /> Compose Blog
        </button>
      </div>

      <div className="bg-background/40 backdrop-blur-md border border-border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/20 text-muted-foreground text-sm font-display tracking-wide">
              <th className="p-5 font-semibold">Article</th>
              <th className="p-5 font-semibold">Permalink</th>
              <th className="p-5 font-semibold">Date</th>
              <th className="p-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : blogs.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No blogs found.</td></tr>
            ) : (
              blogs.map(blog => (
                <tr key={blog.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                  <td className="p-5">
                    <div className="font-display font-bold text-foreground mb-1.5 text-lg">{blog.title}</div>
                    <div className="text-xs font-medium text-primary">By {blog.author}</div>
                  </td>
                  <td className="p-5 text-muted-foreground text-sm font-medium">/{blog.slug}</td>
                  <td className="p-5 text-muted-foreground text-sm">{new Date(blog.created_at).toLocaleDateString()}</td>
                  <td className="p-5 text-right">
                    <button onClick={() => openEditModal(blog)} className="text-muted-foreground hover:text-primary p-2 transition-colors"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(blog.id)} className="text-muted-foreground hover:text-red-500 p-2 transition-colors"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-background border border-border rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">{editingId ? 'Edit Blog' : 'Compose Blog'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-bold font-display text-foreground mb-1.5">Title</label>
                  <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold font-display text-foreground mb-1.5">Custom Slug <span className="font-normal text-muted-foreground">(Optional)</span></label>
                  <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all shadow-sm" placeholder="auto-generated-from-title" />
                </div>
                <div>
                  <label className="block text-sm font-bold font-display text-foreground mb-1.5">Author</label>
                  <input required type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all shadow-sm" />
                </div>
              </div>

              {!editingId && (
                <div>
                  <label className="block text-sm font-bold font-display text-foreground mb-1.5">Cover Image</label>
                  <input required type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-muted-foreground focus:border-primary/50 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:font-display file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 transition-all cursor-pointer shadow-sm" />
                </div>
              )}

              <div>
                <label className="block text-sm font-bold font-display text-foreground mb-1.5">Content</label>
                <div className="bg-background rounded-xl overflow-hidden border border-border shadow-sm text-black">
                  <JoditEditor
                    value={content}
                    config={{ theme: 'dark', height: 500, readonly: false }}
                    onBlur={newContent => setContent(newContent)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-bold font-display text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold font-display rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:-translate-y-0.5">Publish Article</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
