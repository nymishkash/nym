export const PERSONAL = {
  name: "Nymish",
  fullName: "Nymish Kashivishwanath",
  tagline: "Forward Deployed Engineer",
  subtitle: "Building AI agents - and the workflows that run them at scale.",
  email: "reachnymish@gmail.com",
  location: "Bengaluru, India",
  github: "https://github.com/nymishkash",
  linkedin: "https://linkedin.com/in/nymish",
  website: "nymi.sh",
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
    company: "AiStudio",
    role: "Forward Deployed Engineer",
    period: "Jun 2026 – Present",
    location: "Dubai, UAE",
    type: "Remote",
    bullets: [
      "Work directly with private-equity funds and their portfolio companies — building internal tools, modernizing legacy systems, and streamlining the workflows they run day to day.",
    ],
    tech: ["TypeScript", "Node.js", "React", "LLMs", "RAG", "Private Markets"],
    accent: "#047857",
  },
  {
    company: "Wing Assistant",
    product: "M32 Labs",
    role: "Software Engineer",
    period: "May 2025 – Jun 2026",
    location: "Berkeley, CA",
    type: "Remote",
    bullets: [
      "Engineering hire #3 on an AI executive-assistant product; shipped full-stack features end-to-end on Node.js + React.",
      "Built a distributed message-queue ingestion pipeline (RabbitMQ quorum queues, publisher confirms, Redis idempotent dedupe, DLQ + retries) with zero dropped events under load.",
      "Architected a multi-tier cache (in-memory → Redis → source API) with Redis Pub/Sub cross-instance invalidation, cutting p95 read latency from >10s to <500ms.",
      "Built the AI generation pipeline: GPT-4 drafts conditioned on user writing style, RAG over Pinecone, and CRM/calendar context injection; migrated LLM provider for ~20x cost reduction.",
      "Delivered full Microsoft Graph parity (OAuth, webhooks, refresh-token worker) for an originally Google-only product.",
      "Built an SSE real-time sync layer over Redis Pub/Sub with reconnect, event dedup, and mutation cooldowns.",
    ],
    tech: ["Node.js", "React", "RabbitMQ", "Redis", "PostgreSQL", "GPT-4", "Pinecone", "Microsoft Graph"],
    accent: "#3730a3",
  },
  {
    company: "Dukaan",
    product: "bot9.ai",
    role: "Full Stack Engineer (from SDE Intern)",
    period: "Aug 2024 – Apr 2025",
    location: "Bengaluru, India",
    type: "Onsite",
    bullets: [
      "Core team member (6 engineers) on bot9.ai, a GenAI customer-support suite; led engineering and independently owned enterprise client relationships.",
      "Shipped GenAI automation flows that resolved 80–85% of inbound support queries with no human handoff.",
      "Cut LLM infrastructure cost 20x by migrating providers live with zero downtime.",
      "Replaced WebSockets with SSE, improving streaming reliability and concurrent-session scalability.",
    ],
    tech: ["Next.js", "Express", "OpenAI", "SSE", "TypeScript"],
    accent: "#6b21a8",
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
    name: "regex-builder",
    description: "RL env for regex from NL",
    longDescription:
      "An RL environment where agents learn to translate plain-English descriptions into working regex. Built for the Meta × Scaler OpenEnv hackathon.",
    tech: ["Python", "PyTorch", "Docker", "RL"],
    github: "https://github.com/nymishkash/regex-builder-openenv",
    accent: "#3730a3",
    featured: true,
  },
  {
    name: "wagewizard",
    description: "AI payroll assistant",
    longDescription:
      "AI payroll assistant handling HR workflows - employees, leave, wages - via chat and voice. Node.js + Next.js + OpenAI.",
    tech: ["Node.js", "Next.js", "OpenAI", "TypeScript"],
    github: "https://github.com/nymishkash/wagewizard-frontend",
    accent: "#6b21a8",
    featured: true,
  },
  {
    name: "smartcloud",
    description: "Secrets manager + SDK",
    longDescription:
      "Secrets-manager platform with AES-256-GCM encryption, row-level security, and audit logs. Ships with a zero-dep TypeScript SDK and CLI.",
    tech: ["Next.js", "Supabase", "TypeScript"],
    github: "https://github.com/nymishkash/smartcloud",
    accent: "#0e7490",
  },
  {
    name: "renderground",
    description: "React canvas drawing tool",
    longDescription:
      "React canvas app for shape composition - rectangles, text, snap grid - with a Node/Express backend that persists and exports canvases as HTML.",
    tech: ["React", "Node.js", "Express"],
    github: "https://github.com/nymishkash/renderground-frontend",
    accent: "#b45309",
  },
  {
    name: "bot99",
    description: "Hotel booking chatbot",
    longDescription:
      "Hotel-booking chatbot on top of Google Gemini - turns natural-language requests into structured room reservations. Express + React.",
    tech: ["Express", "React", "Gemini"],
    github: "https://github.com/nymishkash/bot99",
    accent: "#9d174d",
  },
  {
    name: "python-web-scraper",
    description: "DevOps CI/CD pipeline",
    longDescription:
      "Python scraper wrapped in a security-first CI and Kubernetes CD pipeline. SCA, SAST, DAST, and promotion-gated delivery end-to-end.",
    tech: ["Python", "Docker", "Kubernetes"],
    github: "https://github.com/nymishkash/python-web-scraper",
    accent: "#065f46",
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
