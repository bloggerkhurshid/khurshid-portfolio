"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';

const timeline = [
  {
    type: "experience",
    title: "Full-Stack Developer",
    org: "Freelance",
    period: "2022 – Present",
    desc: "Delivering custom, high-performance web and mobile solutions for clients globally.",
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    type: "education",
    title: "Master of Computer Applications",
    org: "Chandigarh University",
    period: "2024 – 2026",
    desc: "Focusing on advanced cloud architectures and scalable web systems.",
    icon: <GraduationCap className="w-5 h-5" />
  },
  {
    type: "education",
    title: "Bachelor of Computer Applications",
    org: "Bholanath College",
    period: "2020 – 2023",
    desc: "Built a strong foundation in computer science principles and software engineering.",
    icon: <GraduationCap className="w-5 h-5" />
  }
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-[#050505]">
      <div className="mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-[10vw] md:text-[8vw] lg:text-[80px] font-bold tracking-tighter text-white leading-none uppercase mb-6">
            Background
          </h2>
          <div className="w-full h-[1px] bg-white/10" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main About Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-2 text-white/50 text-sm tracking-widest uppercase mb-8">
                <MapPin className="w-4 h-4" /> Based in India
              </div>
              <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed">
                I am a passionate <span className="text-white font-medium">Full-Stack Developer</span> specializing in building high-performance web and mobile applications with premium aesthetics and robust architectures.
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-white/50 text-sm leading-relaxed">
                Technology has always fascinated me because it allows ideas to become real-world solutions. Every project teaches me something new.
              </p>
            </div>
          </motion.div>

          {/* Timeline / Experience Bento */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {timeline.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col ${i === 0 ? 'md:col-span-2' : ''}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-white/40 tracking-widest uppercase px-3 py-1 rounded-full border border-white/10">
                    {item.period}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white tracking-tight mb-2">{item.title}</h3>
                <div className="text-sm font-medium text-white/60 mb-4">{item.org}</div>
                
                <p className="text-sm text-zinc-400 leading-relaxed mt-auto">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
