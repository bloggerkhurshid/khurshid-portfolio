"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center md:justify-start pt-32 pb-12 md:pt-56 md:pb-20 px-6 overflow-hidden">
      
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Background */}
        <div className="hidden md:block absolute inset-0">
          <Image 
            src="/desktop-hero.png" 
            alt="Hero Background" 
            fill 
            priority
            className="object-cover object-[center_60%] scale-110 grayscale" 
          />
        </div>
        
        {/* Mobile Background */}
        <div className="block md:hidden absolute inset-0 overflow-hidden -translate-y-12 md:-translate-y-0">
          <Image 
            src="/phone-hero.png" 
            alt="Hero Background" 
            fill 
            priority
            className="object-cover object-bottom scale-[1.2] grayscale" 
          />
        </div>

        {/* Subtle Bottom Gradient for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-6xl flex flex-col flex-grow">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col flex-grow justify-end md:justify-start items-center md:items-start text-center md:text-left h-full pb-8 md:pb-0"
        >
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-[40px] sm:text-[50px] md:text-[64px] lg:text-[80px] text-white font-bold tracking-tighter leading-[1.05] whitespace-nowrap">
              <motion.span 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }} 
                className="inline-block mr-2 md:mr-0"
              >
                Code.
              </motion.span>
              <br className="hidden md:block" />
              
              <motion.span 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} 
                className="inline-block mr-2 md:mr-0"
              >
                Design.
              </motion.span>
              <br className="hidden md:block" />
              
              <motion.span 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} 
                className="inline-block"
              >
                Build.
              </motion.span>
            </h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-2xl lg:text-3xl text-gray-300 leading-relaxed max-w-2xl font-light mt-6"
            >
              I'm <span className="text-white font-semibold">Khurshid</span>, turning complex problems into elegant digital solutions with React and modern tech.
            </motion.p>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-row justify-center md:justify-start gap-3 md:gap-6 mt-10 md:mt-12 w-full md:w-auto"
          >
            <a href="#projects" className="group flex flex-1 md:flex-none items-center justify-center gap-2 md:gap-3 px-2 md:px-8 py-4 md:py-5 bg-white text-black text-[11px] md:text-sm font-bold uppercase tracking-wider md:tracking-widest hover:bg-gray-200 transition-all text-center whitespace-nowrap">
              View Projects
              <span className="hidden sm:inline group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a href="#contact" className="group flex flex-1 md:flex-none items-center justify-center gap-2 md:gap-3 px-2 md:px-8 py-4 md:py-5 bg-transparent text-white border border-white text-[11px] md:text-sm font-bold uppercase tracking-wider md:tracking-widest hover:bg-white hover:text-black transition-all text-center whitespace-nowrap">
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
