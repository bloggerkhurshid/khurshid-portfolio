import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import GithubContributions from '@/components/GithubContributions';
import Contact from '@/components/Contact';
import Script from 'next/script';
import { staticProjects } from '@/data/projects';

async function getProjects() {
  try {
    const res = await fetch('https://kode.devkayy.in/api/projects.php', { 
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(1500)
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}


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
    knowsAbout: ['DailyAxom', 'Web Development', 'React', 'Next.js', 'React Native', 'PHP', 'Software Engineering']
  };

  const [projectsData] = await Promise.all([getProjects()]);
  const fetchedProjects = Array.isArray(projectsData) 
    ? projectsData
        .filter((p: any) => p.slug !== 'dailyaxom-android' && !staticProjects.some(sp => sp.slug === p.slug))
        .map((p: any) => {
          if (p.slug === 'dailyaxom' || p.title.toLowerCase().includes('dailyaxom')) {
            return {
              ...p,
              image_path: 'https://play-lh.googleusercontent.com/StPwRy2zA-7h655s7Ugj4e1RhfmTQcp-RW7qvp6Q14H72Ps_0f7Dko6j0oWL5l3yLlpvxx4JtBK7XQ5F1pdy'
            };
          }
          return p;
        })
    : [];

  const projects = [...staticProjects, ...fetchedProjects];

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
