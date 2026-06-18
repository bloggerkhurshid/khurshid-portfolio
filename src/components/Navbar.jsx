import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'liquid-glass shadow-sm py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 max-w-5xl flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group">
          <div className="text-white p-2 rounded-lg transition-transform group-hover:scale-110">
            <Code2 size={24} strokeWidth={1.5} />
          </div>
          <span className="font-light text-xl tracking-tight text-white uppercase">Khurshid<span className="font-bold">Alom</span></span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-sm tracking-wide text-white/60 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a href="#contact" className="px-6 py-2 border border-white/20 text-white text-sm tracking-wide uppercase hover:bg-white hover:text-black transition-all">
            Get in touch
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full liquid-glass border-b border-white/10 py-4 px-6 flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-light tracking-wide text-white/80 hover:text-white py-3 border-b border-white/5 last:border-0"
            >
              {item.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="mt-2 text-center w-full px-5 py-3 border border-white/20 text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Get in touch
          </a>
        </motion.div>
      )}
    </header>
  );
}
