"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { ArrowRight, Sparkles, Smartphone, Code2, Layers, CheckCircle2 } from 'lucide-react';
import { FaAndroid, FaReact, FaNodeJs, FaJava } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

const roles = [
  "Full-Stack Development",
  "Digital Marketing",
  "Android App Development",
  "Search Engine Optimization"
];

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const avatarWrapper = useRef<HTMLDivElement>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'stack' | 'status'>('stack');
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentRole) {
      // Pause at end of word before reversing
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && displayText === '') {
      // Pause before typing next word
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      timeout = setTimeout(() => {}, 300);
    } else {
      // Typing or deleting speed
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentRole.substring(0, prev.length - 1)
            : currentRole.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

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
          


          {/* Main Title with Refined Hierarchy & High-End Typography */}
          <div className="hero-reveal mb-6 space-y-2">
            <h1 className="font-display font-extrabold text-foreground text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
              Hi, I'm <span className="text-foreground">Khurshid Alom</span>
            </h1>
            <div className="h-12 sm:h-14 lg:h-16 flex items-center">
              <span className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight bg-gradient-to-r from-primary via-indigo-400 to-primary/80 bg-clip-text text-transparent drop-shadow-sm select-none">
                {displayText}
              </span>
              <span className="inline-block w-[3px] sm:w-[4px] h-7 sm:h-9 lg:h-11 bg-primary ml-1.5 rounded-full animate-pulse shadow-sm shadow-primary/60" />
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="hero-reveal text-muted-foreground mb-8 max-w-xl text-base sm:text-lg leading-relaxed font-normal">
            Specializing in <span className="text-foreground font-semibold">Native Android development (Java)</span> and modern <span className="text-foreground font-semibold">Full-Stack web architectures</span> (React, Next.js, Node.js). Building polished user experiences and scalable digital platforms from concept to deployment.
          </p>

          {/* Quick Skill Tags Pill Row */}
          <div className="hero-reveal flex flex-wrap items-center gap-2 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card/80 border border-border/70 text-xs font-semibold text-foreground/90 backdrop-blur-sm shadow-xs">
              <FaAndroid className="text-emerald-500 text-sm" /> Java & Android SDK
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card/80 border border-border/70 text-xs font-semibold text-foreground/90 backdrop-blur-sm shadow-xs">
              <SiNextdotjs className="text-foreground text-sm" /> Next.js & React
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card/80 border border-border/70 text-xs font-semibold text-foreground/90 backdrop-blur-sm shadow-xs">
              <SiTypescript className="text-blue-500 text-xs" /> TypeScript
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card/80 border border-border/70 text-xs font-semibold text-foreground/90 backdrop-blur-sm shadow-xs">
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

            {/* Floating Micro-Badge 1: Android & Java (Top Right) */}
            <div className="floating-badge-1 absolute -top-4 right-0 sm:-right-4 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-card/90 border border-border/80 shadow-xl backdrop-blur-md text-xs font-semibold text-foreground pointer-events-none">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <FaAndroid size={16} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-foreground leading-tight">Native Android</p>
                <p className="text-[10px] text-muted-foreground font-mono">Java • Android SDK</p>
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
