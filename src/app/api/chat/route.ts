import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Miko AI, Khurshid Alom's interactive AI Portfolio Assistant.
About Khurshid Alom:
- Full-Stack Web Developer & Native Android App Developer with 3+ years experience.
- Education: Master of Computer Applications (MCA) from Chandigarh University, BCA from Gauhati University.
- Core Stack: React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Java (Android SDK), Tailwind CSS.
- Founder of DailyAxom (EdTech platform & Android App) and founder of ProjuktiSoft (Software Development Studio).
- Other projects: Khoraghat Premier League (KPL Season 3 tournament platform kpl26.online), NexxSkill LMS, VN Templates, PromptGPT, BCA Notes, Presetify.
- Services Offered:
  1. Full-Stack Web Applications (Next.js, MERN, Custom Portals, CMS/LMS, SaaS)
  2. Native Android App Development (Java/Kotlin, Play Store publishing, UI/UX, push notifications)
  3. Digital Marketing & Search Engine Optimization (Technical SEO, speed optimization, search rankings)
  4. API & Backend Architecture (Secure REST/GraphQL, Payment gateways like Cashfree/Stripe)
- Communication: Friendly, concise, professional, helpful. Always assist clients in scoping requirements, estimating project types, timelines, and guiding them to contact Khurshid on WhatsApp or email (khurshid@projuktisoft.com).`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    // Try Pollinations AI free endpoint (OpenAI chat completion compatible, no api key needed)
    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-8)
    ];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const aiResponse = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: formattedMessages,
          model: 'openai',
          seed: 42,
          jsonMode: false
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (aiResponse.ok) {
        const text = await aiResponse.text();
        if (text && text.trim().length > 0) {
          return NextResponse.json({ reply: text.trim() });
        }
      }
    } catch {
      // Fallback below
    }

    // Smart Local Fallback Engine if external free endpoint is unreachable
    const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';

    let fallbackReply = "Hello! I'm Khurshid's AI Assistant. I can help you explore his web & mobile development services, estimate project requirements, or connect directly with Khurshid.";

    if (lastUserMsg.includes('service') || lastUserMsg.includes('what can you do') || lastUserMsg.includes('offer')) {
      fallbackReply = "Khurshid specializes in:\n• Full-Stack Web Applications (Next.js, React, Node.js, MERN)\n• Native Android Apps (Java/Kotlin, Play Store launch)\n• Custom CMS, LMS & Admin Panels\n• Digital Marketing & Technical SEO\n\nWhich type of project are you planning?";
    } else if (lastUserMsg.includes('web') || lastUserMsg.includes('website') || lastUserMsg.includes('frontend') || lastUserMsg.includes('next.js')) {
      fallbackReply = "Khurshid builds lightning-fast, SEO-optimized web applications with Next.js, React, TypeScript, and modern backend architectures. Would you like a custom dashboard, SaaS platform, or business website? You can also hit 'Send to WhatsApp' below to discuss scope directly!";
    } else if (lastUserMsg.includes('android') || lastUserMsg.includes('mobile') || lastUserMsg.includes('app')) {
      fallbackReply = "With over 3+ years in native Android development (Java/Android SDK), Khurshid creates high-performance mobile apps with polished UI, offline caching, API integrations, and Play Store publishing.";
    } else if (lastUserMsg.includes('price') || lastUserMsg.includes('cost') || lastUserMsg.includes('timeline') || lastUserMsg.includes('quote')) {
      fallbackReply = "Pricing and timelines depend on project scope, features, and integrations. The fastest way to get an accurate estimate is to share your requirements directly via WhatsApp using the preset button below!";
    } else if (lastUserMsg.includes('contact') || lastUserMsg.includes('hire') || lastUserMsg.includes('whatsapp')) {
      fallbackReply = "You can connect with Khurshid right away on WhatsApp using the button below or email him at khurshid@projuktisoft.com!";
    }

    return NextResponse.json({ reply: fallbackReply });
  } catch (error) {
    return NextResponse.json(
      { reply: "I'm here to help you scope your project! You can ask about services, tech stacks, or click 'Send to WhatsApp' below to talk to Khurshid directly." },
      { status: 200 }
    );
  }
}
