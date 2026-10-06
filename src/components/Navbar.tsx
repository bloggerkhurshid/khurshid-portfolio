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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Glass Background for Top Header */}
      <div 
        className={`absolute inset-0 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-background/70 dark:bg-background/50 backdrop-blur-xl border-border/80 shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-background/40 dark:bg-background/20 backdrop-blur-lg border-border/40'
        }`}
        style={{
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          backdropFilter: 'blur(16px) saturate(180%)'
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8">
        <nav className="flex h-16 sm:h-20 items-center justify-between w-full">
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
