import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Mail, Code2, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section id="about" className="pt-32 pb-20 md:pt-40 md:pb-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/70 text-xs tracking-widest uppercase mb-8 liquid-glass">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Available for new opportunities
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-[1.1] mb-6">
              Full-Stack <br />
              <strong className="font-bold">Developer.</strong>
            </h1>
            
            <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg font-light">
              Hi, I'm <strong className="text-white font-medium">Khurshid Alom</strong>. I specialize in building high-performance web and mobile applications, focused on scalable backend systems and crafting responsive, accessible user interfaces with a premium aesthetic. 
              Founder of <a href="https://dailyaxom.in" target="_blank" rel="noreferrer" className="text-white border-b border-white/30 hover:border-white transition-colors">DailyAxom</a>.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 font-medium tracking-wide hover:bg-white/20 transition-colors group">
                View My Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="mailto:khurshid@projuktisoft.com" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white border border-white/20 font-medium tracking-wide hover:bg-white/5 transition-colors">
                Contact Me
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-8 text-sm text-white/50 tracking-wide">
              <div className="flex items-center gap-2">
                <MapPin size={16} strokeWidth={1.5} />
                Kokrajhar, Assam, India
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} strokeWidth={1.5} />
                khurshid@projuktisoft.com
              </div>

            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="aspect-square md:aspect-[4/5] rounded-none overflow-hidden border border-white/10 liquid-glass-card relative group flex items-center justify-center">
              <img src="/profile.png" alt="Khurshid Alom" className="w-full h-full object-cover object-[80%_center] grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 mix-blend-luminosity hover:mix-blend-normal" />
            </div>
            
            {/* Floating stats card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-12 liquid-glass-card p-6 border-l-2 border-l-white max-w-xs"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white shrink-0">
                  <Code2 size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-white/50 tracking-widest uppercase mb-1">Current Role</p>
                  <p className="text-sm font-medium text-white leading-tight">Frontend Developer @ Deloai Pvt Ltd</p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
