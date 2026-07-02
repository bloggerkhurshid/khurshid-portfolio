"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  tech_stacks: string;
  live_url: string;
  github_url: string;
  image_path: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '', slug: '', description: '', tech_stacks: '', live_url: '', github_url: ''
  });
  const [image, setImage] = useState<File | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects.php');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setFormData({ title: '', slug: '', description: '', tech_stacks: '', live_url: '', github_url: '' });
    setImage(null);
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (project: Project) => {
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      tech_stacks: project.tech_stacks,
      live_url: project.live_url,
      github_url: project.github_url
    });
    setImage(null);
    setEditingId(project.id);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    
    if (editingId) {
      // Update (using JSON)
      await fetch(`/api/projects.php?id=${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
    } else {
      // Create (using FormData for image upload)
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (image) data.append('image', image);

      await fetch('/api/projects.php', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
      });
    }

    setShowModal(false);
    fetchProjects();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const token = localStorage.getItem('admin_token');
    
    await fetch(`/api/projects.php?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchProjects();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-zinc-400">Manage your portfolio projects.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-zinc-200 transition-colors">
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/50 text-zinc-400 text-sm">
              <th className="p-4 font-medium">Project</th>
              <th className="p-4 font-medium">Tech Stacks</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="p-4 text-center text-zinc-500">Loading...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan={3} className="p-4 text-center text-zinc-500">No projects found.</td></tr>
            ) : (
              projects.map(project => (
                <tr key={project.id} className="border-b border-zinc-900/50 hover:bg-zinc-900/20">
                  <td className="p-4">
                    <div className="font-bold text-white mb-1">{project.title}</div>
                    <div className="text-sm text-zinc-500 line-clamp-1 max-w-md">{project.description}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {project.tech_stacks.split(',').map((tech, i) => (
                        <span key={i} className="text-xs bg-zinc-900 text-zinc-300 px-2 py-1 rounded-md">{tech.trim()}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEditModal(project)} className="text-zinc-400 hover:text-white p-2 transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(project.id)} className="text-zinc-400 hover:text-red-500 p-2 transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-white mb-6">{editingId ? 'Edit Project' : 'Add Project'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-zinc-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Custom Slug (Optional)</label>
                  <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-zinc-500 outline-none" placeholder="auto-generated" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
                <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-zinc-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Tech Stacks (comma separated)</label>
                <input required type="text" value={formData.tech_stacks} onChange={e => setFormData({...formData, tech_stacks: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-zinc-500 outline-none" placeholder="React, Node.js, Tailwind" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Live URL</label>
                  <input type="url" value={formData.live_url} onChange={e => setFormData({...formData, live_url: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-zinc-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">GitHub URL</label>
                  <input type="url" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-zinc-500 outline-none" />
                </div>
              </div>
              {!editingId && (
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Thumbnail Image</label>
                  <input required type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-400 focus:border-zinc-500 outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-zinc-200" />
                </div>
              )}
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
