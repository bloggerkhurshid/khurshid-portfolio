"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ExternalLink, Lock, X, Layers } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

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

export default function Projects({ initialProjects = [] }: { initialProjects?: Project[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  useGSAP(() => {
    if (initialProjects.length === 0) return;

    gsap.fromTo(".project-header-reveal", 
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.4, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
        }
      }
    );

    gsap.fromTo(".project-card-reveal", 
      { y: 15, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.03, 
        duration: 0.35, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".project-grid-wrapper",
          start: "top 92%",
        }
      }
    );
  }, { scope: container, dependencies: [initialProjects] });

  return (
    <section ref={container} id="projects" className="py-24 px-6 max-w-7xl mx-auto w-full relative z-10">
      
      <div className="project-header-reveal mb-12">
        <p className="text-primary font-display mb-3 text-sm font-medium tracking-wide uppercase">Work</p>
        <h2 className="font-display text-foreground mb-4 text-3xl font-bold md:text-4xl">Things I've built</h2>
        <p className="text-muted-foreground mb-12 max-w-xl">
          Most of my work is for companies and clients. Click any project card to view complete details, tech specifications, and live links.
        </p>
      </div>

      {initialProjects.length === 0 ? (
        <div className="text-muted-foreground text-sm">No projects available.</div>
      ) : (
        <div className="project-grid-wrapper grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {initialProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="project-card-reveal group relative rounded-2xl border border-border/50 bg-card/50 hover:bg-card/80 overflow-hidden transition-all duration-500 flex flex-col hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 backdrop-blur-sm cursor-pointer"
            >
              <div className="p-5 pt-4 md:p-6 md:pt-5 flex-1 flex flex-col relative z-20">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {project.image_path && (
                      <img 
                        src={project.image_path.startsWith('http') ? project.image_path : `https://kode.devkayy.in${project.image_path}`}
                        alt={`${project.title} icon`}
                        referrerPolicy="no-referrer"
                        className={`w-11 h-11 rounded-xl shadow-sm border border-border/50 shrink-0 group-hover:scale-105 transition-transform duration-300 ${
                          project.slug === 'projuktisoft' || project.image_path.includes('projuktisoft.com')
                            ? 'bg-white p-1.5 object-contain'
                            : 'object-cover'
                        }`}
                      />
                    )}
                    <h3 className="font-display text-foreground text-lg md:text-xl font-bold transition-colors group-hover:text-primary line-clamp-2">
                      {project.title}
                    </h3>
                  </div>

                  {/* Client Tag */}
                  <div className="ml-3 flex shrink-0 items-center gap-2 mt-0.5">
                    {!project.github_url && (
                      <span className="text-muted-foreground flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-muted/80 px-2 py-0.5 border border-border/50">
                        <Lock className="w-2.5 h-2.5" /> Client
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 text-xs md:text-sm leading-snug line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech_stacks.split(',').slice(0, 3).map(tag => (
                    <span key={tag} className="text-foreground/70 bg-secondary/40 border border-border/50 rounded-full px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm transition-colors group-hover:border-primary/20 group-hover:bg-primary/5">
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold">
                  <span className="text-primary group-hover:underline underline-offset-4">View Details</span>
                  {project.live_url && (
                    <span className="text-muted-foreground group-hover:text-foreground inline-flex items-center gap-1">
                      Live <ExternalLink size={12} />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Details Modal Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop with Frosted Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-card border border-border/80 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[88vh]"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-border/50 flex items-start justify-between gap-4 bg-muted/20">
                <div className="flex items-center gap-3.5">
                  {selectedProject.image_path && (
                    <img
                      src={selectedProject.image_path.startsWith('http') ? selectedProject.image_path : `https://kode.devkayy.in${selectedProject.image_path}`}
                      alt={selectedProject.title}
                      referrerPolicy="no-referrer"
                      className={`w-12 h-12 rounded-2xl shadow-sm border border-border/60 shrink-0 ${
                        selectedProject.slug === 'projuktisoft' || selectedProject.image_path.includes('projuktisoft.com')
                          ? 'bg-white p-2 object-contain'
                          : 'object-cover'
                      }`}
                    />
                  )}
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-2xl text-foreground leading-tight">
                      {selectedProject.title}
                    </h3>
                    {!selectedProject.github_url && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-muted-foreground mt-1">
                        <Lock size={10} /> Confidential Client Solution
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
                {/* Description */}
                <div>
                  <h4 className="font-display font-semibold text-sm uppercase text-muted-foreground tracking-wider mb-2">
                    About Project
                  </h4>
                  <p className="text-foreground/90 text-sm sm:text-base leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Tech Stacks */}
                <div>
                  <h4 className="font-display font-semibold text-sm uppercase text-muted-foreground tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Layers size={14} className="text-primary" /> Technologies & Architecture
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech_stacks.split(',').map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-xl text-xs font-medium bg-muted/60 border border-border/70 text-foreground"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-5 sm:p-6 border-t border-border/50 bg-muted/20 flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-sm font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>

                {selectedProject.github_url && (
                  <a
                    href={selectedProject.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground text-sm font-semibold transition-colors"
                  >
                    <FaGithub size={16} /> Source Code
                  </a>
                )}

                {selectedProject.live_url && (
                  <a
                    href={selectedProject.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Visit Live Project <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
