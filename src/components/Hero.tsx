"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Image from 'next/image';
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
      <div className="w-full grid items-center gap-12 lg:grid-cols-5">
        
        <div className="w-full lg:col-span-3">
          
          <h1 className="hero-reveal font-display text-foreground mt-8 lg:mt-0 mb-0 lg:mb-6 text-4xl leading-[1.15] font-bold md:text-5xl lg:text-6xl xl:text-7xl">
            Crafting bespoke<br/>
            <span className="text-primary">CMS &amp; LMS</span><br/>
            experiences.
          </h1>

          {/* Mobile Image (Visible only below lg breakpoint) */}
          <div className="hero-reveal block lg:hidden w-full max-w-[280px] sm:max-w-sm mt-8 mb-10 mr-auto pt-6">
            <div className="group relative w-full pt-6">
              {/* The Orange Box (1:1 Aspect Ratio) */}
              <div className="relative w-full aspect-square rounded-3xl border border-border bg-primary shadow-xl transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-[0_0_0_1px_rgba(249,115,22,0.15),0_8px_24px_rgba(249,115,22,0.15)]">
                {/* The Pop-out Image */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[115%] h-[120%] pointer-events-none">
                  <Image
                    src="/khurshid-hero.png"
                    alt="Khurshid Alom"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain object-bottom drop-shadow-2xl transition-transform duration-500 ease-out origin-bottom group-hover:scale-105 pointer-events-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          
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

        {/* Desktop Image (Visible only on lg and above) */}
        <div className="hero-reveal hidden lg:block lg:col-span-2">
          <div className="group relative w-full pt-12">
            {/* The Orange Box (1:1 Aspect Ratio) */}
            <div className="relative w-full aspect-square rounded-3xl border border-border bg-primary shadow-xl transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-[0_0_0_1px_rgba(249,115,22,0.15),0_8px_24px_rgba(249,115,22,0.15)]">
              {/* The Pop-out Image */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[125%] pointer-events-none z-10">
                <Image
                  src="/khurshid-hero.png"
                  alt="Khurshid Alom"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain object-bottom drop-shadow-2xl transition-transform duration-500 ease-out origin-bottom group-hover:scale-[1.03] pointer-events-auto"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
