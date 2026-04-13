export const PERSONAL = {
  name: "Nymish",
  fullName: "Nymish Kashivishwanath",
  tagline: "Full-Stack Engineer",
  subtitle: "Building the future with AI and distributed systems",
  email: "reachnymish@gmail.com",
  location: "Bengaluru, India",
  github: "https://github.com/nymishkash",
  linkedin: "https://linkedin.com/in/nymish",
  website: "nymish.xyz",
};

export interface Experience {
  company: string;
  product?: string;
  role: string;
  period: string;
  location: string;
  type: string;
  bullets: string[];
  tech: string[];
  accent: string;
}

export const EXPERIENCE: Experience[] = [
  {
    company: "Wing Assistant",
    product: "M32 Labs",
    role: "Software Engineer",
    period: "May 2025 – Present",
    location: "Berkeley, CA",
    type: "Remote",
    bullets: [
      "Engineering hire #3 on an AI executive-assistant product; shipping full-stack features end-to-end on Node.js + React.",
      "Built a distributed message-queue ingestion pipeline (RabbitMQ quorum queues, publisher confirms, Redis idempotent dedupe, DLQ + retries) with zero dropped events under load.",
      "Architected a multi-tier cache (in-memory → Redis → source API) with Redis Pub/Sub cross-instance invalidation, cutting p95 read latency from >10s to <500ms.",
      "Built the AI generation pipeline: GPT-4 drafts conditioned on user writing style, RAG over Pinecone, and CRM/calendar context injection; migrated LLM provider for ~20x cost reduction.",
      "Delivered full Microsoft Graph parity (OAuth, webhooks, refresh-token worker) for an originally Google-only product.",
      "Built an SSE real-time sync layer over Redis Pub/Sub with reconnect, event dedup, and mutation cooldowns.",
    ],
    tech: ["Node.js", "React", "RabbitMQ", "Redis", "PostgreSQL", "GPT-4", "Pinecone", "Microsoft Graph"],
    accent: "#6366f1",
  },
  {
    company: "Dukaan",
    product: "bot9.ai",
    role: "Full Stack Engineer",
    period: "Feb 2025 – Apr 2025",
    location: "Bengaluru, India",
    type: "Onsite",
    bullets: [
      "Core team member (6 engineers) on bot9.ai, a GenAI customer-support suite; led engineering and independently owned enterprise client relationships.",
      "Shipped GenAI automation flows that resolved 80–85% of inbound support queries with no human handoff.",
      "Cut LLM infrastructure cost 20x by migrating providers live with zero downtime.",
      "Replaced WebSockets with SSE, improving streaming reliability and concurrent-session scalability.",
    ],
    tech: ["Next.js", "Express", "OpenAI", "SSE", "TypeScript"],
    accent: "#a855f7",
  },
  {
    company: "Dukaan",
    role: "SDE Intern",
    period: "Aug 2024 – Jan 2025",
    location: "Bengaluru, India",
    type: "Onsite",
    bullets: [
      "Shipped production features across Next.js, Express, and OpenAI APIs; chatbot work fed directly into the full-time role.",
    ],
    tech: ["Next.js", "Express", "OpenAI"],
    accent: "#a855f7",
  },
];

export interface Project {
  name: string;
  description: string;
  longDescription?: string;
  tech: string[];
  github?: string;
  live?: string;
  accent: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    name: "WageWizard",
    description: "AI Payroll Assistant",
    longDescription:
      "AI payroll assistant handling HR workflows — employees, leave, wages — via chat and voice. Built with Node.js + Next.js.",
    tech: ["Node.js", "Next.js", "OpenAI", "TypeScript"],
    github: "https://github.com/nymishkash/wagewizard-frontend",
    accent: "#6366f1",
    featured: true,
  },
  {
    name: "bot99",
    description: "Intelligent Bot Platform",
    longDescription: "A configurable bot platform built with JavaScript.",
    tech: ["JavaScript", "Node.js"],
    github: "https://github.com/nymishkash/bot99",
    accent: "#a855f7",
  },
  {
    name: "Renderground",
    description: "Full-Stack Rendering Service",
    longDescription: "A full-stack rendering application with separate frontend and backend services.",
    tech: ["JavaScript", "React", "Node.js"],
    github: "https://github.com/nymishkash/renderground-frontend",
    accent: "#06b6d4",
  },
  {
    name: "CLI Image Editor",
    description: "Command-Line Image Processor",
    longDescription: "A command-line image editor built in Java for efficient batch image processing.",
    tech: ["Java", "CLI"],
    github: "https://github.com/nymishkash/cli-image-editor-java",
    accent: "#f59e0b",
  },
];

export const SKILLS = {
  Languages: ["TypeScript", "JavaScript", "Python", "SQL"],
  Backend: ["Node.js", "Express", "RabbitMQ", "Redis", "PostgreSQL", "BullMQ", "Docker", "PM2"],
  Frontend: ["React 19", "Next.js", "TanStack Query", "Zustand", "Tailwind CSS", "Vite"],
  "AI / Data": ["OpenAI (GPT-4)", "Pinecone", "RAG", "Function Calling"],
  Integrations: ["Gmail API", "Google Cloud Pub/Sub", "Microsoft Graph", "OAuth2", "AWS S3"],
};

export const EDUCATION = [
  {
    school: "Scaler School of Technology",
    degree: "Integrated BS & MS in Computer Science",
    period: "2023 – 2027",
  },
  {
    school: "BITS Pilani",
    degree: "B.Sc. (Hons.) Computer Science",
    period: "2023 – 2027",
  },
];

export const ACHIEVEMENTS = [
  "Infosys Catch Them Young Scholar (2019)",
  "Alumnus, Junior Science Academy, New York Academy of Sciences",
];

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
