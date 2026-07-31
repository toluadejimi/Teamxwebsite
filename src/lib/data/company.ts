import { images } from "./images";

export interface Leader {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

export interface Award {
  title: string;
  organization: string;
  year: number;
  description: string;
}

export interface Office {
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  isHeadquarters?: boolean;
}

export interface CompanyStat {
  label: string;
  value: string;
  suffix?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

export interface Partner {
  name: string;
  logo?: string;
  category: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PricingTier {
  name: string;
  description: string;
  priceRange: string;
  features: string[];
  idealFor: string;
}

export interface Industry {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Technology {
  name: string;
  category: string;
  icon?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUs {
  title: string;
  description: string;
  icon: string;
}

export const company = {
  name: "Team X Technologies Ltd",
  tagline: "Building Digital Solutions That Transform Businesses",
  industry: "Premium enterprise software development",
  founded: 2013,
  website: "https://teamxtech.com",
  email: "hello@teamxtech.com",
  phone: "+234 1 234 5678",
};

export const mission = {
  title: "Our Mission",
  statement:
    "To empower organizations across Africa and beyond with enterprise-grade software that drives operational excellence, enables innovation, and creates lasting competitive advantage.",
};

export const vision = {
  title: "Our Vision",
  statement:
    "To be the most trusted technology partner for enterprises seeking digital transformation, recognized for engineering excellence, domain expertise, and measurable client outcomes.",
};

export const values = [
  {
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in everything we deliver—from code quality to client communication.",
    icon: "Award",
  },
  {
    title: "Integrity",
    description:
      "We build trust through transparency, honesty, and doing what's right even when it's difficult.",
    icon: "Shield",
  },
  {
    title: "Innovation",
    description:
      "We continuously explore new technologies and approaches to solve complex problems creatively.",
    icon: "Lightbulb",
  },
  {
    title: "Partnership",
    description:
      "We succeed when our clients succeed. We embed as true partners, not vendors.",
    icon: "Handshake",
  },
  {
    title: "Impact",
    description:
      "We measure success by the tangible outcomes we create for organizations and communities.",
    icon: "Target",
  },
];

export const leadership: Leader[] = [
  {
    name: "Chidi Okonkwo",
    role: "Chief Executive Officer & Co-Founder",
    bio: "Chidi co-founded Team X in 2013 with a vision to bring world-class software engineering to African enterprises. With 20+ years in technology leadership, he previously led digital transformation initiatives at major financial institutions. He holds an MBA from Lagos Business School and serves on the board of the Nigeria Software Development Initiative.",
    image: images.company.leadership,
    linkedin: "https://linkedin.com/in/chidi-okonkwo",
  },
  {
    name: "Emeka Nwosu",
    role: "Chief Technology Officer & Co-Founder",
    bio: "Emeka architected Team X's engineering practices and technical standards. A former principal engineer at global consulting firms, he specializes in core banking, microservices architecture, and cloud-native systems. He speaks regularly at DevConf Africa and contributes to open-source fintech projects.",
    image: images.testimonials.executive,
    linkedin: "https://linkedin.com/in/emeka-nwosu",
  },
  {
    name: "Fatima Abdullahi",
    role: "Chief Operating Officer",
    bio: "Fatima oversees delivery operations, ensuring projects meet quality standards and client expectations. With a background in management consulting and software delivery, she implemented the agile practices that enable Team X's consistent on-time delivery record. She holds PMP and SAFe certifications.",
    image: images.testimonials.techLead,
    linkedin: "https://linkedin.com/in/fatima-abdullahi",
  },
  {
    name: "James Osei",
    role: "Chief Revenue Officer",
    bio: "James leads sales, partnerships, and client relationships across Africa and Europe. He brings 15 years of enterprise software sales experience, having previously built regional practices for global technology vendors. His focus on consultative selling ensures clients receive solutions aligned with their strategic objectives.",
    image: images.testimonials.product,
    linkedin: "https://linkedin.com/in/james-osei",
  },
];

export const timeline: TimelineEvent[] = [
  {
    year: 2013,
    title: "Company Founded",
    description:
      "Team X Technologies established in Lagos with a team of 5 engineers focused on custom software development.",
  },
  {
    year: 2015,
    title: "First Banking Client",
    description:
      "Delivered core banking module for regional bank, establishing financial services expertise.",
  },
  {
    year: 2017,
    title: "Healthcare Practice Launch",
    description:
      "Expanded into healthcare with hospital management system for multi-facility provider.",
  },
  {
    year: 2019,
    title: "100 Employees Milestone",
    description:
      "Team grew to 100+ professionals with offices in Lagos and Abuja.",
  },
  {
    year: 2020,
    title: "Government Digital Services",
    description:
      "Partnered with state government on citizen services portal serving 1M+ residents.",
  },
  {
    year: 2022,
    title: "AI Practice Established",
    description:
      "Launched dedicated AI/ML practice delivering chatbots and intelligent automation.",
  },
  {
    year: 2024,
    title: "200 Projects Delivered",
    description:
      "Reached milestone of 200 enterprise projects across 12 industry verticals.",
  },
  {
    year: 2025,
    title: "Cloud Partner Certifications",
    description:
      "Achieved AWS Advanced Consulting Partner and Microsoft Gold Partner status.",
  },
];

export const awards: Award[] = [
  {
    title: "Best FinTech Solution Provider",
    organization: "Africa FinTech Awards",
    year: 2024,
    description:
      "Recognized for core banking modernization project delivering 40% operational cost reduction.",
  },
  {
    title: "Top 50 Tech Companies in Africa",
    organization: "Africa Tech Summit",
    year: 2024,
    description:
      "Named among most impactful technology companies driving digital transformation.",
  },
  {
    title: "Excellence in Healthcare IT",
    organization: "Healthcare Innovation Awards",
    year: 2023,
    description:
      "Awarded for hospital management system deployment across 12-facility network.",
  },
  {
    title: "AWS Partner of the Year",
    organization: "Amazon Web Services",
    year: 2023,
    description:
      "Recognized for cloud migration expertise in West Africa region.",
  },
  {
    title: "Best E-Government Implementation",
    organization: "Smart Government Summit",
    year: 2022,
    description:
      "Honored for Lagos State citizen services portal digital transformation.",
  },
];

export const offices: Office[] = [
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
];

export const stats: CompanyStat[] = [
  { label: "Projects Completed", value: "250", suffix: "+" },
  { label: "Enterprise Clients", value: "150", suffix: "+" },
  { label: "Countries Served", value: "25", suffix: "+" },
  { label: "System Uptime", value: "99.9", suffix: "%" },
  { label: "Years Experience", value: "10", suffix: "+" },
  { label: "Transactions Processed", value: "500", suffix: "M+" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Team X transformed our core banking operations. Their methodical approach to migration gave us confidence during the most critical cutover of our 40-year history.",
    author: "Adewale Okonkwo",
    role: "Chief Technology Officer",
    company: "Unity Bank Plc",
    image: images.testimonials.executive,
  },
  {
    quote:
      "The Lagos citizen portal has fundamentally changed how residents interact with government. Team X understood the complexity of government processes and delivered brilliantly.",
    author: "Dr. Olumide Akintola",
    role: "Commissioner for Science & Technology",
    company: "Lagos State Government",
    image: images.testimonials.product,
  },
  {
    quote:
      "Their healthcare team spent weeks in our hospitals understanding clinical workflows. The HMS they built is trusted by our doctors and nurses daily.",
    author: "Dr. Chioma Eze",
    role: "Chief Medical Officer",
    company: "MedPlus Healthcare Group",
    image: images.testimonials.techLead,
  },
  {
    quote:
      "We've worked with Team X for three projects now. Their consistency, quality, and genuine partnership approach sets them apart from other vendors.",
    author: "Ibrahim Musa",
    role: "Chief Operations Officer",
    company: "SwiftLogistics Nigeria Ltd",
    image: images.testimonials.executive,
  },
];

export const partners: Partner[] = [
  {
    name: "Amazon Web Services",
    category: "Cloud",
    description: "Advanced Consulting Partner with 50+ certified architects.",
  },
  {
    name: "Microsoft Azure",
    category: "Cloud",
    description: "Gold Partner for cloud platform and application development.",
  },
  {
    name: "Google Cloud",
    category: "Cloud",
    description: "Partner for AI/ML workloads and data analytics solutions.",
  },
  {
    name: "Oracle",
    category: "Technology",
    description: "Partner for database and enterprise application integration.",
  },
  {
    name: "Flutter",
    category: "Technology",
    description: "Certified development partner for cross-platform mobile apps.",
  },
  {
    name: "MongoDB",
    category: "Technology",
    description: "Partner for modern database solutions and Atlas deployments.",
  },
];

export const faqs: FAQ[] = [
  {
    question: "What industries does Team X specialize in?",
    answer:
      "We specialize in financial services, healthcare, government, education, hospitality, retail, and logistics. Our deepest expertise is in core banking, hospital management systems, and citizen services portals, though we deliver custom software across many verticals.",
  },
  {
    question: "How does Team X approach project engagement?",
    answer:
      "We offer flexible engagement models: fixed-scope projects, dedicated team augmentation, and managed services. Every engagement begins with discovery to understand your requirements, followed by iterative delivery with regular demos and feedback cycles.",
  },
  {
    question: "Where is Team X located?",
    answer:
      "Our headquarters is in Lagos, Nigeria, with an additional office in Abuja. We serve clients across Nigeria with on-site and remote delivery.",
  },
  {
    question: "What is Team X's typical project timeline?",
    answer:
      "Timelines vary by scope. Mobile apps typically deliver in 3-6 months. Enterprise platforms like core banking or hospital management require 12-18 months. We provide detailed estimates during discovery and deliver incrementally rather than big-bang releases.",
  },
  {
    question: "Does Team X provide post-launch support?",
    answer:
      "Yes. All projects include a warranty period post-launch. We also offer managed services with SLA-backed support, monitoring, and continuous enhancement for clients requiring ongoing partnership.",
  },
  {
    question: "How does Team X ensure project quality?",
    answer:
      "Quality is built into our process: code reviews, automated testing, security scanning, and performance testing are standard. We conduct user acceptance testing with client stakeholders and provide comprehensive documentation and training.",
  },
  {
    question: "Can Team X integrate with our existing systems?",
    answer:
      "Integration is core to our expertise. We build API-first architectures and have experience integrating with legacy mainframes, ERP systems, payment switches, and third-party SaaS platforms.",
  },
  {
    question: "What makes Team X different from other development firms?",
    answer:
      "We combine deep domain expertise in regulated industries with engineering excellence. We're not a body shop—we're partners who understand your business, challenge assumptions constructively, and deliver measurable outcomes.",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "For focused projects with defined scope",
    priceRange: "$25,000 - $75,000",
    features: [
      "Discovery and requirements documentation",
      "UX/UI design",
      "Development and testing",
      "Deployment and launch support",
      "30-day post-launch warranty",
      "Documentation and training",
    ],
    idealFor: "MVPs, mobile apps, portal implementations",
  },
  {
    name: "Professional",
    description: "For enterprise applications with complex requirements",
    priceRange: "$75,000 - $300,000",
    features: [
      "Comprehensive discovery and architecture",
      "Full design system development",
      "Agile development with bi-weekly demos",
      "Integration with existing systems",
      "Security and performance testing",
      "90-day post-launch support",
      "Knowledge transfer and training",
    ],
    idealFor: "Hospital management, educational portals, e-commerce platforms",
  },
  {
    name: "Enterprise",
    description: "For mission-critical systems requiring extensive customization",
    priceRange: "$300,000 - $1M+",
    features: [
      "Extended discovery and process mapping",
      "Enterprise architecture design",
      "Dedicated cross-functional squad",
      "Data migration and parallel run validation",
      "Compliance and security audits",
      "Phased rollout with hypercare support",
      "Managed services option",
      "SLA-backed ongoing support",
    ],
    idealFor: "Core banking, government portals, multi-facility deployments",
  },
];

export const industries: Industry[] = [
  {
    name: "Financial Services",
    slug: "financial-services",
    description:
      "Core banking, agency banking, mobile banking, and regulatory compliance for banks and fintechs.",
    icon: "Landmark",
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    description:
      "Hospital management, EHR, telemedicine, and pharmacy systems for providers and networks.",
    icon: "HeartPulse",
  },
  {
    name: "Government",
    slug: "government",
    description:
      "Citizen portals, e-governance, tax systems, and digital identity for public sector.",
    icon: "Building",
  },
  {
    name: "Education",
    slug: "education",
    description:
      "Educational portals, LMS, student information systems, and examination platforms.",
    icon: "GraduationCap",
  },
  {
    name: "Hospitality",
    slug: "hospitality",
    description:
      "Hotel management, booking engines, and guest experience platforms.",
    icon: "Hotel",
  },
  {
    name: "Retail & E-Commerce",
    slug: "retail",
    description:
      "Omnichannel commerce, inventory management, and customer loyalty systems.",
    icon: "ShoppingCart",
  },
  {
    name: "Logistics",
    slug: "logistics",
    description:
      "Fleet management, warehouse systems, and supply chain optimization.",
    icon: "Truck",
  },
  {
    name: "Manufacturing",
    slug: "manufacturing",
    description:
      "ERP, production planning, quality control, and inventory management.",
    icon: "Factory",
  },
];

export const technologies: Technology[] = [
  { name: "TypeScript", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "Dart", category: "Languages" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Flutter", category: "Mobile" },
  { name: "React Native", category: "Mobile" },
  { name: "Node.js", category: "Backend" },
  { name: "Spring Boot", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "PostgreSQL", category: "Databases" },
  { name: "MongoDB", category: "Databases" },
  { name: "Redis", category: "Databases" },
  { name: "AWS", category: "Cloud" },
  { name: "Azure", category: "Cloud" },
  { name: "Google Cloud", category: "Cloud" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "Docker", category: "DevOps" },
  { name: "Terraform", category: "DevOps" },
  { name: "Apache Kafka", category: "Integration" },
  { name: "LangChain", category: "AI/ML" },
  { name: "TensorFlow", category: "AI/ML" },
  { name: "PyTorch", category: "AI/ML" },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discover",
    description:
      "We immerse in your business through stakeholder interviews, process mapping, and technical assessment to understand requirements and constraints.",
    icon: "Search",
  },
  {
    step: 2,
    title: "Design",
    description:
      "Our architects and designers create solution blueprints, data models, and UX prototypes validated with your team before development begins.",
    icon: "PenTool",
  },
  {
    step: 3,
    title: "Develop",
    description:
      "Agile squads deliver in two-week sprints with continuous integration, code reviews, and regular demos keeping you informed and aligned.",
    icon: "Code2",
  },
  {
    step: 4,
    title: "Deploy",
    description:
      "We manage testing, data migration, training, and phased rollout with hypercare support ensuring smooth transition to production.",
    icon: "Rocket",
  },
  {
    step: 5,
    title: "Evolve",
    description:
      "Post-launch, we provide ongoing support, monitoring, and enhancement to ensure your solution continues delivering value as needs evolve.",
    icon: "TrendingUp",
  },
];

export const whyChooseUs: WhyChooseUs[] = [
  {
    title: "Domain Expertise",
    description:
      "Deep experience in regulated industries—banking, healthcare, government—where compliance and reliability are non-negotiable.",
    icon: "BookOpen",
  },
  {
    title: "Engineering Excellence",
    description:
      "Rigorous standards for code quality, security, and performance backed by automated testing and continuous integration.",
    icon: "Award",
  },
  {
    title: "Proven Track Record",
    description:
      "200+ enterprise projects delivered with 94% client retention and measurable outcomes documented in case studies.",
    icon: "CheckCircle",
  },
  {
    title: "True Partnership",
    description:
      "We embed with your team, challenge assumptions constructively, and succeed only when you achieve your business objectives.",
    icon: "Handshake",
  },
  {
    title: "Full Lifecycle Support",
    description:
      "From discovery through deployment and beyond—we're with you for the long term, not just the initial build.",
    icon: "LifeBuoy",
  },
  {
    title: "Africa-Global Reach",
    description:
      "Local presence in Africa with global standards, understanding regional requirements while applying world-class practices.",
    icon: "Globe",
  },
];

export const aboutContent = {
  hero: {
    title: "Engineering Excellence for Enterprise Transformation",
    subtitle:
      "Since 2013, Team X Technologies has partnered with organizations across Africa and beyond to build software that drives measurable business outcomes.",
    image: images.company.team,
  },
  story: {
    title: "Our Story",
    content: `Team X Technologies was founded in 2013 by engineers who believed African enterprises deserved world-class software engineering. What began as a five-person team in Lagos has grown into a 150+ person organization with offices across three continents.

We've delivered 200+ enterprise projects for banks modernizing core systems, hospitals digitizing patient care, governments serving citizens digitally, and retailers building omnichannel commerce. Our clients stay with us—94% retention—because we deliver outcomes, not just code.

Today, we combine deep domain expertise in regulated industries with cutting-edge capabilities in cloud, mobile, and AI. We're not the biggest development firm, but we're the partner enterprises trust when failure isn't an option.`,
  },
};

export function getLeaderByName(name: string): Leader | undefined {
  return leadership.find((leader) => leader.name === name);
}

export function getTechnologiesByCategory(category: string): Technology[] {
  return technologies.filter(
    (tech) => tech.category.toLowerCase() === category.toLowerCase()
  );
}

export function getTechnologyCategories(): string[] {
  return [...new Set(technologies.map((tech) => tech.category))];
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export function getPartnersByCategory(category: string): Partner[] {
  return partners.filter(
    (partner) => partner.category.toLowerCase() === category.toLowerCase()
  );
}

export function getTimelineByYearRange(start: number, end: number): TimelineEvent[] {
  return timeline.filter((event) => event.year >= start && event.year <= end);
}

export function getAwardsByYear(year: number): Award[] {
  return awards.filter((award) => award.year === year);
}
