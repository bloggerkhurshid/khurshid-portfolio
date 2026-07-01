"use client";

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Hero() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 120 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center items-center px-6 overflow-hidden bg-[#050505]">
      
      {/* Background Interactive Glow */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="hidden md:block absolute top-0 left-0 w-[45vw] h-[45vw] max-w-[800px] max-h-[800px] bg-white/[0.04] rounded-full blur-[100px] pointer-events-none"
      />
      
      {/* Static Glows for Mobile */}
      <div className="md:hidden absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="md:hidden absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-700/[0.04] rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex flex-col items-center"
        >
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
            Available for New Opportunities
          </span>
          
          <h1 className="text-[14vw] md:text-[10vw] lg:text-[130px] text-white font-bold tracking-tighter leading-[0.85] uppercase">
            Khurshid <br className="md:hidden" /> Alom
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-xl text-zinc-400 font-light max-w-xl mx-auto leading-relaxed mt-6 md:mt-8"
        >
          Full Stack Developer & Software Engineer. Crafting immersive digital experiences with modern web technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-12 w-full sm:w-auto"
        >
          <a href="#projects" className="group relative px-8 py-4 bg-white text-black font-bold text-xs tracking-[0.2em] uppercase overflow-hidden text-center rounded-sm">
            <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            <span className="relative z-10">View Work</span>
          </a>
          <a href="#contact" className="group relative px-8 py-4 bg-transparent text-white border border-white/20 font-bold text-xs tracking-[0.2em] uppercase overflow-hidden text-center rounded-sm hover:border-white transition-colors duration-500">
            <span className="relative z-10">Contact Me</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
