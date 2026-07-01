"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { GithubIcon as Github } from '@/components/Icons';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  tech_stacks: string;
  live_url: string;
  github_url: string;
  slug: string;
  image_path: string;
}

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://kode.devkayy.in/api/projects.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-background pt-24 pb-32 px-6 selection:bg-foreground selection:text-background">
      <div className="mx-auto max-w-6xl">
        
        {/* Header & Back Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-muted font-medium hover:text-foreground transition-colors mb-12">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Archive</h1>
          <p className="text-xl text-muted leading-relaxed font-medium max-w-2xl">
            A comprehensive list of things I've built, ranging from full-scale production applications to weekend experiments.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-muted py-20">Loading archive...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted py-20">No projects found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col gap-6"
              >
                {/* Thumbnail */}
                <Link href={`/projects/${project.slug}`} className="block relative aspect-video bg-muted/20 rounded-none overflow-hidden border border-border group-hover:-translate-y-2 transition-transform duration-300">
                  <Image 
                    src={project.image_path ? `https://kode.devkayy.in${project.image_path}` : '/project-three.jpg'} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                {/* Content */}
                <div>
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{project.title}</h3>
                  </Link>
                  <p className="text-muted leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech_stacks.split(',').map(tag => (
                      <span key={tag} className="px-3 py-1 bg-muted/20 text-sm font-medium text-foreground rounded-full">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold border border-border px-4 py-2 rounded-full hover:bg-foreground hover:text-background transition-colors">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold border border-border px-4 py-2 rounded-full hover:bg-foreground hover:text-background transition-colors">
                        <Github size={16} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
