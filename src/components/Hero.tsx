"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".hero-reveal", 
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: "power2.out",
        delay: 0.1
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="home" className="flex min-h-svh items-center pt-20 pb-10 sm:pt-16 sm:pb-0 px-6 max-w-7xl mx-auto w-full relative z-10">
      <div className="w-full max-w-3xl">
        
        <div className="hero-reveal group relative mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md transition-all hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-default">
          <div className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </div>
          <span className="text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase">Available for work</span>
        </div>
        
        <h1 className="hero-reveal font-display text-foreground mb-6 text-4xl leading-[1.15] font-bold md:text-5xl lg:text-6xl xl:text-7xl">
          Crafting bespoke<br/>
          <span className="text-primary">CMS &amp; LMS</span><br/>
          experiences.
        </h1>
        
        <p className="hero-reveal text-muted-foreground mb-10 max-w-xl text-lg leading-relaxed md:text-xl">
          I'm Khurshid Alom, a frontend-focused full-stack developer. I leverage React.js and Next.js to architect high-performance, scalable platforms tailored to your exact business needs.
        </p>
        
        <div className="hero-reveal flex flex-wrap items-center gap-4 sm:gap-6">
          <a href="#projects" className="bg-primary text-primary-foreground font-display inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90 shadow-lg shadow-primary/20">
            View my work →
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground border-border/50 hover:border-border rounded-lg border px-5 py-3 text-sm font-medium transition-colors bg-background/50">
            Get in touch
          </a>
        </div>
        
        <div className="hero-reveal mt-14 flex items-center gap-8 sm:gap-10">
          <div>
            <p className="font-display text-foreground text-2xl font-bold">2+</p>
            <p className="text-muted-foreground mt-1 text-xs uppercase tracking-wider font-semibold">Years Exp.</p>
          </div>
          <div className="border-border/40 border-l pl-8 sm:pl-10">
            <p className="font-display text-foreground text-2xl font-bold">15+</p>
            <p className="text-muted-foreground mt-1 text-xs uppercase tracking-wider font-semibold">Projects</p>
          </div>
          <div className="border-border/40 border-l pl-8 sm:pl-10">
            <p className="font-display text-foreground text-2xl font-bold">React</p>
            <p className="text-muted-foreground mt-1 text-xs uppercase tracking-wider font-semibold">Core Focus</p>
          </div>
        </div>
        
        <div className="hero-reveal mt-16 sm:mt-24">
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors inline-block animate-bounce">
            <ArrowDown size={20} />
          </a>
        </div>
        
      </div>
    </section>
  );
}
