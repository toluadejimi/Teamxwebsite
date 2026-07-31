export interface NavItem {
  name: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface MegaMenuCategory {
  name: string;
  slug: string;
  description: string;
  items: NavItem[];
}

export interface FooterSection {
  title: string;
  links: NavItem[];
}

export const companyInfo = {
  name: "Team X Technologies Ltd",
  tagline: "Building Digital Solutions That Transform Businesses",
  industry: "Premium enterprise software development",
} as const;

export const servicesMegaMenu: MegaMenuCategory[] = [
  {
    name: "Enterprise Software",
    slug: "enterprise-software",
    description:
      "Scalable platforms that unify operations, data, and decision-making across your organization.",
    items: [
      {
        name: "Custom Software Development",
        href: "/services/custom-software-development",
        description:
          "Bespoke applications engineered to your exact business requirements and growth trajectory.",
        icon: "Code2",
      },
      {
        name: "ERP Systems",
        href: "/services/erp-systems",
        description:
          "Integrated enterprise resource planning that connects finance, HR, supply chain, and operations.",
        icon: "Building2",
      },
      {
        name: "CRM Platforms",
        href: "/services/crm-platforms",
        description:
          "Customer relationship management systems that drive sales velocity and retention.",
        icon: "Users",
      },
      {
        name: "Document Management",
        href: "/services/document-management",
        description:
          "Secure, searchable document repositories with workflow automation and compliance controls.",
        icon: "FileText",
      },
      {
        name: "Workflow Automation",
        href: "/services/workflow-automation",
        description:
          "Intelligent process orchestration that eliminates bottlenecks and manual handoffs.",
        icon: "GitBranch",
      },
      {
        name: "Legacy Modernization",
        href: "/services/legacy-modernization",
        description:
          "Strategic migration from monolithic systems to modern, cloud-native architectures.",
        icon: "RefreshCw",
      },
    ],
  },
  {
    name: "Financial Solutions",
    slug: "financial-solutions",
    description:
      "Mission-critical banking and fintech platforms built for security, compliance, and scale.",
    items: [
      {
        name: "Core Banking Application",
        href: "/services/core-banking-application",
        description:
          "Full-featured core banking with accounts, loans, treasury, and regulatory reporting.",
        icon: "Landmark",
      },
      {
        name: "Agency Banking",
        href: "/services/agency-banking",
        description:
          "Agent network management for last-mile financial inclusion and rural banking.",
        icon: "Store",
      },
      {
        name: "Payment Gateway Integration",
        href: "/services/payment-gateway",
        description:
          "Multi-rail payment processing with fraud detection and reconciliation automation.",
        icon: "CreditCard",
      },
      {
        name: "Loan Management System",
        href: "/services/loan-management",
        description:
          "End-to-end lending lifecycle from origination through servicing and collections.",
        icon: "Calculator",
      },
      {
        name: "Mobile Banking",
        href: "/services/mobile-banking",
        description:
          "Secure consumer and corporate mobile banking with biometric authentication.",
        icon: "Smartphone",
      },
      {
        name: "Regulatory Compliance",
        href: "/services/regulatory-compliance",
        description:
          "Automated compliance frameworks for AML, KYC, Basel III, and local banking regulations.",
        icon: "ShieldCheck",
      },
    ],
  },
  {
    name: "Education",
    slug: "education",
    description:
      "Digital learning ecosystems that connect institutions, educators, and students seamlessly.",
    items: [
      {
        name: "Educational Portal",
        href: "/services/educational-portal",
        description:
          "Unified portal for admissions, academics, communication, and student services.",
        icon: "GraduationCap",
      },
      {
        name: "Learning Management System",
        href: "/services/learning-management-system",
        description:
          "Course delivery, assessments, and progress tracking for blended and remote learning.",
        icon: "BookOpen",
      },
      {
        name: "Student Information System",
        href: "/services/student-information-system",
        description:
          "Centralized student records, enrollment, grading, and transcript management.",
        icon: "ClipboardList",
      },
      {
        name: "E-Learning Platform",
        href: "/services/e-learning-platform",
        description:
          "Interactive online courses with video, quizzes, and collaborative learning tools.",
        icon: "MonitorPlay",
      },
      {
        name: "School Management",
        href: "/services/school-management",
        description:
          "Administrative automation for K-12 institutions including attendance and fee management.",
        icon: "School",
      },
      {
        name: "Examination System",
        href: "/services/examination-system",
        description:
          "Secure online and offline examination with proctoring and automated grading.",
        icon: "FileCheck",
      },
    ],
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    description:
      "Clinical and administrative systems that improve patient outcomes and operational efficiency.",
    items: [
      {
        name: "Hospital Management System",
        href: "/services/hospital-management",
        description:
          "Comprehensive HMS covering OPD, IPD, billing, pharmacy, and laboratory workflows.",
        icon: "Hospital",
      },
      {
        name: "Electronic Health Records",
        href: "/services/electronic-health-records",
        description:
          "Interoperable EHR with clinical decision support and patient history management.",
        icon: "HeartPulse",
      },
      {
        name: "Telemedicine Platform",
        href: "/services/telemedicine",
        description:
          "Virtual consultations, e-prescriptions, and remote patient monitoring capabilities.",
        icon: "Video",
      },
      {
        name: "Pharmacy Management",
        href: "/services/pharmacy-management",
        description:
          "Inventory control, dispensing workflows, and drug interaction alerts.",
        icon: "Pill",
      },
      {
        name: "Laboratory Information System",
        href: "/services/laboratory-information-system",
        description:
          "Sample tracking, result reporting, and integration with hospital information systems.",
        icon: "FlaskConical",
      },
      {
        name: "Patient Portal",
        href: "/services/patient-portal",
        description:
          "Self-service portal for appointments, test results, billing, and health records.",
        icon: "UserCircle",
      },
    ],
  },
  {
    name: "Hospitality",
    slug: "hospitality",
    description:
      "Guest experience and revenue optimization platforms for hotels, resorts, and restaurants.",
    items: [
      {
        name: "Hotel Management System",
        href: "/services/hotel-management",
        description:
          "Property management with reservations, housekeeping, and front desk operations.",
        icon: "BedDouble",
      },
      {
        name: "Restaurant POS",
        href: "/services/restaurant-pos",
        description:
          "Point-of-sale with kitchen display, table management, and inventory integration.",
        icon: "UtensilsCrossed",
      },
      {
        name: "Booking Engine",
        href: "/services/booking-engine",
        description:
          "Direct booking platform with dynamic pricing and channel manager integration.",
        icon: "CalendarCheck",
      },
      {
        name: "Property Management",
        href: "/services/property-management",
        description:
          "Multi-property portfolio management with owner reporting and maintenance tracking.",
        icon: "Building",
      },
      {
        name: "Guest Experience Platform",
        href: "/services/guest-experience",
        description:
          "Digital concierge, mobile check-in, and personalized guest communication.",
        icon: "ConciergeBell",
      },
      {
        name: "Revenue Management",
        href: "/services/revenue-management",
        description:
          "Demand forecasting, rate optimization, and competitive pricing analytics.",
        icon: "TrendingUp",
      },
    ],
  },
  {
    name: "Government",
    slug: "government",
    description:
      "Citizen-centric digital government platforms that increase transparency and service delivery.",
    items: [
      {
        name: "Government Portal",
        href: "/services/government-portal",
        description:
          "Unified citizen services portal for licenses, permits, and public information.",
        icon: "Landmark",
      },
      {
        name: "E-Governance Platform",
        href: "/services/e-governance",
        description:
          "Digital transformation of government processes with workflow and audit trails.",
        icon: "Globe",
      },
      {
        name: "Citizen Services Portal",
        href: "/services/citizen-services",
        description:
          "Self-service access to government benefits, registrations, and payments.",
        icon: "Users",
      },
      {
        name: "Tax Management System",
        href: "/services/tax-management",
        description:
          "Automated tax filing, assessment, collection, and compliance reporting.",
        icon: "Receipt",
      },
      {
        name: "Public Records Management",
        href: "/services/public-records",
        description:
          "Secure archival, retrieval, and lifecycle management of public records.",
        icon: "Archive",
      },
      {
        name: "Digital Identity",
        href: "/services/digital-identity",
        description:
          "National ID, biometric verification, and secure authentication infrastructure.",
        icon: "Fingerprint",
      },
    ],
  },
  {
    name: "Retail",
    slug: "retail",
    description:
      "Omnichannel commerce platforms that unify online, in-store, and marketplace operations.",
    items: [
      {
        name: "E-Commerce Platform",
        href: "/services/e-commerce-platform",
        description:
          "Scalable online storefronts with catalog management and payment integration.",
        icon: "ShoppingCart",
      },
      {
        name: "Inventory Management",
        href: "/services/inventory-management",
        description:
          "Real-time stock tracking across warehouses, stores, and fulfillment centers.",
        icon: "Package",
      },
      {
        name: "Point of Sale",
        href: "/services/retail-pos",
        description:
          "Modern POS with loyalty programs, returns management, and analytics.",
        icon: "ScanLine",
      },
      {
        name: "Customer Loyalty",
        href: "/services/customer-loyalty",
        description:
          "Rewards programs, personalized offers, and customer segmentation engines.",
        icon: "Gift",
      },
      {
        name: "Omnichannel Retail",
        href: "/services/omnichannel-retail",
        description:
          "Unified commerce experience across web, mobile, and physical channels.",
        icon: "Layers",
      },
      {
        name: "Supply Chain Visibility",
        href: "/services/supply-chain-visibility",
        description:
          "End-to-end supply chain tracking from supplier to customer delivery.",
        icon: "Eye",
      },
    ],
  },
  {
    name: "Logistics",
    slug: "logistics",
    description:
      "Intelligent logistics platforms that optimize fleet operations and delivery performance.",
    items: [
      {
        name: "Fleet Management",
        href: "/services/fleet-management",
        description:
          "GPS tracking, maintenance scheduling, and driver performance analytics.",
        icon: "Truck",
      },
      {
        name: "Warehouse Management",
        href: "/services/warehouse-management",
        description:
          "WMS with picking optimization, barcode scanning, and inventory accuracy.",
        icon: "Warehouse",
      },
      {
        name: "Route Optimization",
        href: "/services/route-optimization",
        description:
          "AI-powered route planning that minimizes fuel costs and delivery times.",
        icon: "Route",
      },
      {
        name: "Last-Mile Delivery",
        href: "/services/last-mile-delivery",
        description:
          "Delivery management with real-time tracking and proof of delivery.",
        icon: "MapPin",
      },
      {
        name: "Freight Management",
        href: "/services/freight-management",
        description:
          "Freight booking, carrier management, and shipment documentation.",
        icon: "Container",
      },
      {
        name: "Supply Chain Analytics",
        href: "/services/supply-chain-analytics",
        description:
          "Predictive analytics for demand forecasting and supply chain optimization.",
        icon: "BarChart3",
      },
    ],
  },
  {
    name: "AI Solutions",
    slug: "ai-solutions",
    description:
      "Enterprise AI systems that automate decisions, enhance experiences, and unlock insights.",
    items: [
      {
        name: "AI Chatbots",
        href: "/services/ai-chatbots",
        description:
          "Intelligent conversational agents for customer support and internal operations.",
        icon: "Bot",
      },
      {
        name: "Predictive Analytics",
        href: "/services/predictive-analytics",
        description:
          "Machine learning models that forecast trends and identify business opportunities.",
        icon: "LineChart",
      },
      {
        name: "Computer Vision",
        href: "/services/computer-vision",
        description:
          "Visual recognition for quality control, security, and document processing.",
        icon: "ScanEye",
      },
      {
        name: "Natural Language Processing",
        href: "/services/nlp",
        description:
          "Text analysis, sentiment detection, and automated content classification.",
        icon: "MessageSquareText",
      },
      {
        name: "Machine Learning Ops",
        href: "/services/mlops",
        description:
          "Production ML pipelines with monitoring, versioning, and automated retraining.",
        icon: "Cpu",
      },
      {
        name: "Intelligent Automation",
        href: "/services/intelligent-automation",
        description:
          "RPA combined with AI for end-to-end business process automation.",
        icon: "Zap",
      },
    ],
  },
  {
    name: "Mobile Applications",
    slug: "mobile-applications",
    description:
      "Native and cross-platform mobile apps engineered for performance and user engagement.",
    items: [
      {
        name: "Flutter Development",
        href: "/services/flutter-development",
        description:
          "High-performance cross-platform apps with a single codebase for iOS and Android.",
        icon: "Smartphone",
      },
      {
        name: "iOS Development",
        href: "/services/ios-development",
        description:
          "Native Swift applications optimized for Apple ecosystem and App Store guidelines.",
        icon: "Apple",
      },
      {
        name: "Android Development",
        href: "/services/android-development",
        description:
          "Native Kotlin apps with Material Design and Google Play compliance.",
        icon: "Smartphone",
      },
      {
        name: "React Native",
        href: "/services/react-native",
        description:
          "Cross-platform mobile development with React for rapid iteration.",
        icon: "Layers",
      },
      {
        name: "Cross-Platform Apps",
        href: "/services/cross-platform-apps",
        description:
          "Unified mobile strategy with shared business logic and native UX.",
        icon: "TabletSmartphone",
      },
      {
        name: "Progressive Web Apps",
        href: "/services/progressive-web-apps",
        description:
          "Installable web applications with offline capability and push notifications.",
        icon: "Globe",
      },
    ],
  },
  {
    name: "Cloud",
    slug: "cloud",
    description:
      "Cloud-native infrastructure and migration services for resilient, scalable systems.",
    items: [
      {
        name: "Cloud Migration",
        href: "/services/cloud-migration",
        description:
          "Strategic lift-and-shift or re-platforming to AWS, Azure, or Google Cloud.",
        icon: "CloudUpload",
      },
      {
        name: "AWS Solutions",
        href: "/services/aws-solutions",
        description:
          "Architecture, deployment, and optimization on Amazon Web Services.",
        icon: "Cloud",
      },
      {
        name: "Azure Infrastructure",
        href: "/services/azure-infrastructure",
        description:
          "Enterprise Microsoft Azure deployments with hybrid cloud integration.",
        icon: "Server",
      },
      {
        name: "DevOps & CI/CD",
        href: "/services/devops-cicd",
        description:
          "Automated pipelines for continuous integration, delivery, and deployment.",
        icon: "Workflow",
      },
      {
        name: "Cloud Security",
        href: "/services/cloud-security",
        description:
          "Zero-trust architecture, encryption, and compliance monitoring in the cloud.",
        icon: "Shield",
      },
      {
        name: "Managed Cloud Services",
        href: "/services/managed-cloud",
        description:
          "24/7 cloud operations, monitoring, and incident response managed services.",
        icon: "HeadphonesIcon",
      },
    ],
  },
];

export const mainNav: NavItem[] = [
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export const footerSections: FooterSection[] = [
  {
    title: "Services",
    links: [
      { name: "Enterprise Software", href: "/services?category=enterprise-software" },
      { name: "Financial Solutions", href: "/services?category=financial-solutions" },
      { name: "Healthcare", href: "/services?category=healthcare" },
      { name: "AI Solutions", href: "/services?category=ai-solutions" },
      { name: "Cloud Services", href: "/services?category=cloud" },
      { name: "Mobile Applications", href: "/services?category=mobile-applications" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Leadership", href: "/about#leadership" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
      { name: "Partners", href: "/about#partners" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Case Studies", href: "/case-studies" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Documentation", href: "/docs" },
      { name: "Support", href: "/support" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "hello@teamxtech.com", href: "mailto:hello@teamxtech.com" },
      { name: "+234 1 234 5678", href: "tel:+23412345678" },
      { name: "Lagos, Nigeria", href: "/contact" },
      { name: "Abuja, Nigeria", href: "/contact" },
      { name: "Schedule a Call", href: "/contact#schedule" },
    ],
  },
];

export const ctaLinks = {
  primary: { name: "Get a Quote", href: "/contact" },
  secondary: { name: "View Portfolio", href: "/portfolio" },
} as const;

export const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/company/teamxtech" },
  { name: "Twitter", href: "https://twitter.com/teamxtech" },
  { name: "GitHub", href: "https://github.com/teamxtech" },
  { name: "YouTube", href: "https://youtube.com/@teamxtech" },
];

export const certifications = [
  "ISO 27001",
  "SOC 2 Type II",
  "AWS Advanced Partner",
  "Microsoft Gold Partner",
];

export function getAllServiceLinks(): NavItem[] {
  return servicesMegaMenu.flatMap((category) => category.items);
}

export function getServiceCategoryBySlug(slug: string): MegaMenuCategory | undefined {
  return servicesMegaMenu.find((category) => category.slug === slug);
}

export function getNavItemByHref(href: string): NavItem | undefined {
  const serviceItem = getAllServiceLinks().find((item) => item.href === href);
  if (serviceItem) return serviceItem;
  return mainNav.find((item) => item.href === href);
}

export function getSearchablePages(): NavItem[] {
  return [
    ...mainNav,
    ...getAllServiceLinks(),
    ...footerSections.flatMap((section) => section.links),
  ];
}

/** @deprecated Use NavItem with `name` — legacy shape for layout components */
export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface MegaMenuColumn {
  title: string;
  links: NavLink[];
}

export interface LegacyNavItem {
  label: string;
  href?: string;
  megaMenu?: MegaMenuColumn[];
}

/** Navbar-compatible nav with mega menu derived from servicesMegaMenu */
export const navbarNav: LegacyNavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    megaMenu: servicesMegaMenu.map((category) => ({
      title: category.name,
      links: category.items.map((item) => ({
        label: item.name,
        href: item.href,
        description: item.description,
      })),
    })),
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

/** Footer-compatible link groups */
export const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Leadership", href: "/about#leadership" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  industries: [
    { label: "Financial Services", href: "/industries/financial-services" },
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Education", href: "/industries/education" },
    { label: "Government", href: "/industries/government" },
    { label: "Hospitality", href: "/industries/hospitality" },
    { label: "Retail", href: "/industries/retail" },
  ],
  solutions: getAllServiceLinks()
    .slice(0, 6)
    .map((item) => ({ label: item.name, href: item.href })),
  products: [
    { label: "Core Banking Suite", href: "/services/core-banking-application" },
    { label: "Hospital Management", href: "/services/hospital-management" },
    { label: "Government Portal", href: "/services/government-portal" },
    { label: "Educational Portal", href: "/services/educational-portal" },
  ],
  resources: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Documentation", href: "/docs" },
    { label: "Support", href: "/support" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
  ],
};

/** Footer office locations — Nigeria only */
export const offices = [
  {
    city: "Lagos",
    country: "Nigeria",
    address: "12 Admiralty Way, Lekki Phase 1",
  },
  {
    city: "Abuja",
    country: "Nigeria",
    address: "Plot 42, Central Business District",
  },
];

/** Command palette searchable pages */
export const searchablePages: NavLink[] = getSearchablePages().map((item) => ({
  label: item.name,
  href: item.href,
  description: item.description,
}));

/** Social links with label field for Footer */
export const socialLinksWithLabel = socialLinks.map((link) => ({
  label: link.name,
  href: link.href,
}));
