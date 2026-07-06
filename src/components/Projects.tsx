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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {initialProjects.map((project) => (
            <div key={project.id} className="project-reveal group relative rounded-2xl border border-border/50 bg-card/50 hover:bg-card/80 overflow-hidden transition-all duration-500 flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 backdrop-blur-sm">
              <Link href={`/projects/${project.slug}`} className="block relative w-full aspect-[21/9] overflow-hidden bg-muted/20">
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 group-hover:from-card/90 via-transparent to-transparent z-10 transition-colors duration-500" />
                <img 
                  src={project.image_path ? `https://kode.devkayy.in${project.image_path}` : '/project-three.jpg'} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              
              <div className="p-5 pt-3 md:p-6 md:pt-4 flex-1 flex flex-col relative z-20">
                <div className="mb-2 flex items-start justify-between">
                  <Link href={`/projects/${project.slug}`} className="group/link flex items-center gap-2">
                    <h3 className="font-display text-foreground text-lg md:text-xl font-bold transition-colors group-hover:text-primary line-clamp-1">
                      {project.title}
                    </h3>
                  </Link>
                  {/* Optional tag */}
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

                {project.live_url && (
                  <div className="mt-auto">
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="text-foreground hover:text-primary inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold transition-colors group/btn">
                      View Live Project 
                      <ExternalLink size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
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
