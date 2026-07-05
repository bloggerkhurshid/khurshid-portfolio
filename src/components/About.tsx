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
          I am a passionate software engineer with a strong academic foundation, holding a Master of Computer Applications (MCA) from Chandigarh University and a Bachelor of Computer Applications (BCA) from Gauhati University. My core expertise lies in Full-Stack MERN Development, where I architect and build robust, high-performance applications from the ground up. For me, development isn't just about writing code; it's about turning complex business requirements into clean, scalable architectures and engaging digital experiences.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          In addition to web development, I have over 3 years of experience in Android application development. This dual expertise allows me to create seamless, cross-platform ecosystems where web and mobile applications work perfectly in tandem. My approach to engineering is highly practical: I focus on writing maintainable code, optimizing performance, and implementing beautiful, intuitive UI/UX designs using modern tools and frameworks.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Beyond client work, I am the founder and lead developer of <a href="https://dailyaxom.in" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-primary transition-colors underline underline-offset-4 decoration-primary/50 hover:decoration-primary">DailyAxom</a>, a comprehensive educational platform that I built entirely from scratch. Available as both a Web and Android app, DailyAxom serves as a vital resource for students. It provides accessible, high-quality study materials, including detailed board notes for CBSE, SEBA, and AHSEC, alongside dedicated preparation resources for competitive exams such as Assam Police, CTET, SSC, and Nursing.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Whether I am building a custom CMS tailored to a specific workflow, architecting a complex learning management system, or refining a mobile application's user interface, my goal is always the same: to deliver reliable, high-quality software that truly empowers its users and scales effortlessly as needs grow.
        </p>

        <div className="pt-8 mt-8 border-t border-border">
          <h3 className="font-display text-foreground text-xl font-bold mb-8">Core Technologies</h3>
          <div className="flex flex-col gap-8">
            {[
              {
                category: "Frontend",
                items: [
                  { name: 'HTML5', icon: FaHtml5 },
                  { name: 'CSS3', icon: FaCss3Alt },
                  { name: 'React', icon: FaReact },
                  { name: 'Next.js', icon: SiNextdotjs },
                  { name: 'TypeScript', icon: SiTypescript },
                  { name: 'Redux', icon: SiRedux },
                  { name: 'Tailwind CSS', icon: SiTailwindcss },
                  { name: 'Bootstrap', icon: FaBootstrap },
                  { name: 'Framer Motion', icon: SiFramer },
                  { name: 'GSAP', icon: SiGreensock },
                ]
              },
              {
                category: "Backend & Database",
                items: [
                  { name: 'Node.js', icon: FaNodeJs },
                  { name: 'Express.js', icon: SiExpress },
                  { name: 'GraphQL', icon: SiGraphql },
                  { name: 'Prisma', icon: SiPrisma },
                  { name: 'MongoDB', icon: SiMongodb },
                  { name: 'PostgreSQL', icon: SiPostgresql },
                  { name: 'MySQL', icon: SiMysql },
                  { name: 'PHP', icon: FaPhp },
                  { name: 'Firebase', icon: SiFirebase },
                ]
              },
              {
                category: "Mobile app",
                items: [
                  { name: 'React Native', icon: FaReact },
                  { name: 'Java', icon: FaJava },
                  { name: 'Android Studio', icon: SiAndroidstudio },
                ]
              },
              {
                category: "Tools & DevOps",
                items: [
                  { name: 'Git', icon: FaGitAlt },
                  { name: 'GitHub', icon: FaGithub },
                  { name: 'Docker', icon: FaDocker },
                  { name: 'AWS', icon: FaAws },
                  { name: 'Vercel', icon: SiVercel },
                  { name: 'Netlify', icon: SiNetlify },
                  { name: 'Postman', icon: SiPostman },
                  { name: 'Figma', icon: FaFigma },
                ]
              }
            ].map(techGroup => (
              <div key={techGroup.category}>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{techGroup.category}</h4>
                <div className="flex flex-wrap gap-3">
                  {techGroup.items.map(tech => (
                    <span key={tech.name} className="flex items-center gap-2 px-5 py-2.5 bg-muted/20 text-xs font-medium tracking-wide text-muted-foreground rounded-full border border-border hover:border-primary/50 hover:text-foreground transition-colors cursor-default">
                      <tech.icon className="text-sm" />
                      {tech.name}
                    </span>
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
