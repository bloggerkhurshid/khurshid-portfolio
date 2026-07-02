import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Khurshid Alom',
  description: 'Thoughts, tutorials, and deep dives into web development, design, and software architecture by Khurshid Alom.',
  alternates: {
    canonical: 'https://khurshidalom.in/blogs',
  },
  openGraph: {
    title: 'Blog | Khurshid Alom',
    description: 'Thoughts, tutorials, and deep dives into web development, design, and software architecture.',
    url: 'https://khurshidalom.in/blogs',
  }
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
