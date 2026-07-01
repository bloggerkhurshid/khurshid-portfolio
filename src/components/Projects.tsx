"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon as Github } from './Icons';
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://kode.devkayy.in/api/projects.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Show only top 3 on the home page
          setProjects(data.slice(0, 3));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Projects</h2>
          <Link href="/projects" className="flex items-center gap-2 text-foreground font-medium hover:underline underline-offset-4 w-fit">
            View all projects <ArrowRight size={20} />
          </Link>
        </motion.div>

        {loading ? (
          <div className="text-center text-muted py-20">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted py-20">No projects found. Add some from the admin panel!</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col gap-6 border-b border-border/30 pb-10 mb-2 md:border-b-0 md:pb-0 md:mb-0 last:border-b-0 last:pb-0 last:mb-0"
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
                    <h3 className="text-3xl font-bold tracking-tight mb-4">{project.title}</h3>
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
    </section>
  );
}
