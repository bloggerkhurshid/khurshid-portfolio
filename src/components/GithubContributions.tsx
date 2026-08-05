"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaGithub, FaExternalLinkAlt, FaCodeBranch, FaStar, FaInfoCircle } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const USERNAME = "bloggerkhurshid";
// Website primary orange theme color
const ORANGE_HEX = "f97316";

export default function GithubContributions() {
  const container = useRef<HTMLDivElement>(null);

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

          {/* Contribution Heatmap Image matching website primary orange theme */}
          <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted">
            <div className="min-w-[750px] flex justify-center py-2">
              <img
                src={`https://ghchart.rshah.org/${ORANGE_HEX}/${USERNAME}`}
                alt="Khurshid Alom's GitHub Contribution Chart"
                className="w-full max-w-4xl h-auto rounded-lg filter drop-shadow-xs"
                loading="lazy"
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
