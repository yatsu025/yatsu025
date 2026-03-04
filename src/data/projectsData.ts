export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  type: 'mini' | 'major';
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  problem?: string;
  solution?: string;
  myWork?: string;
  impact?: string;
  isComingSoon?: boolean;
}

export const miniProjects: Project[] = [
  {
    id: "jivan-ai",
    title: "Jivan AI",
    description: "A Spiritual AI Companion connecting with your faith through AI",
    techStack: ["React", "AI", "Tailwind CSS", "Gemini API"],
    type: 'mini',
    imageUrl: "/project-screeenshot/jivan-ai.png",
    liveUrl: "https://jivan-ai.netlify.app/",
    githubUrl: "#",
    problem: "Many people feel disconnected from their spiritual roots and lack a constant, accessible companion for religious guidance and mental peace.",
    solution: "Developed an AI-powered spiritual companion that provides personalized guidance, spiritual quotes, and meditative support based on ancient wisdom and modern AI.",
    myWork: "Designed the UI/UX, integrated Gemini API for spiritual conversations, and implemented the frontend using React and Tailwind CSS.",
  },
  {
    id: "2x-fire-cup",
    title: "2X Fire Cup",
    description: "Free Fire Tournament Registration Portal with payment integration",
    techStack: ["React", "Tailwind CSS", "Vercel", "Firebase"],
    type: 'mini',
    imageUrl: "/project-screeenshot/2x-fire-cup.png",
    liveUrl: "https://2x-fire-cup.vercel.app/",
    githubUrl: "#",
    problem: "Organizing small-scale gaming tournaments often involves messy manual registrations and tracking payments across various platforms.",
    solution: "Created a streamlined registration portal that handles team details, player types, and payment verification via transaction IDs in one place.",
    myWork: "Developed the registration flow, implemented payment UI, and managed the deployment on Vercel.",
  },
  {
    id: "pkn",
    title: "Prayagraj ka Novel",
    description: "General Knowledge Competition platform for students",
    techStack: ["React", "Tailwind CSS", "Vercel", "Node.js"],
    type: 'mini',
    imageUrl: "/project-screeenshot/pkn.png",
    liveUrl: "https://pkn-at.vercel.app/",
    githubUrl: "#",
    problem: "Students in Prayagraj lacked a centralized digital platform to participate in local GK competitions and track their performance over the years.",
    solution: "Built a comprehensive platform for the 'Prayagraj ka Novel' competition, allowing 500+ students to register and learn about historical editions.",
    myWork: "Built the multi-page landing site, implemented the competition timeline, and designed the registration interface.",
  },
];

export const majorProjects: Project[] = [
  {
    id: "coming-soon-1",
    title: "Major Project 1",
    description: "Exciting new project in development",
    techStack: ["React", "Next.js", "AI", "TypeScript"],
    type: 'major',
    isComingSoon: true,
  },
  {
    id: "coming-soon-2",
    title: "Major Project 2",
    description: "Exciting new project in development",
    techStack: ["Python", "Django", "PostgreSQL", "AWS"],
    type: 'major',
    isComingSoon: true,
  },
];

export const allProjects = [...miniProjects, ...majorProjects];
