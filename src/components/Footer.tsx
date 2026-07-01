"use client";

import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './Icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer id="contact" className="py-12 border-t border-border mt-20">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start gap-3 text-muted">
          <span className="text-xl font-bold tracking-tight text-foreground">Khurshid.</span>
          <p className="text-sm">© {new Date().getFullYear()} Khurshid Alom. All rights reserved.</p>
          <div className="flex gap-4 mt-1">
            <Link href="/privacy" className="text-xs hover:text-foreground hover:underline underline-offset-4 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs hover:text-foreground hover:underline underline-offset-4 transition-colors">Terms of Service</Link>
          </div>
        </div>

        <div className="flex gap-6">
          <a href="mailto:khurshid.sde@gmail.com" className="text-muted hover:text-foreground transition-colors p-2" aria-label="Email">
            <Mail size={20} />
          </a>
          <a href="#" className="text-muted hover:text-foreground transition-colors p-2" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="#" className="text-muted hover:text-foreground transition-colors p-2" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
        </div>

        <button 
          onClick={scrollToTop}
          className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors p-2 border border-border rounded-full hover:bg-muted/10"
        >
          Back to top <ArrowUp size={16} />
        </button>

      </div>
    </footer>
  );
}
