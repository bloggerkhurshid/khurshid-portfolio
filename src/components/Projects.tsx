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
    <section id="projects" className="py-32 px-6 bg-[#050505]">
      <div className="mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16"
        >
          <div className="w-full">
            <h2 className="text-[10vw] md:text-[8vw] lg:text-[80px] font-bold tracking-tighter text-white leading-none uppercase mb-6">
              Selected Work
            </h2>
            <div className="w-full h-[1px] bg-white/10" />
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center text-white/50 py-20 uppercase tracking-widest text-xs">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-white/50 py-20 uppercase tracking-widest text-xs">No projects found. Add some from the admin panel!</div>
        ) : (
          <div className="flex flex-col gap-12 lg:gap-24">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center group`}
              >
                {/* Thumbnail */}
                <Link href={`/projects/${project.slug}`} className="w-full lg:w-3/5 relative aspect-[16/10] bg-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
                  <Image 
                    src={project.image_path ? `https://kode.devkayy.in${project.image_path}` : '/project-three.jpg'} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-80" 
                  />
                </Link>
                
                {/* Content */}
                <div className="w-full lg:w-2/5 flex flex-col">
                  <div className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4">0{i + 1} &mdash; Project</div>
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6 uppercase leading-[1.1]">{project.title}</h3>
                  </Link>
                  <p className="text-zinc-400 font-light leading-relaxed mb-8 text-lg">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech_stacks.split(',').map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-white/70">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-auto">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-white hover:text-zinc-400 transition-colors group/link">
                        <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" /> Live Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-white hover:text-zinc-400 transition-colors group/link">
                        <Github size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="mt-24 text-center">
             <Link href="/projects" className="inline-block relative px-8 py-4 bg-transparent text-white border border-white/20 font-bold text-xs tracking-[0.2em] uppercase overflow-hidden hover:bg-white hover:text-black transition-colors duration-500">
               View All Projects
             </Link>
          </div>
        )}
      </div>
    </section>
  );
}
