import React from 'react';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
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

async function getPosts(): Promise<Blog[]> {
  try {
    const res = await fetch('https://kode.devkayy.in/api/blogs.php', { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (error) {
    return [];
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const posts = await getPosts();
  const post = posts.find(b => b.slug === slug);

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
      url: `https://khurshidalom.in/blogs/${post.slug}`,
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
    alternates: {
      canonical: `https://khurshidalom.in/blogs/${post.slug}`,
    }
  };
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const posts = await getPosts();
  const post = posts.find(b => b.slug === slug);
  const relatedPosts = posts.filter(b => b.slug !== slug).slice(0, 2);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center bg-background relative z-10">
        <h1 className="font-display text-4xl font-bold mb-4 text-foreground">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
        <Link href="/blogs" className="text-foreground font-semibold hover:text-primary transition-colors underline underline-offset-4">
          Return to Blog
        </Link>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.content.substring(0, 160).replace(/<[^>]*>?/gm, ''),
    image: post.image_path ? `https://kode.devkayy.in${post.image_path}` : 'https://khurshidalom.in/project-three.jpg',
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.created_at,
    url: `https://khurshidalom.in/blogs/${post.slug}`,
  };

  return (
    <main className="min-h-screen pt-32 pb-20 bg-background relative z-10">
      <article className="mx-auto max-w-7xl px-6">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <BackButton label="Back to Writing" />
          
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-8 leading-tight">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-16 border-b border-border pb-8">
            <span className="font-medium text-foreground">By {post.author}</span>
            <span>•</span>
            <span className="font-medium">{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>

          {post.image_path && (
            <div className="w-full aspect-[2/1] relative mb-16 rounded-2xl overflow-hidden bg-muted/20 border border-border">
              {/* Using standard img tag for external domain without next.config.js remotePatterns strictness */}
              <img 
                src={`https://kode.devkayy.in${post.image_path}`} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div 
            className="prose prose-lg prose-invert prose-p:text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground max-w-none font-light leading-relaxed text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-24 pt-16 border-t border-border">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">Read Next</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map(related => (
                  <Link
                    key={related.id}
                    href={`/blogs/${related.slug}`}
                    className="group flex flex-col gap-3 p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-[0_8px_24px_rgba(249,115,22,0.1)] hover:-translate-y-1"
                  >
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                      {new Date(related.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight line-clamp-2">
                      {related.title}
                    </h3>
                    <div className="text-sm font-medium text-muted-foreground flex items-center gap-2 mt-auto pt-6">
                      <span className="text-foreground font-semibold">Read article</span>
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
