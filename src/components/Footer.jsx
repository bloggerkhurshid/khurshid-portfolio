import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 pt-24 pb-12 border-t border-white/10 mt-20">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="liquid-glass-card p-12 md:p-16 text-center mb-16 relative overflow-hidden">
          {/* Subtle glow inside footer card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full filter blur-[80px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Let's work <strong className="font-bold">together.</strong></h2>
            <p className="text-white/60 font-light max-w-md mx-auto mb-10 text-lg">
              I'm always open to discussing product design work, development projects, or partnership opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:khurshid@projuktisoft.com" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 font-medium tracking-wide hover:bg-white/20 transition-colors">
                <Mail size={18} strokeWidth={2} />
                <span>khurshid@projuktisoft.com</span>
              </a>
              <a href="https://wa.me/917002820458" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 font-medium tracking-wide hover:bg-white/20 transition-colors">
                <MessageCircle size={18} strokeWidth={2} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40 font-light tracking-wide uppercase">
          <p>&copy; {new Date().getFullYear()} Khurshid Alom. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com/bloggerkhurshid" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/bloggerkhurshid" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
