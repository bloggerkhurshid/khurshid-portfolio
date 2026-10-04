"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { ArrowRight, Sparkles, Smartphone, Code2, Layers, CheckCircle2, Terminal } from 'lucide-react';
import { FaAndroid, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiKotlin } from 'react-icons/si';

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const avatarWrapper = useRef<HTMLDivElement>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'stack' | 'status'>('stack');

  useGSAP(() => {
    // Staggered reveal
    gsap.fromTo(".hero-reveal", 
      { y: 24, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.08, 
        duration: 0.9, 
        ease: "power3.out",
        delay: 0.1
      }
    );

    // Floating animation for interactive avatar badges
    gsap.to(".floating-badge-1", {
      y: -8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".floating-badge-2", {
      y: 10,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });

    gsap.to(".floating-badge-3", {
      y: -6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });

    // Subtle breathing pulse for the avatar
    gsap.to(avatarWrapper.current, {
      y: -6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: container });

  // Mouse tilt / parallax effect on the avatar
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarWrapper.current) return;
    const rect = avatarWrapper.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(avatarWrapper.current, {
      rotateY: x * 0.03,
      rotateX: -y * 0.03,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!avatarWrapper.current) return;
    gsap.to(avatarWrapper.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  return (
    <section 
      ref={container} 
      id="home" 
      className="relative flex min-h-svh items-center pt-32 pb-20 sm:pt-28 sm:pb-16 px-6 w-full max-w-7xl mx-auto z-10"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Text & Content */}
        <div className="w-full lg:col-span-7 flex flex-col justify-center">
          
          {/* Status Badge */}
          <div className="hero-reveal flex items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/80 backdrop-blur-md text-xs font-medium text-foreground/90 shadow-sm transition-all hover:border-primary/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for New Projects</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground flex items-center gap-1 font-mono text-[11px]">
                <Sparkles size={11} className="text-amber-500" /> Full-Stack & Mobile
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="hero-reveal font-display text-foreground mb-6 text-5xl leading-[1.08] font-extrabold sm:text-6xl lg:text-[4.2rem] tracking-tight">
            I'm Khurshid Alom. <br />
            <span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground/80 bg-clip-text text-transparent">
              Full-Stack & Android
            </span>
            <br />
            <span className="text-primary font-bold">Developer.</span>
          </h1>
          
          {/* Subtitle */}
          <p className="hero-reveal text-muted-foreground mb-8 max-w-xl text-base sm:text-lg leading-relaxed font-normal">
            Specializing in <span className="text-foreground font-medium">Native Android development (Kotlin)</span> and robust <span className="text-foreground font-medium">Full-Stack web architectures</span> (React, Next.js, Node.js). Building polished user experiences and scalable digital platforms from concept to deployment.
          </p>

          {/* Quick Skill Tags Pill Row */}
          <div className="hero-reveal flex flex-wrap items-center gap-2 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card/80 border border-border/70 text-xs font-medium text-foreground/80 backdrop-blur-sm shadow-xs">
              <FaAndroid className="text-emerald-500 text-sm" /> Kotlin & Android SDK
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card/80 border border-border/70 text-xs font-medium text-foreground/80 backdrop-blur-sm shadow-xs">
              <SiNextdotjs className="text-foreground text-sm" /> Next.js & React
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card/80 border border-border/70 text-xs font-medium text-foreground/80 backdrop-blur-sm shadow-xs">
              <SiTypescript className="text-blue-500 text-xs" /> TypeScript
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card/80 border border-border/70 text-xs font-medium text-foreground/80 backdrop-blur-sm shadow-xs">
              <FaNodeJs className="text-green-600 text-sm" /> Node.js & APIs
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="hero-reveal flex flex-wrap items-center gap-4">
            <a 
              href="#projects" 
              className="group relative inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
            >
              Explore Projects
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 rounded-full bg-secondary/80 hover:bg-secondary text-foreground border border-border px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
            >
              Get in Touch
            </a>
          </div>
          
        </div>

        {/* Right Column: Interactive 3D Avatar Stage */}
        <div className="hero-reveal w-full lg:col-span-5 flex justify-center items-center relative py-6">
          
          {/* Avatar Stage Container with Tilt Event */}
          <div 
            ref={avatarWrapper}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[430px] flex items-center justify-center cursor-default"
          >
            {/* Ambient Radial Spotlight Behind Avatar */}
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-amber-500/15 via-primary/10 to-blue-500/15 blur-2xl transform scale-90 pointer-events-none" />

            {/* Floating Micro-Badge 1: Android & Kotlin (Top Right) */}
            <div className="floating-badge-1 absolute -top-4 right-0 sm:-right-4 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-card/90 border border-border/80 shadow-xl backdrop-blur-md text-xs font-semibold text-foreground pointer-events-none">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <FaAndroid size={16} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-foreground leading-tight">Native Android</p>
                <p className="text-[10px] text-muted-foreground font-mono">Kotlin • Jetpack</p>
              </div>
            </div>

            {/* Floating Micro-Badge 2: Full-Stack Web (Middle Left) */}
            <div className="floating-badge-2 absolute top-1/3 -left-4 sm:-left-8 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-card/90 border border-border/80 shadow-xl backdrop-blur-md text-xs font-semibold text-foreground pointer-events-none">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                <Code2 size={15} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-foreground leading-tight">Full-Stack MERN</p>
                <p className="text-[10px] text-muted-foreground font-mono">Next.js • Node.js</p>
              </div>
            </div>

            {/* Floating Micro-Badge 3: Verified Play Store Downloads (Bottom Right) */}
            <div className="floating-badge-3 absolute bottom-6 right-0 sm:-right-6 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-card/90 border border-border/80 shadow-xl backdrop-blur-md text-xs font-semibold text-foreground pointer-events-none">
              <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <CheckCircle2 size={15} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-foreground leading-tight">10K+ Installs</p>
                <p className="text-[10px] text-muted-foreground font-mono">Google Play Store</p>
              </div>
            </div>

            {/* Avatar Image Element with Bottom Gradient Fade */}
            <div className="relative w-full aspect-[853/1024] select-none pointer-events-none transition-transform duration-300 overflow-hidden">
              <Image
                src="/hero-avatar.png"
                alt="Khurshid Alom - Avatar"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                className="object-contain object-bottom"
              />
              {/* Bottom gradient fade overlay for smooth blend into background */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
