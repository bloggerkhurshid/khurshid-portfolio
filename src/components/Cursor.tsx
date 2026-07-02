"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    // Move cursor
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0, // instant
      });
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15, // slight delay for smooth follower
      });
    };

    // Handle hover states on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      }
    };
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={followerRef} 
        className={`fixed top-0 left-0 rounded-full border border-white/30 pointer-events-none z-[9998] hidden md:block transition-all duration-200 ${isHovering ? 'w-16 h-16 bg-white/10' : 'w-8 h-8 bg-transparent'}`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
