"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

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
    <section ref={container} id="home" className="relative flex min-h-svh items-center pt-24 pb-16 sm:pt-20 sm:pb-0 px-6 w-full max-w-7xl mx-auto z-10 overflow-hidden">
      
      {/* Background Image Overlay */}
      <div className="hero-reveal absolute inset-0 z-0 pointer-events-none mix-blend-luminosity opacity-80 dark:opacity-80">
        <div className="absolute inset-0 lg:-right-32">
          <Image
            src="/khurshid-hero.png"
            alt="Khurshid Alom Background"
            fill
            priority
            className="object-cover lg:object-contain object-right"
          />
        </div>
        {/* Gradient masks for smooth fading into background */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Text Content */}
        <div className="w-full max-w-2xl flex flex-col justify-center">
          
          <div className="hero-reveal flex items-center gap-3 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider backdrop-blur-sm px-2 py-1 rounded-md bg-background/50">Available for work</span>
          </div>

          <h1 className="hero-reveal font-display text-foreground mb-6 text-5xl leading-[1.1] font-bold md:text-6xl lg:text-7xl tracking-tight">
            I'm Khurshid Alom. <br className="hidden sm:block" />
            <span className="text-muted-foreground">A full-stack developer.</span>
          </h1>
          
          <p className="hero-reveal text-muted-foreground mb-10 max-w-xl text-lg leading-relaxed md:text-xl font-normal drop-shadow-sm">
            I build clean, scalable, and high-performance digital experiences. Specializing in React, Next.js, and custom web architectures.
          </p>
          
          <div className="hero-reveal flex flex-wrap items-center gap-4">
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-8 py-4 text-sm font-medium transition-transform hover:-translate-y-0.5 shadow-lg">
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-md border border-border px-8 py-4 text-sm font-medium text-foreground hover:bg-muted transition-colors shadow-sm">
              Contact Me
            </a>
          </div>

          <div className="hero-reveal mt-16 flex items-center gap-8 text-sm">
            <div>
              <p className="font-bold text-foreground text-2xl">3+</p>
              <p className="text-muted-foreground mt-1 font-medium">Years Exp.</p>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div>
              <p className="font-bold text-foreground text-2xl">15+</p>
              <p className="text-muted-foreground mt-1 font-medium">Projects</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
