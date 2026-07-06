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
    <header 
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        scrolled 
          ? 'translate-y-4 w-[calc(100%-2rem)] max-w-7xl bg-background/80 border border-border backdrop-blur-md rounded-full shadow-lg' 
          : 'translate-y-0 w-full max-w-full bg-transparent border-b border-transparent'
      }`}
    >
      <nav className={`mx-auto flex h-16 items-center justify-between w-full px-6 ${scrolled ? '' : 'max-w-7xl'}`}>
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
        <div className={`md:hidden absolute left-0 w-full bg-background/95 backdrop-blur-md shadow-2xl ${
          scrolled ? 'top-[calc(100%+0.5rem)] rounded-3xl border border-border' : 'top-full border-b border-border'
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
    </header>
  );
}
