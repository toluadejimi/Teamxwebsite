import { randomBytes, timingSafeEqual, createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import {
  caseStudies as seedCaseStudies,
  type CaseStudy,
} from "@/lib/data/case-studies";

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

export type CmsData = {
  contact: CmsContact;
  images: CmsImageEntry[];
  jobs: CmsJob[];
  chats: ChatConversation[];
  caseStudies: CmsCaseStudy[];
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

const defaultImageCatalog: Array<{ key: string; category: string; label: string; url: string }> = [
  { key: "brand.logo", category: "Brand", label: "Company logo", url: "" },
  { key: "hero.main", category: "Hero", label: "Hero primary", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80" },
  { key: "hero.secondary", category: "Hero", label: "Hero secondary", url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80" },
  { key: "company.office", category: "Company", label: "Office", url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80" },
  { key: "company.team", category: "Company", label: "Team", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" },
  { key: "company.meeting", category: "Company", label: "Meeting", url: "https://images.unsplash.com/photo-1600880292203-75762b2875ea?w=1200&q=80" },
  { key: "services.banking", category: "Services", label: "Banking", url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80" },
  { key: "services.education", category: "Services", label: "Education", url: "https://images.unsplash.com/photo-1523240795612-9a054b0de244?w=1200&q=80" },
  { key: "services.healthcare", category: "Services", label: "Healthcare", url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&q=80" },
  { key: "services.government", category: "Services", label: "Government", url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80" },
  { key: "services.ai", category: "Services", label: "AI Solutions", url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80" },
  { key: "services.cloud", category: "Services", label: "Cloud", url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80" },
  { key: "careers.culture", category: "Careers", label: "Culture", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80" },
  { key: "careers.remote", category: "Careers", label: "Remote work", url: "https://images.unsplash.com/photo-1588196749597-9ff07509d88e?w=1200&q=80" },
  { key: "portfolio.banking", category: "Portfolio", label: "Banking project", url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80" },
  { key: "portfolio.healthcare", category: "Portfolio", label: "Healthcare project", url: "https://images.unsplash.com/photo-1631217868264-e5b165ff0a0a?w=1200&q=80" },
  { key: "blog.default", category: "Blog", label: "Blog default", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" },
];

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

function mergeImageCatalog(existing?: CmsImageEntry[]): CmsImageEntry[] {
  const byKey = new Map((existing || []).map((img) => [img.key, img]));
  const merged = defaultImageCatalog.map((def) => {
    const cur = byKey.get(def.key);
    return cur ? { ...def, ...cur, key: def.key, category: def.category, label: def.label } : def;
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
