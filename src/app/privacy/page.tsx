"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-background">
      <div className="mx-auto max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="inline-flex items-center gap-2 text-muted font-medium hover:text-foreground transition-colors mb-12">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Privacy Policy</h1>
          <p className="text-muted mb-12">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300">
            <p className="mb-6">
              This Privacy Policy describes how your personal information is collected, used, and shared when you visit this website. 
              As a portfolio and informational site, I respect your privacy and am committed to protecting any minimal data collected.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Information We Collect</h2>
            <p className="mb-6">
              This website is a static portfolio and does not actively collect personal data such as names, addresses, or payment information. 
              If you choose to contact me via email, the information you provide (such as your email address and message content) will solely be used to respond to your inquiry.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Cookies and Analytics</h2>
            <p className="mb-6">
              This site may use standard web analytics tools (such as Google Analytics or Vercel Analytics) to understand website traffic and usage patterns. 
              These tools may use cookies—small data files placed on your device—to collect anonymous, aggregated data like browser type, time spent on pages, and geographic region.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Third-Party Links</h2>
            <p className="mb-6">
              This portfolio contains links to external websites, including GitHub repositories and live project demonstrations. 
              Please note that I have no control over the privacy practices of these third-party sites and encourage you to review their respective privacy policies.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Changes to This Policy</h2>
            <p className="mb-6">
              I may update this privacy policy from time to time in order to reflect changes to website practices or for other operational, legal, or regulatory reasons.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Contact</h2>
            <p className="mb-6">
              For more information about my privacy practices, or if you have any questions, please contact me by email at <a href="mailto:khurshid.sde@gmail.com" className="text-white underline underline-offset-4">khurshid.sde@gmail.com</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
