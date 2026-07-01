"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Code2, Wrench } from 'lucide-react';
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
    icon: <Layout className="w-5 h-5" />,
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
    icon: <Server className="w-5 h-5" />,
    skills: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "RESTful APIs", icon: <Server /> },
      { name: "JWT Auth", icon: <SiJsonwebtokens /> }
    ]
  },
  {
    title: "Database",
    icon: <Database className="w-5 h-5" />,
    skills: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Prisma ORM", icon: <SiPrisma /> }
    ]
  },
  {
    title: "Languages",
    icon: <Code2 className="w-5 h-5" />,
    skills: [
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS3", icon: <SiCss /> }
    ]
  },
  {
    title: "Tools & DevOps",
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      { name: "Git", icon: <SiGit /> },
      { name: "GitHub", icon: <SiGithub /> },
      { name: "Vercel", icon: <SiVercel /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "Figma", icon: <SiFigma /> },
      { name: "Docker", icon: <SiDocker /> }
    ]
  }
];

export default function TechStack() {
  return (
    <section className="py-24 md:py-32 bg-background border-y border-border/30">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Technical Arsenal</h2>
        </motion.div>

        <div className="flex flex-col gap-8 md:gap-10">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="grid md:grid-cols-4 gap-4 md:gap-6 items-start border-b border-border/50 pb-8 md:pb-10 last:border-0 last:pb-0"
            >
              <div className="md:col-span-1 flex items-center gap-3 text-foreground font-bold text-xl mb-4 md:mb-0">
                {category.icon}
                <h3>{category.title}</h3>
              </div>
              
              <div className="md:col-span-3">
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {category.skills.map(skill => (
                    <div key={skill.name} className="flex items-center gap-2 text-lg text-muted font-medium hover:text-foreground transition-colors cursor-default">
                      <span className="text-foreground/70">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
