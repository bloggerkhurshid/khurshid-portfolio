"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiRedux,
  SiNodedotjs, SiExpress, SiJsonwebtokens,
  SiMongodb, SiMysql, SiPostgresql, SiPrisma,
  SiJavascript, SiHtml5, SiCss,
  SiGit, SiGithub, SiVercel, SiPostman, SiFigma, SiDocker,
  SiFramer
} from 'react-icons/si';

const categories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "Framer Motion", icon: <SiFramer /> },
      { name: "Redux", icon: <SiRedux /> },
      { name: "React Native", icon: <SiReact /> }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "RESTful APIs", icon: <SiNodedotjs /> },
      { name: "JWT Auth", icon: <SiJsonwebtokens /> }
    ]
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Prisma ORM", icon: <SiPrisma /> }
    ]
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git", icon: <SiGit /> },
      { name: "GitHub", icon: <SiGithub /> },
      { name: "Vercel", icon: <SiVercel /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "Figma", icon: <SiFigma /> }
    ]
  }
];

export default function TechStack() {
  return (
    <section className="py-32 px-6 bg-[#050505]">
      <div className="mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16"
        >
          <div className="w-full">
            <h2 className="text-[10vw] md:text-[8vw] lg:text-[80px] font-bold tracking-tighter text-white leading-none uppercase mb-6">
              Expertise
            </h2>
            <div className="w-full h-[1px] bg-white/10" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="bg-[#050505] p-8 md:p-10 flex flex-col group hover:bg-white/[0.02] transition-colors duration-500"
            >
              <h3 className="text-white/40 text-xs tracking-[0.2em] uppercase mb-10 group-hover:text-white transition-colors duration-500">{category.title}</h3>
              
              <div className="flex flex-col gap-6 mt-auto">
                {category.skills.map(skill => (
                  <div key={skill.name} className="flex items-center gap-4 text-white hover:text-white/70 transition-colors">
                    <span className="text-white/50 text-xl">{skill.icon}</span>
                    <span className="font-medium tracking-tight text-lg">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
