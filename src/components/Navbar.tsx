"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from 'next-themes';

const navItems = [
  { name: 'GitHub', href: '/#github' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (isOpen) setIsOpen(false);
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className={`relative mx-auto w-full max-w-7xl transition-transform duration-500 ease-out pointer-events-auto ${scrolled ? 'translate-y-4' : 'translate-y-0'}`}>
        
        {/* Floating Glass Background */}
        <div 
          className={`absolute inset-0 mx-3 sm:mx-4 xl:mx-0 h-16 rounded-2xl transition-all duration-500 ease-out ${
            scrolled 
              ? 'bg-background/60 dark:bg-background/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] opacity-100 ring-1 ring-black/5 dark:ring-white/5' 
              : 'bg-background/35 dark:bg-background/25 backdrop-blur-md border border-white/15 dark:border-white/5 shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] opacity-95'
          }`}
          style={{
            WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(12px) saturate(150%)',
            backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(12px) saturate(150%)'
          }}
        />
        
        <nav className="relative flex h-16 items-center justify-between w-full px-7 xl:px-6">
          <Link href="/" className="inline-flex items-center transition-opacity hover:opacity-85 py-0.5" aria-label="Khurshid Alom Home">
            <img 
              src="/signature.png" 
              alt="Khurshid Alom" 
              style={{ filter: isDark ? 'invert(1) brightness(1)' : 'brightness(0)' }}
              className="h-10 sm:h-12 w-auto object-contain transition-transform hover:scale-105 duration-300"
            />
          </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <ThemeToggle />

          {/* Mobile Toggle */}
          <button 
            className="text-foreground md:hidden p-2 focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div 
          className={`md:hidden absolute left-4 right-4 bg-background/80 dark:bg-background/70 backdrop-blur-2xl shadow-[0_12px_40px_0_rgba(0,0,0,0.25)] border border-white/20 dark:border-white/10 transition-all duration-300 rounded-2xl ${
            scrolled ? 'top-[calc(100%+0.75rem)]' : 'top-full mt-3'
          }`}
          style={{
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            backdropFilter: 'blur(20px) saturate(180%)'
          }}
        >
          <ul className="flex flex-col items-center gap-6 py-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </header>
  );
}
