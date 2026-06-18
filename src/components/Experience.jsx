import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter mb-4">Professional <strong className="font-bold">Experience</strong></h2>
          <div className="w-24 h-px bg-gradient-to-r from-white to-transparent"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative group">
            <div className="liquid-glass-card p-8 md:p-12 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/10">
                <div>
                  <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">Frontend Developer</h3>
                  <div className="flex items-center gap-2 mt-3 text-white/60 font-medium tracking-wide text-sm uppercase">
                    <Briefcase size={16} strokeWidth={1.5} />
                    <span>Deloai Pvt Ltd</span>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-white/80 self-start">
                  <Calendar size={14} strokeWidth={1.5} />
                  <span>Aug 2025 – Present</span>
                  <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                  <span className="text-white/50">Remote</span>
                </div>
              </div>

              <ul className="space-y-5 text-white/70 font-light leading-relaxed">
                <li className="flex gap-4">
                  <span className="text-white mt-1.5 flex-shrink-0 text-xs">◆</span>
                  <span><strong className="text-white font-medium">Architecting</strong> clean, scalable React application structures and state management patterns.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white mt-1.5 flex-shrink-0 text-xs">◆</span>
                  <span><strong className="text-white font-medium">Developing robust features</strong> using TypeScript, ensuring compile-time safety and component reliability.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white mt-1.5 flex-shrink-0 text-xs">◆</span>
                  <span><strong className="text-white font-medium">Building reusable component libraries</strong> adhering to strict design systems and accessibility guidelines.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white mt-1.5 flex-shrink-0 text-xs">◆</span>
                  <span><strong className="text-white font-medium">Integrating secure RESTful APIs</strong> with Axios and managing authentication via JWT.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white mt-1.5 flex-shrink-0 text-xs">◆</span>
                  <span><strong className="text-white font-medium">Optimizing frontend</strong> bundle sizes, rendering paths, and loading states for maximum performance.</span>
                </li>
              </ul>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-xs text-white/40 tracking-widest uppercase mb-4">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'TypeScript', 'Axios', 'JWT', 'TailwindCSS'].map(tech => (
                    <span key={tech} className="px-4 py-1.5 bg-white/5 border border-white/10 text-white/80 text-xs tracking-wide uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
