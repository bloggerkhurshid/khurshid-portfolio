import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { GithubIcon as Github } from '@/components/Icons';
import { Metadata, ResolvingMetadata } from 'next';

interface Project {
  id: number;
  title: string;
  description: string;
  tech_stacks: string;
  live_url: string;
  github_url: string;
  slug: string;
  image_path: string;
}

type Props = {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch('https://kode.devkayy.in/api/projects.php', { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data)) {
      return data.find(p => p.slug === slug) || null;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Khurshid Alom',
    };
  }

  const imageUrl = project.image_path ? `https://kode.devkayy.in${project.image_path}` : '/project-three.jpg';

  return {
    title: `${project.title} | Khurshid Alom Portfolio`,
    description: project.description.substring(0, 160) + (project.description.length > 160 ? '...' : ''),
    openGraph: {
      title: project.title,
      description: project.description,
      url: `https://khurshidalom.in/projects/${project.slug}`,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [imageUrl],
    },
  };
}

export default async function ProjectDetails({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const project = await getProject(slug);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center bg-background relative z-10">
        <h1 className="font-display text-4xl font-bold mb-4 text-foreground">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
        <Link href="/projects" className="text-foreground font-semibold hover:text-primary transition-colors underline underline-offset-4">
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-background relative z-10">
      <article className="mx-auto max-w-7xl">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link href="/projects" className="inline-flex items-center gap-2 text-muted-foreground font-medium hover:text-foreground transition-colors mb-12 uppercase tracking-widest text-xs">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8 leading-tight">{project.title}</h1>
          
          <div className="flex flex-wrap gap-3 mb-12">
            {project.tech_stacks.split(',').map(tag => (
              <span key={tag} className="px-4 py-2 bg-muted/20 text-xs font-medium tracking-wide text-muted-foreground rounded-full border border-border">
                {tag.trim()}
              </span>
            ))}
          </div>

          <div className="w-full aspect-video relative mb-16 rounded-2xl overflow-hidden bg-muted/20 border border-border">
            <img 
              src={project.image_path ? `https://kode.devkayy.in${project.image_path}` : '/project-three.jpg'} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">About the Project</h2>
              <div className="prose prose-lg prose-invert prose-p:text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 max-w-none font-light leading-relaxed">
                <p className="leading-relaxed">{project.description}</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Links</h2>
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-primary text-primary-foreground font-bold py-4 rounded-full hover:bg-primary/90 transition-colors w-full">
                  <ExternalLink size={18} /> View Live Demo
                </a>
              )}
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 border border-border bg-transparent text-foreground font-bold py-4 rounded-full hover:bg-muted/50 transition-colors w-full">
                  <Github size={18} /> Source Code
                </a>
              )}
            </div>
          </div>

        </div>
      </article>
    </main>
  );
}
