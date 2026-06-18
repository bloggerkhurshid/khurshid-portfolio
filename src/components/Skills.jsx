import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Server, Database } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Monitor,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'TailwindCSS', 'Redux']
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Express.js', 'Flask', 'FastAPI']
  },
  {
    title: 'Database & Tools',
    icon: Database,
    skills: ['MongoDB', 'MySQL', 'Docker', 'Git', 'GitHub', 'Figma', 'Postman']
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter mb-4">Technical <strong className="font-bold">Skills</strong></h2>
          <div className="w-24 h-px bg-gradient-to-r from-white to-transparent"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="liquid-glass-card p-8"
              >
                <div className="w-12 h-12 bg-white/10 text-white flex items-center justify-center mb-8 border border-white/20">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-light text-white mb-6 uppercase tracking-wider">{category.title}</h3>
                
                <div className="flex flex-col gap-3">
                  {category.skills.map(skill => (
                    <div 
                      key={skill}
                      className="flex items-center gap-3 text-white/70 text-sm font-light tracking-wide"
                    >
                      <span className="w-4 h-px bg-white/30"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
