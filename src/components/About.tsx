"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".about-reveal",
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
  }, { scope: container });

  return (
    <section ref={container} id="about" className="py-24 px-6 max-w-7xl mx-auto w-full relative z-10">
      <div className="about-reveal mb-12">
        <p className="text-primary font-display mb-3 text-sm font-medium tracking-wide uppercase">About</p>
        <h2 className="font-display text-foreground text-3xl font-bold md:text-4xl">A bit about me</h2>
      </div>

      <div className="about-reveal space-y-6 w-full">
        <p className="text-muted-foreground leading-relaxed">
          I've been building robust web applications and digital solutions. In that time, I've worked on complex systems, immersive user interfaces, and tools where the frontend needs to handle real complexity — deep forms, high performance, and scalable architectures.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          My approach is straightforward: understand the problem, design the architecture, then write code that's maintainable and doesn't fall apart when requirements change. I care about component reusability, consistent design systems, and making sure the people using the software can actually get their work done efficiently.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Most of my work has been in React, Next.js, and TypeScript. I've built extensively with modern design systems and prefer working in environments where the frontend is taken seriously — not just an afterthought.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Beyond client work, I am the founder of <strong className="text-foreground font-semibold">DailyAxom</strong>, a platform I started building in 2026. It reflects my passion for creating scalable products from the ground up, handling everything from the initial architecture to the final user experience.
        </p>

        <div className="pt-8 mt-8 border-t border-border">
          <h3 className="font-display text-foreground text-lg font-bold mb-6">Core Technologies</h3>
          <div className="flex flex-wrap gap-3">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'React Native', 'Framer Motion', 'PostgreSQL', 'MySQL', 'PHP', 'GSAP'].map(tech => (
              <span key={tech} className="px-5 py-2.5 bg-muted/20 text-xs font-medium tracking-wide text-muted-foreground rounded-full border border-border hover:border-primary/50 hover:text-foreground transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
