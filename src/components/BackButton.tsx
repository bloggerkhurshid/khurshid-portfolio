"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="inline-flex items-center gap-2 text-muted-foreground font-medium hover:text-foreground transition-colors mb-12 uppercase tracking-widest text-xs"
    >
      <ArrowLeft size={16} /> {label}
    </button>
  );
}
