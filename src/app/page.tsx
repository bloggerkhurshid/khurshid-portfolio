import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import GithubContributions from '@/components/GithubContributions';
import Contact from '@/components/Contact';
import Script from 'next/script';

async function getProjects() {
  try {
    const res = await fetch('https://kode.devkayy.in/api/projects.php', { next: { revalidate: 60 } });
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
        .filter((p: any) => p.slug !== 'dailyaxom-android')
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

  const personalProjects = [
    {
      id: 101,
      title: 'VN Templates: Reels & Video',
      description: 'An app for discovering and using VN templates for Instagram Reels and TikTok videos.',
      tech_stacks: 'Android, Kotlin, UI/UX',
      live_url: 'https://play.google.com/store/apps/details?id=com.vntemplates.app',
      github_url: '',
      slug: 'vn-templates',
      image_path: 'https://play-lh.googleusercontent.com/2By0_RffkJUxe9YdyWAEcK2FCW8j1LJ8vEQ4z1BFwwbh92pNLLdWO-VIaDp-RHodaWd8LfOniVe2LKZqJjSWdQ'
    },
    {
      id: 102,
      title: 'GPT Image Prompts - PromptGPT',
      description: 'Discover and create amazing prompts for AI image generation with PromptGPT.',
      tech_stacks: 'Android, AI, UI/UX',
      live_url: 'https://play.google.com/store/apps/details?id=com.projuktisoft.gpt',
      github_url: '',
      slug: 'prompt-gpt',
      image_path: 'https://play-lh.googleusercontent.com/rAuUWuAHMPH2lN4Ug-wl3Wh7EFCI4SpCyTKN0DtWXFvgXl6ZUmk4joOcH2svZHzpFpxyTLvW8Izy2tdyagvxmQ'
    },
    {
      id: 103,
      title: 'BCA Notes & Books- KodeBurner',
      description: 'A comprehensive app for BCA students providing notes, books, and study materials.',
      tech_stacks: 'Android, Education, Mobile',
      live_url: 'https://play.google.com/store/apps/details?id=com.kodeburner.app',
      github_url: '',
      slug: 'bca-notes-kodeburner',
      image_path: 'https://play-lh.googleusercontent.com/ALghXvqD7I3PK3srgScgbYZqVzgxPULdeZ-HVqBB7Q0xT6x5EybzLyNDXV7197z5KLdhg7gx1Cc8ObT5co3x'
    },
    {
      id: 104,
      title: 'Presets & Filters - Presetify',
      description: 'Enhance your photos with high-quality Lightroom presets and filters using Presetify.',
      tech_stacks: 'Android, Photography, Tools',
      live_url: 'https://play.google.com/store/apps/details?id=com.projuktisoft.presets',
      github_url: '',
      slug: 'presetify',
      image_path: 'https://play-lh.googleusercontent.com/d47top34t6GOyX2oChy71AQRgRgPLhlx3J3G2ZFBfptQVS4GWtXm6zJgnswlmEk9NmgoeRfos8LRyMLMXCJ4'
    },
    {
      id: 105,
      title: 'ADRE Mock Tests - DailyAxom',
      description: 'Prepare for ADRE exams with mock tests and daily practice questions from DailyAxom.',
      tech_stacks: 'Android, Exam Prep, Education',
      live_url: 'https://play.google.com/store/apps/details?id=com.projuktisoft.dailyaxom',
      github_url: '',
      slug: 'adre-mock-tests',
      image_path: 'https://play-lh.googleusercontent.com/StPwRy2zA-7h655s7Ugj4e1RhfmTQcp-RW7qvp6Q14H72Ps_0f7Dko6j0oWL5l3yLlpvxx4JtBK7XQ5F1pdy'
    }
  ];

  const projects = [...personalProjects, ...fetchedProjects];

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
