import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://khurshidalom.in'),
  title: {
    default: "Khurshid Alom | Full Stack Web & Mobile App Developer",
    template: "%s | Khurshid Alom"
  },
  description: "Official portfolio of Khurshid Alom, a professional Full Stack Developer specializing in React, Next.js, React Native, and modern digital architectures. Based in Assam, India.",
  keywords: ["Khurshid Alom", "Full Stack Developer", "React Developer", "Next.js Developer", "React Native Developer", "Web Developer in Assam", "Software Engineer", "DailyAxom", "Promptify"],
  authors: [{ name: "Khurshid Alom", url: "https://khurshidalom.in" }],
  creator: "Khurshid Alom",
  publisher: "Khurshid Alom",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://khurshidalom.in",
    title: "Khurshid Alom | Full Stack Developer",
    description: "Official portfolio of Khurshid Alom, a professional Full Stack Developer specializing in React, Next.js, and modern digital architectures.",
    siteName: "Khurshid Alom Portfolio",
    images: [{
      url: "/project-three.jpg", // Using a solid project image as default OG
      width: 1200,
      height: 630,
      alt: "Khurshid Alom Portfolio"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khurshid Alom | Full Stack Developer",
    description: "Official portfolio of Khurshid Alom, a professional Full Stack Developer specializing in React, Next.js, and modern digital architectures.",
    images: ["/project-three.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
