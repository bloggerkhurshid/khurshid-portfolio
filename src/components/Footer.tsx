"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="py-12 border-t border-border mt-0 bg-background relative z-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start gap-3 text-muted-foreground">
          <p className="text-sm">
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:text-foreground hover:underline underline-offset-4 transition-colors">
              Khurshid Alom
            </Link>
            . All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors">Terms of Service</Link>
        </div>

      </div>
    </footer>
  );
}
