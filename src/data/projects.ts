export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stacks: string;
  live_url: string;
  github_url: string;
  slug: string;
  image_path: string;
}

export const staticProjects: Project[] = [
  {
    id: 109,
    title: 'Khoraghat Premier League (KPL) — Season 3',
    description: "Official digital tournament portal for Assam's premier hard tennis ball cricket championship featuring franchise teams, registered player rosters, sponsor showcases, and live match updates.",
    tech_stacks: 'Web Application, Next.js, Responsive Design, Sports Portal, UI/UX',
    live_url: 'http://kpl26.online/',
    github_url: '',
    slug: 'kpl26',
    image_path: 'https://kpl26.online/kpl-logo.jpg'
  },
  {
    id: 108,
    title: 'ProjuktiSoft - Software Development Studio',
    description: 'Independent software development studio specializing in modern full-stack web applications, MERN stack engineering, EdTech platforms (DailyAxom), custom digital products, and client business tooling.',
    tech_stacks: 'Full Stack, MERN Stack, Next.js, TypeScript, Studio & Client Solutions',
    live_url: 'https://projuktisoft.com/',
    github_url: 'https://github.com/bloggerkhurshid/projuktisoft',
    slug: 'projuktisoft',
    image_path: 'https://projuktisoft.com/logo.svg'
  },
  {
    id: 106,
    title: 'NexxSkill - Software Academy & LMS',
    description: 'Enterprise System z Mainframe & Software Academy platform featuring an administrative control panel, seamless Cashfree payment gateway integration, course enrollment, and student management.',
    tech_stacks: 'Full Stack, Admin Panel, Cashfree Payment Gateway, React, Node.js',
    live_url: 'https://nexxskill.com/',
    github_url: '',
    slug: 'nexxskill',
    image_path: 'https://nexxskill.com/assets/logo.png'
  },
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
