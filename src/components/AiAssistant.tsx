"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageSquare, 
  ArrowUpRight, 
  ChevronRight, 
  Check, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const PRESET_QUERIES = [
  {
    category: "Services",
    label: "What services do you offer?",
    prompt: "What kind of services do you offer?",
    projectType: "Full-Stack Web & Android Development"
  },
  {
    category: "Web Apps",
    label: "Custom Web App / Next.js",
    prompt: "I need a custom Full-Stack Web Application (Next.js / MERN / SaaS). What is your process and timeline?",
    projectType: "Full-Stack Web Application"
  },
  {
    category: "Mobile",
    label: "Native Android App",
    prompt: "I want to build a native Android mobile app. What are the key deliverables and capabilities?",
    projectType: "Native Android Mobile App"
  },
  {
    category: "Marketing",
    label: "SEO & Digital Marketing",
    prompt: "Can you help improve our website's Google ranking, technical SEO, and digital presence?",
    projectType: "SEO & Digital Marketing"
  }
];

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "👋 Hi! I'm Miko, Khurshid's AI Assistant. Ask me anything about his services, project types, tech stacks, or click a quick prompt below to draft a customized WhatsApp inquiry!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState<string>('Custom Software Project');
  const [customRequirement, setCustomRequirement] = useState<string>('');
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string, projType?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    if (projType) {
      setSelectedProjectType(projType);
    }
    setCustomRequirement(text);

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const history = messages
        .concat(userMessage)
        .slice(-6)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });

      const data = await res.json();
      const reply = data.reply || "Thank you for asking! Khurshid can definitely build this for you. Click 'Send via WhatsApp' below to discuss requirements with him directly!";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "Thanks for your inquiry! You can connect with Khurshid right away on WhatsApp to talk about your project timeline and requirements.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getWhatsAppUrl = () => {
    const latestQuery = customRequirement || (messages.filter(m => m.sender === 'user').pop()?.text) || "Discussing a new project";
    const message = `Hello Khurshid,\n\nI visited your portfolio (khurshidalom.in) and would like to discuss a project:\n\n📌 *Project Type:* ${selectedProjectType}\n📝 *Query / Scope:* ${latestQuery}\n\nCould you please let me know your availability and estimated timeline? Thanks!`;
    return `https://wa.me/918453048325?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-card/80 border border-primary/30 shadow-lg shadow-primary/10 backdrop-blur-xl cursor-pointer text-xs font-semibold text-foreground hover:border-primary transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ask Miko AI</span>
            <Sparkles size={13} className="text-primary group-hover:rotate-12 transition-transform" />
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl shadow-primary/25 border border-primary-foreground/20 cursor-pointer overflow-hidden group focus:outline-hidden"
          aria-label="Open Miko AI Assistant"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-orange-400 opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            {isOpen ? <X size={24} /> : <Bot size={26} className="group-hover:scale-110 transition-transform" />}
          </div>
        </motion.button>
      </div>

      {/* Chat Window Modal & Full Blurred Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Ambient Blurred Backdrop behind the modal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-all cursor-pointer"
            />

            {/* Chat Window Modal */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] bg-background/60 border border-white/10 dark:border-white/15 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden text-foreground"
            >
            {/* Header */}
            <div className="p-4 px-5 border-b border-border/50 bg-background/40 backdrop-blur-md flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shadow-xs">
                  <Bot size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-sm text-foreground">Miko AI</h3>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 font-semibold">Online</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Khurshid&apos;s AI Assistant & inquiry creator</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages([{
                    id: 'welcome',
                    sender: 'ai',
                    text: "👋 Hi! I'm Miko AI. Ask me about services, tech stacks, or click below to craft a WhatsApp message!",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }])}
                  title="Reset conversation"
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Quick Preset Buttons Row */}
            <div className="px-4 py-2.5 bg-background/40 backdrop-blur-sm border-b border-border/40 shrink-0 overflow-x-auto no-scrollbar flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono font-bold text-muted-foreground shrink-0 flex items-center gap-1">
                <Sparkles size={11} className="text-primary" /> Ask:
              </span>
              {PRESET_QUERIES.map((q) => (
                <button
                  key={q.label}
                  onClick={() => handleSendMessage(q.prompt, q.projectType)}
                  className="shrink-0 text-xs px-2.5 py-1 rounded-lg bg-card/70 backdrop-blur-sm border border-border/70 hover:border-primary/50 text-foreground/80 hover:text-primary transition-all flex items-center gap-1 font-medium"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-xs whitespace-pre-wrap leading-relaxed text-[13px] ${
                      m.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-xs font-medium'
                        : 'bg-muted/60 border border-border/60 text-foreground rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-muted/40 border border-border/40 w-fit">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs text-muted-foreground">Thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* WhatsApp Preset Action Bar */}
            <div className="p-3 bg-muted/40 border-t border-border/60 shrink-0">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all group"
              >
                <div className="flex items-center gap-2">
                  <FaWhatsapp size={16} className="text-white" />
                  <span>Send inquiry to Khurshid via WhatsApp</span>
                </div>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-border/60 bg-card flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about project types, pricing, tech stack..."
                className="flex-1 bg-muted/50 border border-border/60 focus:border-primary/60 rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-all cursor-pointer"
                aria-label="Send query"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
