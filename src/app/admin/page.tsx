"use client";

import React, { useEffect, useState } from 'react';
import { Briefcase, FileText } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, blogs: 0 });
  const [user, setUser] = useState({ username: '' });

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Fetch stats
    const fetchStats = async () => {
      try {
        const [projRes, blogRes] = await Promise.all([
          fetch('/api/projects.php'),
          fetch('/api/blogs.php')
        ]);
        const projData = await projRes.json();
        const blogData = await blogRes.json();
        
        setStats({
          projects: Array.isArray(projData) ? projData.length : 0,
          blogs: Array.isArray(blogData) ? blogData.length : 0
        });
      } catch (err) {
        console.error("Failed to fetch stats");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.username}!</h1>
      <p className="text-zinc-400 mb-8">Here's what's happening in your portfolio.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Projects Stat Card */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white">
              <Briefcase size={24} />
            </div>
            <span className="text-3xl font-bold text-white">{stats.projects}</span>
          </div>
          <h3 className="text-lg font-medium text-white mb-1">Total Projects</h3>
          <p className="text-zinc-500 text-sm mb-6">Manage your portfolio showcases.</p>
          <Link href="/admin/projects" className="mt-auto text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-center transition-colors">
            Manage Projects
          </Link>
        </div>

        {/* Blogs Stat Card */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white">
              <FileText size={24} />
            </div>
            <span className="text-3xl font-bold text-white">{stats.blogs}</span>
          </div>
          <h3 className="text-lg font-medium text-white mb-1">Published Blogs</h3>
          <p className="text-zinc-500 text-sm mb-6">Write and edit your articles.</p>
          <Link href="/admin/blogs" className="mt-auto text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-center transition-colors">
            Manage Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
