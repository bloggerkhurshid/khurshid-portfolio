"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaReact, FaNodeJs, FaPhp, FaHtml5, FaCss3Alt, FaJava, FaBootstrap, FaGitAlt, FaGithub, FaDocker, FaAws, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiPostgresql, SiMysql, SiGreensock, SiRedux, SiMongodb, SiExpress, SiFirebase, SiNetlify, SiVercel, SiPrisma, SiAndroidstudio, SiPostman, SiGraphql } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".about-reveal",
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".tech-pill",
      { scale: 0.9, opacity: 0, y: 15 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        stagger: 0.02,
        duration: 0.5,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".tech-grid-wrapper",
          start: "top 85%",
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
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          I am a <strong className="text-foreground font-semibold">Full-Stack Engineer (MERN & Next.js)</strong> and <strong className="text-foreground font-semibold">Android Developer (3+ years)</strong> holding an <span className="text-foreground font-medium">MCA from Chandigarh University</span> and a <span className="text-foreground font-medium">BCA from Gauhati University</span>. I specialize in architecting fast, scalable web systems and modern mobile applications with refined UI/UX.
        </p>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          I am also the founder of <a href="https://dailyaxom.in" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-primary transition-colors underline underline-offset-4 decoration-primary/50 hover:decoration-primary">DailyAxom</a>, an EdTech platform & mobile app serving thousands of students across Assam. Whether building custom enterprise platforms, LMS/CMS portals, or native Android apps, my focus is delivering <strong className="text-foreground font-semibold">clean architecture, high performance, and reliable software</strong> that scales.
        </p>

        <div className="pt-10 mt-10 border-t border-border/60 tech-grid-wrapper">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-primary font-mono text-xs uppercase tracking-wider font-semibold mb-1">Stack & Capabilities</p>
              <h3 className="font-display text-foreground text-2xl font-bold tracking-tight">Core Technologies</h3>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-sm">
              Tools, languages, and frameworks I use regularly to build high-scale products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                category: "Frontend Architecture",
                tag: "Web & UI",
                accent: "from-blue-500/15 via-indigo-500/5 to-transparent",
                borderAccent: "group-hover:border-blue-500/40",
                badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
                items: [
                  { name: 'React', icon: FaReact, color: 'text-cyan-400' },
                  { name: 'Next.js', icon: SiNextdotjs, color: 'text-foreground' },
                  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
                  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-teal-400' },
                  { name: 'Redux', icon: SiRedux, color: 'text-purple-400' },
                  { name: 'Framer Motion', icon: SiFramer, color: 'text-pink-400' },
                  { name: 'GSAP', icon: SiGreensock, color: 'text-emerald-400' },
                  { name: 'HTML5 / CSS3', icon: FaHtml5, color: 'text-orange-500' },
                  { name: 'Bootstrap', icon: FaBootstrap, color: 'text-indigo-400' },
                ]
              },
              {
                category: "Backend & Database",
                tag: "APIs & Data",
                accent: "from-emerald-500/15 via-teal-500/5 to-transparent",
                borderAccent: "group-hover:border-emerald-500/40",
                badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
                items: [
                  { name: 'Node.js', icon: FaNodeJs, color: 'text-green-500' },
                  { name: 'Express.js', icon: SiExpress, color: 'text-foreground' },
                  { name: 'MongoDB', icon: SiMongodb, color: 'text-emerald-500' },
                  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-sky-400' },
                  { name: 'MySQL', icon: SiMysql, color: 'text-blue-400' },
                  { name: 'Prisma', icon: SiPrisma, color: 'text-teal-400' },
                  { name: 'GraphQL', icon: SiGraphql, color: 'text-pink-500' },
                  { name: 'Firebase', icon: SiFirebase, color: 'text-amber-400' },
                  { name: 'PHP', icon: FaPhp, color: 'text-indigo-400' },
                ]
              },
              {
                category: "Mobile App Development",
                tag: "Native & Cross-Platform",
                accent: "from-violet-500/15 via-purple-500/5 to-transparent",
                borderAccent: "group-hover:border-violet-500/40",
                badgeColor: "text-violet-500 bg-violet-500/10 border-violet-500/20",
                items: [
                  { name: 'Java', icon: FaJava, color: 'text-red-500' },
                  { name: 'Android Studio', icon: SiAndroidstudio, color: 'text-emerald-500' },
                  { name: 'React Native', icon: FaReact, color: 'text-cyan-400' },
                ]
              },
              {
                category: "Cloud, DevOps & Tools",
                tag: "Infra & Design",
                accent: "from-amber-500/15 via-orange-500/5 to-transparent",
                borderAccent: "group-hover:border-amber-500/40",
                badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
                items: [
                  { name: 'Git & GitHub', icon: FaGithub, color: 'text-foreground' },
                  { name: 'Docker', icon: FaDocker, color: 'text-sky-400' },
                  { name: 'AWS', icon: FaAws, color: 'text-amber-500' },
                  { name: 'Vercel', icon: SiVercel, color: 'text-foreground' },
                  { name: 'Netlify', icon: SiNetlify, color: 'text-teal-400' },
                  { name: 'Postman', icon: SiPostman, color: 'text-orange-500' },
                  { name: 'Figma', icon: FaFigma, color: 'text-purple-400' },
                ]
              }
            ].map((techGroup) => (
              <div 
                key={techGroup.category} 
                className={`group relative rounded-2xl border border-border/60 bg-gradient-to-b ${techGroup.accent} bg-card/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 ${techGroup.borderAccent}`}
              >
                <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-border/40">
                  <h4 className="font-display font-semibold text-foreground text-base tracking-tight">
                    {techGroup.category}
                  </h4>
                  <span className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${techGroup.badgeColor}`}>
                    {techGroup.tag}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {techGroup.items.map((tech) => (
                    <div 
                      key={tech.name} 
                      className="tech-pill group/tech flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background/60 hover:bg-background border border-border/60 hover:border-primary/40 text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-200 cursor-default shadow-xs"
                    >
                      <tech.icon className={`text-sm shrink-0 transition-transform duration-200 group-hover/tech:scale-115 ${tech.color}`} />
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
