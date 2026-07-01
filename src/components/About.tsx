"use client";

import React from 'react';
import { motion } from 'framer-motion';

const timeline = [
  {
    type: "experience",
    title: "Full-Stack Developer",
    org: "Freelance",
    period: "2022 – Present",
    desc: "Delivering custom, high-performance web and mobile solutions for clients globally. Specializing in React, Next.js, and modern backend architectures."
  },
  {
    type: "education",
    title: "Master of Computer Applications",
    org: "Chandigarh University",
    period: "2024 – 2026",
    desc: "Focusing on advanced cloud architectures, scalable web systems, and modern software engineering practices."
  },
  {
    type: "education",
    title: "Bachelor of Computer Applications",
    org: "Bholanath College",
    period: "2020 – 2023",
    desc: "Built a strong foundation in computer science principles, database management, and object-oriented programming."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">About Me</h2>
          <p className="text-xl text-muted leading-relaxed font-medium max-w-2xl mx-auto">
            I am a passionate Full-Stack Developer specializing in building high-performance web and mobile applications with premium aesthetics and robust architectures.
          </p>
        </motion.div>

        <div className="relative border-l border-border/50 ml-4 md:ml-0 md:pl-0">
          {timeline.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 md:pl-12 mb-16 last:mb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 bg-foreground rounded-full shadow-[0_0_0_4px_var(--background)] ring-1 ring-border" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                <span className="text-sm font-medium text-foreground mt-1 md:mt-0 px-3 py-1 bg-muted/20 rounded-full w-fit">
                  {item.period}
                </span>
              </div>
              
              <div className="text-lg font-medium text-foreground/80 mb-4">
                {item.org}
              </div>
              
              <p className="text-muted leading-relaxed max-w-2xl">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
