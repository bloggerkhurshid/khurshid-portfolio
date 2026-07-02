"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-background relative z-10">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground font-medium hover:text-primary transition-colors mb-12">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          
          <h1 className="font-display text-foreground text-4xl md:text-6xl font-bold tracking-tight mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-12">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
            <p className="mb-6">
              By accessing or using this website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the website.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">1. Intellectual Property</h2>
            <p className="mb-6">
              The content, design, code, and overall architecture of this portfolio are the intellectual property of Khurshid Alom, except where open-source libraries or third-party assets are utilized under their respective licenses. You may not reproduce, distribute, or create derivative works from this portfolio without explicit permission.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">2. Use of Content</h2>
            <p className="mb-6">
              The projects displayed on this website are for demonstration and portfolio purposes. Any source code provided via linked GitHub repositories is governed by the specific license attached to that repository.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">3. Disclaimer of Warranties</h2>
            <p className="mb-6">
              This website is provided "as is," with all faults, and Khurshid Alom makes no express or implied representations or warranties of any kind related to this website or the materials contained within it. Furthermore, nothing contained on this website shall be interpreted as advising you.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">4. Limitation of Liability</h2>
            <p className="mb-6">
              In no event shall Khurshid Alom be held liable for anything arising out of or in any way connected with your use of this website. Khurshid Alom shall not be liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">5. Governing Law</h2>
            <p className="mb-6">
              These terms will be governed by and interpreted in accordance with local laws, and you submit to the non-exclusive jurisdiction of the state and federal courts for the resolution of any disputes.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
