import { images } from "./images";

export interface PortfolioProject {
  slug: string;
  title: string;
  description: string;
  image: string;
  industry: string;
  technology: string[];
  duration: string;
  features: string[];
  gallery: string[];
  challenge: string;
  solution: string;
  outcome: string;
  client: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "unity-bank-core-banking",
    title: "Unity Bank Core Banking Modernization",
    description:
      "Complete replacement of legacy mainframe core banking system serving 2.5 million customers across 180 branches with cloud-native microservices architecture.",
    image: images.portfolio.banking,
    industry: "Financial Services",
    technology: ["Java", "Spring Boot", "PostgreSQL", "Kafka", "Kubernetes", "React"],
    duration: "18 months",
    features: [
      "Real-time transaction processing",
      "Multi-currency account management",
      "Automated regulatory reporting",
      "Mobile and internet banking integration",
      "Agency banking network support",
    ],
    gallery: [
      images.portfolio.banking,
      images.portfolio.fintech,
      images.services.banking,
    ],
    challenge:
      "Unity Bank's 25-year-old mainframe system couldn't support digital channels, causing 4-hour end-of-day processing windows and preventing launch of mobile banking products. Regulatory reporting required manual compilation taking 15 days monthly.",
    solution:
      "Team X implemented a modular core banking platform with real-time GL, API-first architecture, and automated CBN reporting. Phased migration preserved business continuity with parallel run validation over 6 months.",
    outcome:
      "End-of-day processing reduced from 4 hours to 22 minutes. Mobile banking launched serving 800K active users. Regulatory report generation automated, saving 320 staff hours monthly.",
    client: "Unity Bank Plc",
  },
  {
    slug: "lagos-state-e-governance",
    title: "Lagos State E-Governance Portal",
    description:
      "Unified citizen services portal digitizing 120 government services including business registration, land records, and tax payments for Africa's largest city.",
    image: images.portfolio.government,
    industry: "Government",
    technology: ["Java", "React", "PostgreSQL", "Keycloak", "AWS", "Redis"],
    duration: "24 months",
    features: [
      "Online license and permit applications",
      "Integrated payment gateway",
      "Document verification workflows",
      "Multi-language support",
      "Real-time application tracking",
    ],
    gallery: [
      images.portfolio.government,
      images.services.government,
      images.company.meeting,
    ],
    challenge:
      "Citizens faced average 6-hour queue times at service centers. Manual processes caused 40% application rejection rates due to incomplete documentation. Revenue collection lagged due to cash-only payments.",
    solution:
      "Team X built a mobile-first portal with guided application workflows, document upload verification, and integrated payment processing. USSD channel extended access to feature phone users.",
    outcome:
      "1.8 million citizens registered. Average processing time reduced from 14 days to 48 hours. Digital payment adoption reached 82%, increasing revenue collection by ₦12 billion annually.",
    client: "Lagos State Government",
  },
  {
    slug: "medplus-hospital-management",
    title: "MedPlus Hospital Management System",
    description:
      "Enterprise HMS deployment across 12 hospital facilities managing 15,000 daily patient encounters with integrated pharmacy, laboratory, and billing.",
    image: images.portfolio.healthcare,
    industry: "Healthcare",
    technology: ["Java", "React", "PostgreSQL", "HL7", "Docker", "AWS"],
    duration: "14 months",
    features: [
      "Electronic medical records",
      "Laboratory information system",
      "Pharmacy inventory management",
      "Insurance claims processing",
      "Telemedicine integration",
    ],
    gallery: [
      images.portfolio.healthcare,
      images.services.healthcare,
    ],
    challenge:
      "MedPlus operated disconnected systems across facilities with no unified patient records. Billing errors caused 8% revenue leakage. Laboratory results took average 48 hours to reach clinicians.",
    solution:
      "Team X deployed unified HMS with centralized patient registry, automated charge capture, and real-time lab result delivery. Phased rollout prioritized high-volume facilities first.",
    outcome:
      "Patient wait times reduced 38%. Billing accuracy improved to 99.4%. Lab result turnaround reduced to 4 hours. Telemedicine consultations reached 25,000 monthly.",
    client: "MedPlus Healthcare Group",
  },
  {
    slug: "african-university-portal",
    title: "African University Digital Portal",
    description:
      "Comprehensive educational portal serving 45,000 students across 8 campuses with admissions, registration, grading, and alumni management.",
    image: images.portfolio.education,
    industry: "Education",
    technology: ["Next.js", "Node.js", "PostgreSQL", "Flutter", "AWS", "Redis"],
    duration: "10 months",
    features: [
      "Online admissions workflow",
      "Course registration system",
      "Grade management and transcripts",
      "Fee payment integration",
      "Mobile student app",
    ],
    gallery: [
      images.portfolio.education,
      images.services.education,
    ],
    challenge:
      "Manual admission processing created 6-week enrollment bottlenecks. Students navigated 5 separate systems for academic services. Transcript requests took 21 days to fulfill.",
    solution:
      "Team X delivered unified portal with automated admission scoring, self-service registration, and instant transcript generation. Mobile app provided offline access to schedules and grades.",
    outcome:
      "Admission cycle reduced from 6 weeks to 10 days. Student satisfaction scores increased 45%. Administrative staff redeployed to student support roles.",
    client: "African University Network",
  },
  {
    slug: "grand-palm-hotel-pms",
    title: "Grand Palm Hotel Property Management",
    description:
      "Multi-property PMS deployment managing 2,400 rooms across 15 hotel properties with channel manager integration and revenue optimization.",
    image: images.portfolio.hospitality,
    industry: "Hospitality",
    technology: ["Node.js", "React", "PostgreSQL", "Redis", "AWS", "Flutter"],
    duration: "8 months",
    features: [
      "Central reservation system",
      "Housekeeping management",
      "Channel manager integration",
      "Dynamic pricing engine",
      "Guest mobile app",
    ],
    gallery: [
      images.portfolio.hospitality,
      images.services.hospitality,
    ],
    challenge:
      "Grand Palm managed properties on 4 different PMS platforms with no consolidated reporting. OTA dependency cost 22% commission on 70% of bookings. Housekeeping delays impacted guest satisfaction.",
    solution:
      "Team X implemented unified cloud PMS with direct booking engine, automated housekeeping workflows, and AI-powered revenue management across all properties.",
    outcome:
      "Direct bookings increased 35%. RevPAR improved 18%. Guest satisfaction scores rose from 3.8 to 4.6 stars. Owner reporting consolidated into single dashboard.",
    client: "Grand Palm Hotels & Resorts",
  },
  {
    slug: "swiftlogistics-fleet-platform",
    title: "SwiftLogistics Fleet Management Platform",
    description:
      "Real-time fleet tracking and route optimization platform managing 3,500 vehicles across West Africa with predictive maintenance and driver analytics.",
    image: images.portfolio.logistics,
    industry: "Logistics",
    technology: ["Python", "React", "PostgreSQL", "Redis", "AWS IoT", "Flutter"],
    duration: "12 months",
    features: [
      "GPS real-time tracking",
      "Route optimization AI",
      "Fuel consumption monitoring",
      "Driver behavior analytics",
      "Maintenance scheduling",
    ],
    gallery: [
      images.portfolio.logistics,
      images.services.logistics,
    ],
    challenge:
      "SwiftLogistics lacked visibility into fleet locations causing delivery delays and customer complaints. Fuel costs consumed 35% of operating budget with suspected theft. Vehicle breakdowns caused 15% delivery failures.",
    solution:
      "Team X deployed IoT-enabled tracking with ML route optimization, geofencing alerts, and predictive maintenance based on vehicle telemetry and historical failure patterns.",
    outcome:
      "On-time delivery improved from 78% to 94%. Fuel costs reduced 22%. Unplanned breakdowns decreased 45%. Customer NPS increased 28 points.",
    client: "SwiftLogistics Nigeria Ltd",
  },
  {
    slug: "shopmart-omnichannel-retail",
    title: "ShopMart Omnichannel Retail Platform",
    description:
      "Unified commerce platform connecting 85 retail stores with e-commerce, inventory synchronization, and customer loyalty program.",
    image: images.portfolio.retail,
    industry: "Retail",
    technology: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS", "React Native"],
    duration: "11 months",
    features: [
      "Unified inventory management",
      "Click-and-collect fulfillment",
      "Loyalty program engine",
      "POS integration",
      "Customer analytics dashboard",
    ],
    gallery: [
      images.portfolio.retail,
      images.services.retail,
    ],
    challenge:
      "ShopMart's online and in-store systems operated independently causing stock discrepancies and lost sales. No unified customer view prevented personalized marketing. Loyalty program penetration stuck at 12%.",
    solution:
      "Team X built omnichannel platform with real-time inventory sync, unified customer profiles, and points-based loyalty integrated across all touchpoints.",
    outcome:
      "Online revenue grew 180% in first year. Inventory accuracy reached 98.5%. Loyalty enrollment increased to 45%. Average order value up 23%.",
    client: "ShopMart Retail Group",
  },
  {
    slug: "insuretech-claims-automation",
    title: "InsureTech Claims Automation Platform",
    description:
      "AI-powered insurance claims processing reducing adjudication time from weeks to hours with fraud detection and automated payouts.",
    image: images.portfolio.insurance,
    industry: "Insurance",
    technology: ["Python", "FastAPI", "PostgreSQL", "TensorFlow", "React", "AWS"],
    duration: "9 months",
    features: [
      "Automated claims intake",
      "Document OCR and validation",
      "Fraud detection ML models",
      "Automated payout processing",
      "Customer self-service portal",
    ],
    gallery: [
      images.portfolio.insurance,
      images.services.ai,
    ],
    challenge:
      "Manual claims processing averaged 18 days with high error rates. Fraudulent claims cost ₦2.1 billion annually. Customer complaints about claim status visibility dominated support channels.",
    solution:
      "Team X implemented intelligent claims platform with document OCR, ML fraud scoring, and automated straight-through processing for low-risk claims.",
    outcome:
      "Average claim processing reduced to 36 hours. Fraud detection improved 65%. Customer satisfaction increased 52%. Operational costs reduced 40%.",
    client: "InsureTech Africa",
  },
  {
    slug: "agritech-supply-chain",
    title: "AgriTech Farm-to-Market Platform",
    description:
      "Digital supply chain platform connecting 12,000 smallholder farmers with buyers, providing traceability, pricing transparency, and mobile payments.",
    image: images.portfolio.agriculture,
    industry: "Agriculture",
    technology: ["Flutter", "Node.js", "PostgreSQL", "AWS", "Redis", "USSD"],
    duration: "10 months",
    features: [
      "Farmer registration and profiling",
      "Crop traceability system",
      "Market price discovery",
      "Mobile payment integration",
      "USSD access for feature phones",
    ],
    gallery: [
      images.portfolio.agriculture,
      images.portfolio.logistics,
    ],
    challenge:
      "Smallholder farmers received only 35% of retail prices due to middleman layers. No traceability limited export market access. Cash payments created security risks and delayed settlements.",
    solution:
      "Team X built mobile-first platform with USSD fallback, blockchain-inspired traceability, and instant mobile money settlements upon delivery confirmation.",
    outcome:
      "Farmer income increased average 42%. Export contracts secured for 2,000 farmers. Payment settlement reduced from 14 days to instant.",
    client: "AgriTech Cooperative Alliance",
  },
  {
    slug: "telecom-customer-care-ai",
    title: "Telecom AI Customer Care Platform",
    description:
      "Multilingual AI chatbot handling 2 million customer interactions monthly across voice, WhatsApp, and web channels for major telecom operator.",
    image: images.portfolio.telecom,
    industry: "Telecommunications",
    technology: ["Python", "LangChain", "FastAPI", "PostgreSQL", "React", "AWS"],
    duration: "7 months",
    features: [
      "Multilingual NLP (English, Hausa, Yoruba, Igbo)",
      "WhatsApp Business integration",
      "Voice bot capabilities",
      "CRM integration",
      "Sentiment analytics dashboard",
    ],
    gallery: [
      images.portfolio.telecom,
      images.services.ai,
    ],
    challenge:
      "Call center handled 80,000 daily calls with 45-minute average wait times. 70% of queries were repetitive balance and bundle inquiries. Agent turnover exceeded 40% annually.",
    solution:
      "Team X deployed omnichannel AI assistant handling routine queries with seamless escalation to human agents for complex issues. Voice bot integrated with IVR system.",
    outcome:
      "82% of queries resolved without human agent. Wait times reduced to under 2 minutes. Call center costs reduced ₦450 million annually.",
    client: "Major Telecom Operator",
  },
  {
    slug: "energy-grid-monitoring",
    title: "PowerGrid Monitoring & Analytics",
    description:
      "IoT-based grid monitoring system tracking 5,000 substations with predictive maintenance and outage management for electricity distribution company.",
    image: images.portfolio.energy,
    industry: "Energy & Utilities",
    technology: ["Python", "React", "PostgreSQL", "AWS IoT", "TimescaleDB", "Grafana"],
    duration: "15 months",
    features: [
      "Real-time substation monitoring",
      "Predictive maintenance alerts",
      "Outage detection and routing",
      "Mobile field worker app",
      "Executive analytics dashboard",
    ],
    gallery: [
      images.portfolio.energy,
      images.services.cloud,
    ],
    challenge:
      "Reactive maintenance caused unplanned outages affecting 2 million customers monthly. Field workers lacked real-time asset information. No centralized view of grid health across regions.",
    solution:
      "Team X deployed IoT sensors with edge computing, centralized monitoring dashboard, and ML models predicting equipment failures 72 hours in advance.",
    outcome:
      "Unplanned outages reduced 35%. Maintenance costs decreased 28%. Customer complaints about power quality dropped 41%.",
    client: "Regional Power Distribution Company",
  },
  {
    slug: "propvest-property-platform",
    title: "PropVest Real Estate Platform",
    description:
      "Property listing, mortgage application, and tenant management platform serving 50,000 property listings with integrated payment processing.",
    image: images.portfolio.realEstate,
    industry: "Real Estate",
    technology: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS", "React Native"],
    duration: "8 months",
    features: [
      "Property listing management",
      "Virtual tour integration",
      "Mortgage pre-qualification",
      "Tenant portal and rent collection",
      "Agent commission tracking",
    ],
    gallery: [
      images.portfolio.realEstate,
      images.services.mobile,
    ],
    challenge:
      "Fragmented property search across multiple platforms frustrated buyers. Manual rent collection caused 25% late payment rates. Agents lacked tools for lead management and commission tracking.",
    solution:
      "Team X built unified marketplace with verified listings, integrated mortgage applications, and automated rent collection with payment reminders.",
    outcome:
      "Platform reached 50,000 active listings. Rent collection on-time rate improved to 89%. Agent productivity increased 55%.",
    client: "PropVest Realty",
  },
  {
    slug: "manufacturepro-erp",
    title: "ManufacturePro ERP Implementation",
    description:
      "Custom ERP for manufacturing company integrating production planning, inventory, quality control, and financial management across 3 factories.",
    image: images.portfolio.manufacturing,
    industry: "Manufacturing",
    technology: ["Java", "React", "PostgreSQL", "Redis", "Docker", "AWS"],
    duration: "16 months",
    features: [
      "Production planning and scheduling",
      "Bill of materials management",
      "Quality control workflows",
      "Inventory optimization",
      "Financial consolidation",
    ],
    gallery: [
      images.portfolio.manufacturing,
      images.services.erp,
    ],
    challenge:
      "Spreadsheet-based production planning caused 15% material waste. No real-time visibility into WIP across factories. Month-end financial close took 12 business days.",
    solution:
      "Team X implemented integrated ERP with MRP engine, barcode-based WIP tracking, and automated financial consolidation across entities.",
    outcome:
      "Material waste reduced to 4%. Production efficiency increased 22%. Financial close reduced to 3 days. Inventory carrying costs down 18%.",
    client: "ManufacturePro Industries",
  },
  {
    slug: "cloudbank-mobile-app",
    title: "CloudBank Mobile Banking App",
    description:
      "Feature-rich mobile banking application for digital-first neobank with 1.2 million downloads and biometric authentication.",
    image: images.portfolio.fintech,
    industry: "Financial Services",
    technology: ["Flutter", "Node.js", "PostgreSQL", "AWS", "Firebase", "Plaid"],
    duration: "6 months",
    features: [
      "Biometric authentication",
      "Instant transfers and bill payments",
      "Savings goals and budgeting",
      "Virtual card management",
      "Investment marketplace",
    ],
    gallery: [
      images.portfolio.fintech,
      images.services.mobile,
    ],
    challenge:
      "CloudBank needed to launch mobile-first banking within 6 months to capture market opportunity. Security and regulatory compliance requirements were non-negotiable.",
    solution:
      "Team X delivered Flutter app with backend microservices, integrated KYC verification, and real-time fraud monitoring meeting CBN digital banking guidelines.",
    outcome:
      "App reached 1.2 million downloads in first year. 4.8 star rating on app stores. 78% of transactions occur via mobile channel.",
    client: "CloudBank Digital",
  },
  {
    slug: "legaltech-case-management",
    title: "LegalTech Case Management System",
    description:
      "Practice management platform for law firm with 200 attorneys managing cases, documents, billing, and client communication.",
    image: images.portfolio.banking,
    industry: "Legal Services",
    technology: ["React", "Node.js", "PostgreSQL", "Elasticsearch", "AWS", "DocuSign"],
    duration: "9 months",
    features: [
      "Case and matter management",
      "Document assembly and storage",
      "Time tracking and billing",
      "Client portal",
      "Court calendar integration",
    ],
    gallery: [
      images.services.enterprise,
      images.company.workspace,
    ],
    challenge:
      "Attorneys spent 30% of time on administrative tasks. Document version control caused costly errors. Billing leakage from untracked time estimated at ₦180 million annually.",
    solution:
      "Team X built integrated practice management with automated document generation, passive time capture, and client self-service portal.",
    outcome:
      "Administrative time reduced 45%. Billing capture improved 35%. Client satisfaction scores increased 38%.",
    client: "Premier Legal Partners",
  },
  {
    slug: "nonprofit-donor-platform",
    title: "Hope Foundation Donor Platform",
    description:
      "Donor management and fundraising platform processing ₦800 million annually with campaign tracking and impact reporting.",
    image: images.portfolio.nonprofit,
    industry: "Non-Profit",
    technology: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS", "SendGrid"],
    duration: "5 months",
    features: [
      "Online donation processing",
      "Recurring giving management",
      "Campaign tracking",
      "Donor CRM",
      "Impact reporting dashboard",
    ],
    gallery: [
      images.portfolio.nonprofit,
      images.company.team,
    ],
    challenge:
      "Manual donation processing limited fundraising scalability. Donors lacked visibility into impact of contributions. No systematic donor retention strategy.",
    solution:
      "Team X created donor platform with one-click giving, automated thank-you workflows, and personalized impact reports showing project outcomes.",
    outcome:
      "Online donations increased 220%. Donor retention improved 45%. Average gift size increased 32%.",
    client: "Hope Foundation",
  },
  {
    slug: "warehouse-automation-wms",
    title: "GlobalFreight Warehouse Automation",
    description:
      "Automated warehouse management system with barcode scanning, pick optimization, and real-time inventory across 4 distribution centers.",
    image: images.portfolio.logistics,
    industry: "Logistics",
    technology: ["Java", "React", "PostgreSQL", "Redis", "Zebra SDK", "AWS"],
    duration: "10 months",
    features: [
      "Barcode receiving and putaway",
      "Wave picking optimization",
      "Cycle counting automation",
      "Cross-dock management",
      "Labor productivity tracking",
    ],
    gallery: [
      images.portfolio.logistics,
      images.services.logistics,
    ],
    challenge:
      "Inventory accuracy stuck at 91% causing stockouts and overstock. Picking errors resulted in 3% order defect rate. No visibility into labor productivity across shifts.",
    solution:
      "Team X deployed WMS with directed picking, automated cycle counting, and real-time dashboards showing inventory accuracy and labor metrics by zone.",
    outcome:
      "Inventory accuracy reached 99.2%. Picking errors reduced to 0.3%. Throughput increased 40% without additional headcount.",
    client: "GlobalFreight Distribution",
  },
  {
    slug: "healthcare-telemedicine-network",
    title: "CareConnect Telemedicine Network",
    description:
      "Multi-provider telemedicine platform connecting 500 doctors with patients across rural areas via video consultation and e-prescription.",
    image: images.portfolio.healthcare,
    industry: "Healthcare",
    technology: ["React", "Node.js", "WebRTC", "PostgreSQL", "AWS", "Flutter"],
    duration: "8 months",
    features: [
      "Video consultation scheduling",
      "E-prescription generation",
      "Electronic health records integration",
      "Payment processing",
      "Pharmacy fulfillment network",
    ],
    gallery: [
      images.portfolio.healthcare,
      images.services.healthcare,
    ],
    challenge:
      "Rural populations traveled average 80km for specialist consultations. Doctor utilization in urban centers was only 60%. No integrated platform connected providers with patients.",
    solution:
      "Team X built telemedicine network with provider scheduling, secure video consultations, e-prescriptions routed to partner pharmacies, and integration with existing EHR systems.",
    outcome:
      "500 doctors onboarded. 150,000 consultations completed. Average patient travel reduced from 80km to zero. Specialist wait times reduced from 6 weeks to same-day.",
    client: "CareConnect Health Network",
  },
];

export function getPortfolioBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getPortfolioByIndustry(industry: string): PortfolioProject[] {
  return portfolioProjects.filter(
    (project) => project.industry.toLowerCase() === industry.toLowerCase()
  );
}

export function getFeaturedPortfolio(count = 6): PortfolioProject[] {
  return portfolioProjects.slice(0, count);
}

export function getPortfolioIndustries(): string[] {
  return [...new Set(portfolioProjects.map((project) => project.industry))];
}

export function searchPortfolio(query: string): PortfolioProject[] {
  const lowerQuery = query.toLowerCase();
  return portfolioProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(lowerQuery) ||
      project.description.toLowerCase().includes(lowerQuery) ||
      project.industry.toLowerCase().includes(lowerQuery) ||
      project.client.toLowerCase().includes(lowerQuery)
  );
}
