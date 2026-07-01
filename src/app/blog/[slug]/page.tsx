import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';

interface Blog {
  id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  image_path: string;
  created_at: string;
}

type Props = {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch('https://kode.devkayy.in/api/blogs.php', { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data)) {
      return data.find(b => b.slug === slug) || null;
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
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Khurshid Alom',
    };
  }

  // Strip HTML for description
  const plainTextContent = post.content
    .replace(/<[^>]*>?/gm, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .substring(0, 160) + '...';
  const imageUrl = post.image_path ? `https://kode.devkayy.in${post.image_path}` : '/project-three.jpg';

  return {
    title: `${post.title} | Khurshid Alom Blog`,
    description: plainTextContent,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: plainTextContent,
      url: `https://khurshidalom.in/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.created_at,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: plainTextContent,
      images: [imageUrl],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center bg-background">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted mb-8">The blog post you're looking for doesn't exist.</p>
        <Link href="/blog" className="text-white hover:underline underline-offset-4">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-background">
      <article className="mx-auto max-w-3xl">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link href="/blog" className="inline-flex items-center gap-2 text-muted font-medium hover:text-foreground transition-colors mb-12">
            <ArrowLeft size={20} /> Back to Writing
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-muted mb-16 border-b border-border pb-8">
            <span className="font-medium text-gray-300">By {post.author}</span>
            <span>•</span>
            <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>

          {post.image_path && (
            <div className="w-full aspect-[2/1] relative mb-16 rounded-xl overflow-hidden bg-zinc-900">
              {/* Using standard img tag for external domain without next.config.js remotePatterns strictness */}
              <img 
                src={`https://kode.devkayy.in${post.image_path}`} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div 
            className="prose prose-invert prose-lg max-w-none text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </main>
  );
}
