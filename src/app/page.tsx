import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import GithubContributions from '@/components/GithubContributions';
import Contact from '@/components/Contact';
import Script from 'next/script';
import { staticProjects } from '@/data/projects';

export default async function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Khurshid Alom',
    url: 'https://khurshidalom.in',
    jobTitle: 'Full Stack Developer',
    sameAs: [
      'https://github.com/bloggerkhurshid',
      'https://www.linkedin.com/in/bloggerkhurshid/',
      'https://www.instagram.com/khurshidalom.in/',
      'https://www.facebook.com/khurshid.io'
    ],
    knowsAbout: ['DailyAxom', 'Web Development', 'React', 'Next.js', 'React Native', 'Software Engineering']
  };

  const projects = staticProjects;

  return (
    <main className="min-h-screen bg-background">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <GithubContributions />
      <About />
      <Projects initialProjects={projects} />
      <Contact />
    </main>
  );
}
