import React from 'react';
import { motion } from 'framer-motion';

export default function Education() {
  return (
    <section id="education" className="py-24 relative z-10">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter mb-4">Education & <strong className="font-bold">Certifications</strong></h2>
          <div className="w-24 h-px bg-gradient-to-r from-white to-transparent"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Education */}
          <div className="flex flex-col">
            <h3 className="text-xs text-white/40 tracking-widest uppercase mb-6">Academic Background</h3>
            
            <div className="flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="liquid-glass-card p-8 border-l-2 border-l-white h-[320px] flex flex-col"
              >
                <div className="text-white/40 text-xs tracking-widest uppercase mb-3">2024 – 2026</div>
                <h3 className="text-2xl font-light text-white mb-2">Master of Computer Applications</h3>
                <div className="text-white/60 font-light tracking-wide mb-4">Chandigarh University</div>
                <p className="text-white/50 text-sm font-light mb-6 flex-1">Specialization: Advanced Web Technologies</p>
                <div className="mt-auto self-start inline-block px-4 py-1.5 border border-white/20 text-white text-xs tracking-widest uppercase">
                  GPA: 7.65
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, delay: 0.1 }}
                className="liquid-glass-card p-8 border-l-2 border-l-white/20 h-[320px] flex flex-col"
              >
                <div className="text-white/40 text-xs tracking-widest uppercase mb-3">2020 – 2023</div>
                <h3 className="text-2xl font-light text-white mb-2">Bachelor of Computer Applications</h3>
                <div className="text-white/60 font-light tracking-wide mb-4">Bholanath College</div>
                <p className="text-white/50 text-sm font-light mb-6 flex-1">Specialization: Computer Science Foundations</p>
                <div className="mt-auto self-start inline-block px-4 py-1.5 border border-white/20 text-white text-xs tracking-widest uppercase">
                  GPA: 6.69
                </div>
              </motion.div>
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-col">
            <h3 className="text-xs text-white/40 tracking-widest uppercase mb-6">Professional Training</h3>

            <div className="flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="liquid-glass-card p-8 h-[320px] flex flex-col"
              >
                <div className="mb-6 border-b border-white/10 pb-6 flex-1">
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Certification</p>
                  <h3 className="text-2xl font-light text-white mb-2 leading-tight">Full Stack Web Development</h3>
                  <p className="text-white/60 font-light tracking-wide">Apna College</p>
                </div>
                
                <div className="mt-auto">
                  <p className="text-xs text-white/40 tracking-widest uppercase mb-4">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {['React.js', 'Node.js', 'Express.js', 'MongoDB'].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 text-white/70 text-xs tracking-wide">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, delay: 0.1 }}
                className="liquid-glass-card p-8 h-[320px] flex flex-col"
              >
                <div className="mb-6 border-b border-white/10 pb-6 flex-1">
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Certification</p>
                  <h3 className="text-2xl font-light text-white mb-2 leading-tight">Master JavaScript & React.JS in 40 Days</h3>
                  <p className="text-white/60 font-light tracking-wide">CodewithRandom.dev</p>
                </div>
                
                <div className="mt-auto">
                  <p className="text-xs text-white/40 tracking-widest uppercase mb-4">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'React.js', 'Frontend'].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 text-white/70 text-xs tracking-wide">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
