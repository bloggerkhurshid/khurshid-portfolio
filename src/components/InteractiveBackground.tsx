"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const STREAKS_COUNT = 20;

export default function InteractiveBackground() {
  const [isClient, setIsClient] = useState(false);
  const [streaks, setStreaks] = useState<Array<{ id: number; top: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    setIsClient(true);
    
    // Generate random light streaks
    const newStreaks = Array.from({ length: STREAKS_COUNT }).map((_, i) => ({
      id: i,
      top: Math.random() * 100, // Starting top percentage
      left: Math.random() * 100, // Starting left percentage
      delay: Math.random() * 10, // Initial delay before animation
      duration: 5 + Math.random() * 10, // How long it takes to cross the screen
    }));
    
    setStreaks(newStreaks);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      
      {/* Subtle ambient glow to keep the dark theme rich */}
      <div className="bg-primary/5 absolute top-[20%] right-[20%] h-[50vw] w-[50vw] rounded-full blur-[120px]"></div>
      <div className="bg-primary/5 absolute bottom-[10%] left-[10%] h-[40vw] w-[40vw] rounded-full blur-[100px]"></div>

      {/* Light streaks */}
      {isClient && streaks.map(streak => (
        <motion.div
          key={streak.id}
          initial={{ opacity: 0, x: '-20vw', y: '-20vh' }}
          animate={{ 
            opacity: [0, 0.8, 0], 
            x: '120vw',
            y: '120vh'
          }}
          transition={{
            duration: streak.duration,
            delay: streak.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: `${streak.top}%`,
            left: `${streak.left}%`,
          }}
          className="h-[1px] w-[300px] bg-gradient-to-r from-transparent via-primary/60 to-transparent -rotate-45 blur-[1px]"
        />
      ))}
    </div>
  );
}
