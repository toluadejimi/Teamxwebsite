import {
  caseStudies as seedCaseStudies,
  type CaseStudy,
} from "@/lib/data/case-studies";
import {
  allServices as seedServices,
  type Service,
} from "@/lib/data/services";
import {
  portfolioProjects as seedPortfolio,
  type PortfolioProject,
} from "@/lib/data/portfolio";
import { buildDefaultImageCatalog } from "@/lib/cms/media";
import {
  getStorageBackend,
  hasRedis,
  loadPersistedJson,
  savePersistedJson,
  storageStatusMessage,
} from "@/lib/cms/persist";
import { promises as fs } from "fs";
import path from "path";
import { randomBytes, timingSafeEqual, createHash } from "crypto";

export type CmsJob = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship";
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  salary?: string;
  postedDate: string;
  active: boolean;
};

export type CmsOffice = {
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  isHeadquarters?: boolean;
};

export type CmsContact = {
  companyName: string;
  email: string;
  phone: string;
  whatsapp: string;
  supportEmail: string;
  offices: CmsOffice[];
};

export type CmsImageEntry = {
  key: string;
  category: string;
  label: string;
  url: string;
};

export type ChatMessage = {
  id: string;
  role: "visitor" | "agent" | "bot";
  text: string;
  createdAt: string;
};

export type ChatConversation = {
  id: string;
  visitorName: string;
  visitorEmail: string;
  status: "open" | "closed";
  unreadAdmin: number;
  unreadVisitor: number;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
};

export type CmsCaseStudy = CaseStudy & {
  id: string;
  active: boolean;
};

export type CmsService = Service & {
  id: string;
  active: boolean;
};

export type CmsPortfolio = PortfolioProject & {
  id: string;
  active: boolean;
};

export type LeadStatus = "new" | "read" | "archived";

export type CmsEnquiry = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
};

export type CmsDemoRequest = {
  id: string;
  fullName: string;
  email: string;
  company: string;
  jobTitle?: string;
  topic: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: LeadStatus;
  createdAt: string;
};

export type CmsQuoteRequest = {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  timeline: string;
  teamSize?: string;
  description: string;
  status: LeadStatus;
  createdAt: string;
};

export type CmsJobApplication = {
  id: string;
  name: string;
  email: string;
  position: string;
  portfolio?: string;
  coverLetter: string;
  status: LeadStatus;
  createdAt: string;
};

export type CmsData = {
  contact: CmsContact;
  images: CmsImageEntry[];
  jobs: CmsJob[];
  chats: ChatConversation[];
  caseStudies: CmsCaseStudy[];
  services: CmsService[];
  portfolio: CmsPortfolio[];
  enquiries: CmsEnquiry[];
  demoRequests: CmsDemoRequest[];
  quoteRequests: CmsQuoteRequest[];
  jobApplications: CmsJobApplication[];
};

const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "teamx-data")
  : path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "cms.json");
const SESSION_COOKIE = "teamx_admin_session";

const defaultContact: CmsContact = {
  companyName: "Team X Technologies Ltd",
  email: "hello@teamxtech.com",
  phone: "+234 1 234 5678",
  whatsapp: "2348012345678",
  supportEmail: "support@teamxtech.com",
  offices: [
    {
      city: "Lagos",
      country: "Nigeria",
      address: "12 Admiralty Way, Lekki Phase 1, Lagos",
      phone: "+234 1 234 5678",
      email: "lagos@teamxtech.com",
      isHeadquarters: true,
    },
    {
      city: "Abuja",
      country: "Nigeria",
      address: "Plot 42, Central Business District, Abuja",
      phone: "+234 9 461 2000",
      email: "abuja@teamxtech.com",
    },
  ],
};

const defaultImageCatalog: CmsImageEntry[] = buildDefaultImageCatalog();

const defaultJobs: CmsJob[] = [
  {
    id: "job_fullstack",
    slug: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Lagos, Nigeria / Remote",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Join our engineering team building enterprise applications for banking, healthcare, and government clients across Nigeria.",
    responsibilities: [
      "Design and implement scalable backend and frontend applications",
      "Lead technical decisions within project squads",
      "Conduct code reviews and mentor engineers",
      "Collaborate with clients on requirements",
    ],
    requirements: [
      "5+ years professional software development experience",
      "Strong TypeScript/JavaScript and React/Next.js",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
    ],
    niceToHave: ["Financial services domain experience"],
    salary: "₦8M - ₦15M annually",
    postedDate: new Date().toISOString().slice(0, 10),
    active: true,
  },
  {
    id: "job_flutter",
    slug: "flutter-mobile-developer",
    title: "Flutter Mobile Developer",
    department: "Engineering",
    location: "Lagos, Nigeria / Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Build performant mobile applications for enterprise clients using Flutter.",
    responsibilities: [
      "Develop cross-platform mobile apps with Flutter",
      "Integrate REST APIs and offline-first patterns",
      "Ship to App Store and Google Play",
    ],
    requirements: [
      "3+ years mobile development with Flutter",
      "Strong UI/UX implementation skills",
    ],
    niceToHave: ["Native iOS or Android experience"],
    salary: "₦6M - ₦12M annually",
    postedDate: new Date().toISOString().slice(0, 10),
    active: true,
  },
  {
    id: "job_internship",
    slug: "graduate-software-intern",
    title: "Graduate Software Intern",
    department: "Engineering",
    location: "Lagos, Nigeria",
    type: "Internship",
    experience: "0–1 years",
    description:
      "6-month paid internship for graduates passionate about enterprise software.",
    responsibilities: [
      "Contribute to real client projects under mentorship",
      "Write tests and documentation",
      "Participate in code reviews and standups",
    ],
    requirements: [
      "Recent CS/Engineering graduate or final-year student",
      "Solid fundamentals in any modern language",
    ],
    niceToHave: ["Personal projects or open-source contributions"],
    salary: "Competitive stipend",
    postedDate: new Date().toISOString().slice(0, 10),
    active: true,
  },
];

const defaultCaseStudies: CmsCaseStudy[] = seedCaseStudies.map((study) => ({
  ...study,
  id: `cs_${study.slug}`,
  active: true,
}));

const defaultServices: CmsService[] = seedServices.map((service) => ({
  ...service,
  id: `svc_${service.slug}`,
  active: true,
}));

const defaultPortfolio: CmsPortfolio[] = seedPortfolio.map((project) => ({
  ...project,
  id: `pf_${project.slug}`,
  active: true,
}));

function mergeImageCatalog(existing?: CmsImageEntry[]): CmsImageEntry[] {
  const byKey = new Map((existing || []).map((img) => [img.key, img]));
  const merged = defaultImageCatalog.map((def) => {
    const cur = byKey.get(def.key);
    return cur
      ? { ...def, url: cur.url || def.url, label: def.label, category: def.category }
      : def;
  });
  for (const img of existing || []) {
    if (!merged.some((m) => m.key === img.key)) merged.push(img);
  }
  return merged;
}

function normalizeCms(parsed: Partial<CmsData>): CmsData {
  return {
    contact: parsed.contact ?? defaultContact,
    images: mergeImageCatalog(parsed.images),
    jobs: parsed.jobs?.length ? parsed.jobs : defaultJobs,
    chats: parsed.chats ?? [],
    caseStudies: parsed.caseStudies?.length
      ? parsed.caseStudies
      : defaultCaseStudies,
    services: parsed.services?.length ? parsed.services : defaultServices,
    portfolio: parsed.portfolio?.length ? parsed.portfolio : defaultPortfolio,
    enquiries: parsed.enquiries ?? [],
    demoRequests: parsed.demoRequests ?? [],
    quoteRequests: parsed.quoteRequests ?? [],
    jobApplications: parsed.jobApplications ?? [],
  };
}

function defaultData(): CmsData {
  return {
    contact: defaultContact,
    images: defaultImageCatalog,
    jobs: defaultJobs,
    chats: [],
    caseStudies: defaultCaseStudies,
    services: defaultServices,
    portfolio: defaultPortfolio,
    enquiries: [],
    demoRequests: [],
    quoteRequests: [],
    jobApplications: [],
  };
}

/** In-memory cache for the current serverless instance */
let memoryStore: CmsData | null = null;

async function loadFromFile(): Promise<CmsData> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const raw = await fs.readFile(DATA_FILE, "utf8");
      return normalizeCms(JSON.parse(raw) as Partial<CmsData>);
    } catch {
      const data = defaultData();
      try {
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
      } catch {
        /* ignore */
      }
      return data;
    }
  } catch {
    return defaultData();
  }
}

async function ensureStore(): Promise<CmsData> {
  // Durable Redis path — always re-read so every Vercel instance sees latest edits
  if (hasRedis()) {
    try {
      const raw = await loadPersistedJson();
      if (raw) {
        memoryStore = normalizeCms(JSON.parse(raw) as Partial<CmsData>);
        return memoryStore;
      }
      memoryStore = defaultData();
      await savePersistedJson(JSON.stringify(memoryStore));
      return memoryStore;
    } catch (err) {
      console.error("[cms] Redis load failed, falling back", err);
      if (memoryStore) return memoryStore;
      memoryStore = defaultData();
      return memoryStore;
    }
  }

  if (memoryStore) return memoryStore;

  if (getStorageBackend() === "memory") {
    memoryStore = defaultData();
    return memoryStore;
  }

  memoryStore = await loadFromFile();
  return memoryStore;
}

export async function readCms(): Promise<CmsData> {
  return ensureStore();
}

export async function writeCms(data: CmsData): Promise<void> {
  memoryStore = data;
  const json = JSON.stringify(data);

  if (hasRedis()) {
    try {
      await savePersistedJson(json);
      return;
    } catch (err) {
      console.error("[cms] Redis save failed", err);
      throw err;
    }
  }

  if (getStorageBackend() === "memory") {
    /* Vercel without Redis — cannot persist across instances */
    return;
  }

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch {
    /* ignore local write errors */
  }
}

export async function updateCms(
  updater: (data: CmsData) => CmsData | Promise<CmsData>
): Promise<CmsData> {
  const current = await readCms();
  const next = await updater(structuredClone(current));
  await writeCms(next);
  return next;
}

export function getCmsStorageInfo() {
  return {
    backend: getStorageBackend(),
    persistent: getStorageBackend() !== "memory",
    message: storageStatusMessage(),
  };
}

export { storageStatusMessage };

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "TeamX@Admin2024";
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function createSessionToken(): string {
  return randomBytes(32).toString("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export { SESSION_COOKIE };

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function uid(prefix: string): string {
  return `${prefix}_${randomBytes(6).toString("hex")}`;
}
