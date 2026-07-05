"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ExternalLink, Lock } from 'lucide-react';
import Link from 'next/link';

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

  useGSAP(() => {
    if (initialProjects.length === 0) return;

    gsap.fromTo(".project-reveal", 
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: container, dependencies: [initialProjects] });

  return (
    <section ref={container} id="projects" className="py-24 px-6 max-w-7xl mx-auto w-full relative z-10">
      
      <div className="project-reveal mb-12">
        <p className="text-primary font-display mb-3 text-sm font-medium tracking-wide uppercase">Work</p>
        <h2 className="font-display text-foreground mb-4 text-3xl font-bold md:text-4xl">Things I've built</h2>
        <p className="text-muted-foreground mb-12 max-w-xl">
          Most of my work is for companies and clients. For the projects I'm allowed to share, I've put together detailed case studies with feature breakdowns.
        </p>
      </div>

      {initialProjects.length === 0 ? (
        <div className="text-muted-foreground text-sm">No projects available.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {initialProjects.map((project) => (
            <div key={project.id} className="project-reveal group bg-card border-border hover:border-primary/30 relative rounded-xl border overflow-hidden transition-colors duration-300 flex flex-col">
              <Link href={`/projects/${project.slug}`} className="block relative w-full aspect-video overflow-hidden bg-muted/20 border-b border-border">
                <img 
                  src={project.image_path ? `https://kode.devkayy.in${project.image_path}` : '/project-three.jpg'} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="mb-4 flex items-start justify-between">
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="font-display text-foreground group-hover:text-primary text-xl font-semibold transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  {/* Optional tag */}
                  <div className="ml-4 flex shrink-0 items-center gap-2">
                    {!project.github_url && (
                      <span className="text-muted-foreground flex items-center gap-1 text-xs">
                        <Lock className="w-3 h-3" /> Client
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 text-sm leading-relaxed line-clamp-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech_stacks.split(',').slice(0, 5).map(tag => (
                    <span key={tag} className="text-primary/80 bg-primary/10 rounded-md px-2.5 py-1 text-xs font-medium">
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                {project.live_url && (
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="text-foreground hover:text-primary inline-flex items-center gap-1 text-sm font-medium transition-colors">
                      <ExternalLink size={16} /> Live Project
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
