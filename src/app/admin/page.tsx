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
    <div className="p-8 relative z-10 max-w-7xl mx-auto w-full">
      <h1 className="text-3xl font-display font-bold text-foreground mb-2">Welcome back, {user.username}!</h1>
      <p className="text-muted-foreground mb-8">Here's what's happening in your portfolio.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Projects Stat Card */}
        <div className="bg-primary/5 border border-border backdrop-blur-sm rounded-2xl p-6 flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-[0_8px_30px_rgba(249,115,22,0.12)]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Briefcase size={24} />
            </div>
            <span className="text-4xl font-display font-bold text-foreground">{stats.projects}</span>
          </div>
          <h3 className="text-lg font-display font-bold text-foreground mb-1">Total Projects</h3>
          <p className="text-muted-foreground text-sm mb-8">Manage your portfolio showcases.</p>
          <Link href="/admin/projects" className="mt-auto text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 px-5 py-3 rounded-xl text-center transition-all shadow-md shadow-primary/20">
            Manage Projects
          </Link>
        </div>

        {/* Blogs Stat Card */}
        <div className="bg-primary/5 border border-border backdrop-blur-sm rounded-2xl p-6 flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-[0_8px_30px_rgba(249,115,22,0.12)]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <FileText size={24} />
            </div>
            <span className="text-4xl font-display font-bold text-foreground">{stats.blogs}</span>
          </div>
          <h3 className="text-lg font-display font-bold text-foreground mb-1">Published Blogs</h3>
          <p className="text-muted-foreground text-sm mb-8">Write and edit your articles.</p>
          <Link href="/admin/blogs" className="mt-auto text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 px-5 py-3 rounded-xl text-center transition-all shadow-md shadow-primary/20">
            Manage Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
