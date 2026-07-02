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
    <div className="p-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-display font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5">
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div className="bg-background/40 backdrop-blur-md border border-border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/20 text-muted-foreground text-sm font-display tracking-wide">
              <th className="p-5 font-semibold">Project</th>
              <th className="p-5 font-semibold">Tech Stacks</th>
              <th className="p-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="p-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan={3} className="p-8 text-center text-muted-foreground">No projects found.</td></tr>
            ) : (
              projects.map(project => (
                <tr key={project.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                  <td className="p-5">
                    <div className="font-display font-bold text-foreground mb-1.5 text-lg">{project.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1 max-w-md leading-relaxed">{project.description}</div>
                  </td>
                  <td className="p-5">
                    <div className="flex gap-2 flex-wrap">
                      {project.tech_stacks.split(',').map((tech, i) => (
                        <span key={i} className="text-xs font-medium bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-md">{tech.trim()}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <button onClick={() => openEditModal(project)} className="text-muted-foreground hover:text-primary p-2 transition-colors"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(project.id)} className="text-muted-foreground hover:text-red-500 p-2 transition-colors"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-background border border-border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">{editingId ? 'Edit Project' : 'Add Project'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold font-display text-foreground mb-1.5">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold font-display text-foreground mb-1.5">Custom Slug <span className="font-normal text-muted-foreground">(Optional)</span></label>
                  <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all shadow-sm" placeholder="auto-generated" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold font-display text-foreground mb-1.5">Description</label>
                <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all shadow-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-bold font-display text-foreground mb-1.5">Tech Stacks <span className="font-normal text-muted-foreground">(comma separated)</span></label>
                <input required type="text" value={formData.tech_stacks} onChange={e => setFormData({...formData, tech_stacks: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all shadow-sm" placeholder="React, Node.js, Tailwind" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold font-display text-foreground mb-1.5">Live URL</label>
                  <input type="url" value={formData.live_url} onChange={e => setFormData({...formData, live_url: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold font-display text-foreground mb-1.5">GitHub URL</label>
                  <input type="url" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all shadow-sm" />
                </div>
              </div>
              {!editingId && (
                <div>
                  <label className="block text-sm font-bold font-display text-foreground mb-1.5">Thumbnail Image</label>
                  <input required type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-muted-foreground focus:border-primary/50 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:font-display file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 transition-all cursor-pointer shadow-sm" />
                </div>
              )}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-bold font-display text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold font-display rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:-translate-y-0.5">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
