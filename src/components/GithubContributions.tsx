"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTheme } from 'next-themes';
import { FaGithub, FaExternalLinkAlt, FaCodeBranch, FaStar, FaInfoCircle } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const USERNAME = "bloggerkhurshid";

// Website primary orange theme colors
const ORANGE_HEX_DARK = "f97316";
const ORANGE_HEX_LIGHT = "ea580c";

export default function GithubContributions() {
  const container = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".github-reveal",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: container });

  const activeTheme = resolvedTheme || theme;
  const isDark = !mounted || activeTheme === 'dark';
  const hexColor = isDark ? ORANGE_HEX_DARK : ORANGE_HEX_LIGHT;

  return (
    <section ref={container} id="github" className="py-16 px-6 max-w-7xl mx-auto w-full relative z-10">
      <div className="github-reveal mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/50 pb-6">
        <div>
          <p className="text-primary font-display mb-2 text-sm font-medium tracking-wide uppercase flex items-center gap-2">
            <FaGithub className="text-base" /> Open Source & Activity
          </p>
          <h2 className="font-display text-foreground text-3xl font-bold md:text-4xl">
            GitHub Contributions
          </h2>
        </div>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-muted/30 hover:bg-muted text-foreground border border-border transition-all hover:scale-[1.02]"
        >
          <span>View Profile</span>
          <FaExternalLinkAlt className="text-[10px]" />
        </a>
      </div>

      <div className="github-reveal space-y-6">
        {/* Main Contribution Graph Card */}
        <div className="p-6 rounded-2xl bg-card border border-border/70 shadow-sm hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                <FaGithub />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base leading-tight">
                  @{USERNAME}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Public contributions graph
                </p>
              </div>
            </div>
          </div>

          {/* Contribution Heatmap Image matching active website dark/light mode */}
          <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted">
            <div className="min-w-[750px] flex justify-center py-2">
              <img
                key={hexColor}
                src={`https://ghchart.rshah.org/${hexColor}/${USERNAME}`}
                alt="Khurshid Alom's GitHub Contribution Chart"
                className="w-full max-w-4xl h-auto rounded-lg filter drop-shadow-xs transition-opacity duration-300"
                loading="lazy"
              />
            </div>
          </div>

          {/* Contribution Snake SVG synced with active website theme */}
          <div className="mt-6 pt-6 border-t border-border/40">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Contribution Snake
              </span>
            </div>
            <div className="overflow-x-auto flex justify-center bg-muted/20 p-4 rounded-xl border border-border/40">
              <img
                key={isDark ? 'snake-dark' : 'snake-light'}
                src={`https://raw.githubusercontent.com/${USERNAME}/${USERNAME}/output/github-contribution-grid-snake${isDark ? '-dark' : ''}.svg`}
                alt="GitHub Contribution Snake Animation"
                className="w-full max-w-4xl h-auto rounded-md"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes('-dark')) {
                    target.src = `https://raw.githubusercontent.com/${USERNAME}/${USERNAME}/output/github-contribution-grid-snake.svg`;
                  }
                }}
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <FaInfoCircle className="text-primary/70 text-sm" />
              Chart automatically reflects commit & PR activity on GitHub
            </span>
            <div className="flex items-center gap-4">
              <a
                href={`https://github.com/${USERNAME}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <FaCodeBranch className="text-[11px]" /> Repositories
              </a>
              <a
                href={`https://github.com/${USERNAME}?tab=stars`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <FaStar className="text-[11px]" /> Starred
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
