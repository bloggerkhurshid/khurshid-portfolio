"use client";

import React, { useRef } from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './Icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".contact-reveal", 
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
    <section ref={container} id="contact" className="py-16 px-6 max-w-7xl mx-auto w-full relative z-10 border-t border-border mt-12">
      
      <div className="contact-reveal text-center">
        <p className="text-primary font-display mb-2 text-sm font-medium tracking-wide uppercase">Contact</p>
        <h2 className="font-display text-foreground text-3xl font-bold md:text-5xl mb-4">Let's build together</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed text-sm md:text-base">
          Feel free to reach out for collaborations, opportunities, or just a quick hello. I am currently available for work and always excited to connect with new people.
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <a href="mailto:khurshid.sde@gmail.com" className="flex items-center gap-3 bg-card border border-border hover:border-primary/50 text-foreground transition-all duration-300 px-5 py-3 md:px-6 md:py-4 rounded-xl shadow-sm hover:shadow-[0_8px_24px_rgba(249,115,22,0.1)] hover:-translate-y-1" aria-label="Email">
            <Mail size={20} className="text-primary" />
            <span className="font-semibold text-sm">Email Me</span>
          </a>
          <a href="#" className="flex items-center gap-3 bg-card border border-border hover:border-primary/50 text-foreground transition-all duration-300 px-5 py-3 md:px-6 md:py-4 rounded-xl shadow-sm hover:shadow-[0_8px_24px_rgba(249,115,22,0.1)] hover:-translate-y-1" aria-label="GitHub">
            <Github size={20} className="text-primary" />
            <span className="font-semibold text-sm">GitHub</span>
          </a>
          <a href="#" className="flex items-center gap-3 bg-card border border-border hover:border-primary/50 text-foreground transition-all duration-300 px-5 py-3 md:px-6 md:py-4 rounded-xl shadow-sm hover:shadow-[0_8px_24px_rgba(249,115,22,0.1)] hover:-translate-y-1" aria-label="LinkedIn">
            <Linkedin size={20} className="text-primary" />
            <span className="font-semibold text-sm">LinkedIn</span>
          </a>
        </div>
      </div>
      
    </section>
  );
}
