import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Smartphone, Wrench, Sparkles } from 'lucide-react';

const projects = [
  {
    title: 'DailyAxom Website',
    type: 'EdTech Platform / Web App',
    description: "The web portal for Assam's students and competitive exam aspirants. Features mock tests, rankings, job alerts, and bilingual content.",
    features: [
      'Bilingual support (Assamese & English)',
      'Real-time Mock Tests & Practice Papers',
      'Google Auth secured login',
      'Shared common database with the mobile app'
    ],
    tech: ['HTML5', 'React.js', 'Redux', 'Axios', 'TailwindCSS', 'PHP', 'MySQL'],
    link: 'https://dailyaxom.in',
    linkText: 'View Website',
    icon: ExternalLink
  },
  {
    title: 'DailyAxom App',
    type: 'EdTech Platform / Android App',
    description: 'The mobile companion app for DailyAxom, offering a seamless native experience for students on the go.',
    features: [
      'Native Android experience',
      'Google Auth secured login',
      'Shared common database with the web portal',
      'Instant push notifications for job alerts'
    ],
    tech: ['Android Studio', 'Java', 'XML', 'MySQL', 'PHP (API)'],
    link: 'https://play.google.com/store/apps/details?id=com.projuktisoft.dailyaxom',
    linkText: 'View on Play Store',
    icon: Smartphone
  },
  {
    title: 'DailyAxom Tools',
    type: 'Utility Suite / Web App',
    description: 'Powerful online utilities including resume builder, image compressors, and PDF tools—lightning fast and 100% free.',
    features: [
      'Online Resume Maker for job applications',
      'Image & PDF Compression without quality loss',
      'Images to PDF & Image Format Converters',
      'Fast, secure, and privacy-focused'
    ],
    tech: ['React.js', 'TailwindCSS', 'JavaScript'],
    link: 'https://tools.dailyaxom.in/',
    linkText: 'Open Tools',
    icon: Wrench
  },
  {
    title: 'GPT Image Prompts Library',
    type: 'AI Utility / Android App',
    description: 'The Ultimate AI Prompt Collection. Create stunning AI-generated images with the latest and most powerful prompts.',
    features: [
      'Thousands of carefully curated prompts',
      'Supports Midjourney, Flux, Stable Diffusion, Ideogram & Gemini',
      'Categorized prompt library for easy discovery',
      'Copy prompts instantly to clipboard'
    ],
    tech: ['Android Studio', 'Java', 'XML'],
    link: 'https://play.google.com/store/apps/details?id=com.projuktisoft.gpt',
    linkText: 'View App',
    icon: Sparkles
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter mb-4">Featured <strong className="font-bold">Projects</strong></h2>
          <div className="w-24 h-px bg-gradient-to-r from-white to-transparent"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="liquid-glass-card group flex flex-col h-full transition-all duration-500 hover:-translate-y-2"
              >
                <div className="p-8 flex-grow">
                  <div className="mb-6 border-b border-white/10 pb-6">
                    <p className="text-white/40 tracking-widest text-xs uppercase mb-3">{project.type}</p>
                    <h3 className="text-2xl font-light text-white tracking-tight">{project.title}</h3>
                  </div>
                  
                  <p className="text-white/60 mb-8 font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-xs font-medium text-white/40 mb-4 uppercase tracking-widest">Key Features</h4>
                    <ul className="space-y-3">
                      {project.features.map((feature, i) => (
                        <li key={i} className="text-sm text-white/70 font-light flex items-start gap-3">
                          <span className="text-white mt-1 text-[10px]">◆</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-8 pt-0 mt-auto">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 text-white/60 text-[10px] tracking-widest uppercase">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-between w-full gap-2 px-6 py-4 bg-white/10 text-white border border-white/20 font-medium tracking-wide hover:bg-white/20 transition-colors"
                  >
                    <span>{project.linkText}</span>
                    <Icon size={18} strokeWidth={1.5} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
