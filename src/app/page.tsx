import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import BlogSection from '@/components/BlogSection';
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

async function getBlogs() {
  try {
    const res = await fetch('https://kode.devkayy.in/api/blogs.php', { next: { revalidate: 60 } });
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

  const [projectsData, blogsData] = await Promise.all([getProjects(), getBlogs()]);
  const projects = Array.isArray(projectsData) ? projectsData : [];
  const blogs = Array.isArray(blogsData) ? blogsData : [];

  return (
    <main className="min-h-screen bg-background">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Projects initialProjects={projects} />
      <BlogSection initialBlogs={blogs.slice(0, 3)} />
      <Contact />
    </main>
  );
}
