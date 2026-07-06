"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Blog', href: '/#home-blog' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        
        {/* Floating Background */}
        <div 
          className={`absolute inset-0 mx-4 xl:mx-0 h-16 bg-background/80 border border-border backdrop-blur-md rounded-2xl shadow-lg transition-opacity duration-500 ease-out ${scrolled ? 'opacity-100' : 'opacity-0'}`}
        />
        
        <nav className="relative flex h-16 items-center justify-between w-full px-8 xl:px-6">
          <Link href="/" className="font-display text-foreground text-lg font-semibold tracking-tight">
            khurshidalom<span className="text-primary">.in</span>
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
        <div className={`md:hidden absolute left-4 right-4 bg-background/95 backdrop-blur-md shadow-2xl transition-all duration-300 ${
          scrolled ? 'top-[calc(100%+1rem)] rounded-2xl border border-border' : 'top-full rounded-2xl border border-border mt-2'
        }`}>
          <ul className="flex flex-col items-center gap-6 py-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-muted-foreground hover:text-foreground text-base transition-colors duration-200"
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
