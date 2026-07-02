"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Blog {
  id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  image_path: string;
  created_at: string;
}

export default function BlogSection({ initialBlogs = [] }: { initialBlogs?: Blog[] }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (initialBlogs.length === 0) return;

    gsap.fromTo(".blog-reveal", 
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
  }, { scope: container, dependencies: [initialBlogs] });

  return (
    <section ref={container} id="home-blog" className="py-24 px-6 max-w-7xl mx-auto w-full relative z-10">
      
      <div className="blog-reveal mb-12 flex items-end justify-between">
        <div>
          <p className="text-primary font-display mb-3 text-sm font-medium tracking-wide uppercase">Writing</p>
          <h2 className="font-display text-foreground text-3xl font-bold md:text-4xl">Latest Articles</h2>
        </div>
        <Link href="/blogs" className="hidden md:flex text-muted-foreground hover:text-foreground items-center gap-2 text-sm font-medium transition-colors">
          View all <ArrowRight size={16} />
        </Link>
      </div>

      {initialBlogs.length === 0 ? (
        <div className="text-muted-foreground text-sm">No articles published yet.</div>
      ) : (
        <div className="flex flex-col border-t border-border">
          {initialBlogs.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="blog-reveal group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-8 border-b border-border hover:bg-muted/20 transition-colors -mx-4 px-4 sm:mx-0 sm:px-4 rounded-xl"
            >
              <div className="w-full md:w-40 shrink-0 text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">
                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                  {post.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm line-clamp-2">
                  {post.content
                    .replace(/<[^>]*>?/gm, '')
                    .replace(/&nbsp;/g, ' ')
                    .replace(/&#39;/g, "'")
                    .replace(/&amp;/g, '&')
                    .replace(/&quot;/g, '"')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="blog-reveal mt-8 md:hidden">
        <Link href="/blogs" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors">
          View all <ArrowRight size={16} />
        </Link>
      </div>

    </section>
  );
}
