import { randomBytes, timingSafeEqual, createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import {
  caseStudies as seedCaseStudies,
  type CaseStudy,
} from "@/lib/data/case-studies";
import {
  allServices as seedServices,
  type Service,
} from "@/lib/data/services";
import { buildDefaultImageCatalog } from "@/lib/cms/media";

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

export type CmsData = {
  contact: CmsContact;
  images: CmsImageEntry[];
  jobs: CmsJob[];
  chats: ChatConversation[];
  caseStudies: CmsCaseStudy[];
  services: CmsService[];
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

function defaultData(): CmsData {
  return {
    contact: defaultContact,
    images: defaultImageCatalog,
    jobs: defaultJobs,
    chats: [],
    caseStudies: defaultCaseStudies,
    services: defaultServices,
  };
}

/** In-memory fallback for read-only hosts (Vercel serverless) */
let memoryStore: CmsData | null = null;

async function ensureStore(): Promise<CmsData> {
  if (memoryStore) return memoryStore;

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const raw = await fs.readFile(DATA_FILE, "utf8");
      const parsed = JSON.parse(raw) as Partial<CmsData>;
      memoryStore = {
        contact: parsed.contact ?? defaultContact,
        images: mergeImageCatalog(parsed.images),
        jobs: parsed.jobs?.length ? parsed.jobs : defaultJobs,
        chats: parsed.chats ?? [],
        caseStudies: parsed.caseStudies?.length
          ? parsed.caseStudies
          : defaultCaseStudies,
        services: parsed.services?.length ? parsed.services : defaultServices,
      };
      return memoryStore;
    } catch {
      memoryStore = defaultData();
      try {
        await fs.writeFile(DATA_FILE, JSON.stringify(memoryStore, null, 2), "utf8");
      } catch {
        /* read-only FS — keep memory only */
      }
      return memoryStore;
    }
  } catch {
    // Vercel / read-only: serve defaults from memory
    memoryStore = defaultData();
    return memoryStore;
  }
}

export async function readCms(): Promise<CmsData> {
  return ensureStore();
}

export async function writeCms(data: CmsData): Promise<void> {
  memoryStore = data;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch {
    /* persist in memory for this serverless instance only */
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
