import { images } from "./images";

export interface ServiceStat {
  label: string;
  value: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface PricingModel {
  name: string;
  description: string;
  features: string[];
}

export interface Service {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  bannerImage: string;
  problems: string[];
  solutions: string[];
  features: string[];
  benefits: string[];
  modules: string[];
  process: ServiceProcessStep[];
  faqs: ServiceFAQ[];
  relatedServices: string[];
  stats: ServiceStat[];
  techStack: string[];
  pricingModels: PricingModel[];
}

const defaultProcess: ServiceProcessStep[] = [
  {
    step: 1,
    title: "Discovery & Requirements",
    description:
      "We conduct stakeholder workshops, process mapping, and technical assessments to define scope, success metrics, and compliance requirements.",
  },
  {
    step: 2,
    title: "Architecture & Design",
    description:
      "Our architects produce system designs, data models, security frameworks, and UX prototypes validated against your operational workflows.",
  },
  {
    step: 3,
    title: "Agile Development",
    description:
      "Cross-functional squads deliver in two-week sprints with continuous integration, code reviews, and regular stakeholder demos.",
  },
  {
    step: 4,
    title: "Quality Assurance",
    description:
      "Automated and manual testing covers functional, performance, security, and user acceptance criteria before production release.",
  },
  {
    step: 5,
    title: "Deployment & Support",
    description:
      "We manage phased rollouts, staff training, documentation, and provide ongoing maintenance with SLA-backed support.",
  },
];

const defaultPricing: PricingModel[] = [
  {
    name: "Project-Based",
    description: "Fixed-scope delivery with defined milestones and deliverables.",
    features: [
      "Detailed scope document",
      "Fixed timeline and budget",
      "Milestone-based payments",
      "Post-launch warranty period",
    ],
  },
  {
    name: "Dedicated Team",
    description: "Embedded engineers working as an extension of your organization.",
    features: [
      "Flexible team composition",
      "Monthly retainer model",
      "Direct team communication",
      "Scalable resource allocation",
    ],
  },
  {
    name: "Managed Services",
    description: "Ongoing operations, monitoring, and enhancement support.",
    features: [
      "24/7 system monitoring",
      "SLA-backed uptime guarantees",
      "Regular security patches",
      "Continuous improvement backlog",
    ],
  },
];

export const services: Service[] = [
  {
    slug: "core-banking-application",
    title: "Core Banking Application",
    category: "financial-solutions",
    shortDescription:
      "Enterprise-grade core banking platform powering accounts, lending, treasury, and regulatory compliance for modern financial institutions.",
    longDescription:
      "Team X Technologies delivers mission-critical core banking systems engineered for tier-1 reliability, real-time transaction processing, and multi-currency operations. Our platform supports retail and corporate banking, microfinance institutions, and digital-first neobanks seeking to replace legacy mainframe systems with cloud-native architectures. Built with modular microservices, the system integrates seamlessly with payment switches, card processors, mobile banking channels, and central bank reporting interfaces while maintaining full audit trails and regulatory compliance across jurisdictions.",
    bannerImage: images.services.banking,
    problems: [
      "Legacy core systems unable to support digital channels and real-time payments",
      "High operational costs from manual reconciliation and paper-based processes",
      "Regulatory reporting delays causing compliance penalties and audit findings",
      "Siloed product modules preventing unified customer views and cross-selling",
      "Extended time-to-market for new banking products and services",
      "Vendor lock-in with proprietary systems limiting customization and integration",
    ],
    solutions: [
      "Modular microservices architecture enabling independent scaling and rapid feature deployment",
      "Real-time general ledger with automated reconciliation and exception management",
      "Built-in regulatory reporting engines for CBN, IFRS, and Basel III compliance",
      "Unified customer 360 platform connecting deposits, loans, cards, and investments",
      "Product factory for configuring new account types, loan products, and fee structures",
      "Open API layer supporting fintech partnerships and third-party integrations",
    ],
    features: [
      "Multi-currency account management with interest calculation engines",
      "Real-time transaction processing with sub-second response times",
      "Integrated loan origination, disbursement, and collections management",
      "Treasury and liquidity management with ALM reporting",
      "Customer onboarding with KYC/AML verification workflows",
      "Branch, ATM, and digital channel transaction aggregation",
      "Automated end-of-day processing and batch job orchestration",
      "Role-based access control with maker-checker authorization",
    ],
    benefits: [
      "Reduce time-to-market for new products from months to weeks",
      "Lower total cost of ownership through cloud-native infrastructure",
      "Improve customer satisfaction with 24/7 digital banking capabilities",
      "Eliminate reconciliation errors with automated matching algorithms",
      "Strengthen regulatory posture with audit-ready reporting and controls",
      "Enable financial inclusion through agency banking and mobile channels",
    ],
    modules: [
      "Customer Management & CIF",
      "KYC & Identity Verification",
      "Account Opening Workflows",
      "Deposits & Withdrawals",
      "Loans & Credit Management",
      "Fixed Deposits",
      "General Ledger & Accounting",
      "Agency Banking",
      "POS Management",
      "ATM Integration",
      "Mobile Banking",
      "Internet Banking",
      "Wallet Systems",
      "Transaction Monitoring",
      "Fraud Detection",
      "BVN / NIN Integration",
      "AML Compliance",
      "Reports & Regulatory Returns",
      "Admin Dashboard",
      "Audit Trail",
      "Notifications & Alerts",
      "API Integration Hub",
      "Multi-Branch Operations",
      "Treasury Management",
      "CRM",
      "Risk Management",
      "Multi-Currency",
      "Multi-Language",
      "Role-Based Access Control",
      "Workflow & Approvals",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "Can the core banking system integrate with our existing channels?",
        answer:
          "Yes. Our platform exposes RESTful and ISO 8583 APIs for integration with mobile banking, internet banking, ATM switches, POS terminals, and third-party fintech applications. We provide comprehensive SDK documentation and sandbox environments for partner onboarding.",
      },
      {
        question: "How do you handle data migration from legacy systems?",
        answer:
          "We follow a proven migration methodology including data profiling, cleansing, parallel run validation, and phased cutover. Our migration toolkit supports mainframe, Oracle Flexcube, Finacle, and custom legacy systems with full reconciliation reporting.",
      },
      {
        question: "What regulatory frameworks does the system support?",
        answer:
          "The platform includes pre-configured reporting for Central Bank of Nigeria requirements, IFRS 9 impairment calculations, Basel III capital adequacy, FATCA/CRS reporting, and configurable templates for additional jurisdictions.",
      },
      {
        question: "What is the typical implementation timeline?",
        answer:
          "Full core banking implementations typically range from 12-18 months depending on scope, data migration complexity, and number of integrations. Modular deployments for specific products can be delivered in 4-6 months.",
      },
    ],
    relatedServices: [
      "agency-banking",
      "mobile-banking",
      "loan-management",
      "regulatory-compliance",
    ],
    stats: [
      { label: "Transactions Processed Daily", value: "2M+" },
      { label: "System Uptime SLA", value: "99.99%" },
      { label: "Banks Deployed", value: "15+" },
      { label: "Regulatory Reports Automated", value: "50+" },
    ],
    techStack: [
      "Java Spring Boot",
      "PostgreSQL",
      "Redis",
      "Apache Kafka",
      "Docker",
      "Kubernetes",
      "React",
      "Oracle Database",
    ],
    pricingModels: defaultPricing,
  },
  {
    slug: "educational-portal",
    title: "Educational Portal",
    category: "education",
    shortDescription:
      "Unified digital portal connecting students, faculty, and administrators across admissions, academics, and campus services.",
    longDescription:
      "Our Educational Portal transforms how institutions manage the complete student lifecycle—from online applications and enrollment through graduation and alumni engagement. Designed for universities, polytechnics, and private schools, the platform consolidates fragmented systems into a single authenticated experience accessible via web and mobile. Administrators gain real-time visibility into enrollment trends, fee collections, and academic performance while students enjoy self-service access to course registration, results, timetables, and campus announcements.",
    bannerImage: images.services.education,
    problems: [
      "Disconnected systems requiring students to use multiple portals for different services",
      "Manual admission processes causing delays and enrollment bottlenecks",
      "Limited visibility into student progress and at-risk identification",
      "Inefficient communication between faculty, students, and administration",
      "Paper-based record keeping vulnerable to loss and difficult to audit",
      "Difficulty scaling operations during peak enrollment periods",
    ],
    solutions: [
      "Single sign-on portal integrating admissions, academics, finance, and communication",
      "Automated admission workflow with document verification and offer management",
      "Early warning analytics identifying students needing academic intervention",
      "Multi-channel notifications via email, SMS, and in-app messaging",
      "Digital document vault with e-signatures and verification workflows",
      "Cloud-native architecture scaling automatically during registration peaks",
    ],
    features: [
      "Online application and admission management",
      "Course registration and timetable generation",
      "Grade entry, transcript generation, and GPA calculation",
      "Fee payment integration with receipt generation",
      "Hostel allocation and accommodation management",
      "Library integration with catalog search and reservations",
      "Discussion forums and faculty-student messaging",
      "Mobile app for iOS and Android with offline access",
    ],
    benefits: [
      "Reduce administrative workload by up to 40% through automation",
      "Improve student satisfaction with 24/7 self-service capabilities",
      "Accelerate admission cycles from weeks to days",
      "Enable data-driven decisions with enrollment and performance analytics",
      "Strengthen institutional reputation with modern digital experience",
      "Ensure compliance with accreditation and regulatory requirements",
    ],
    modules: [
      "Admissions & Application Portal",
      "Course Registration",
      "Result Management",
      "Transcript Generation",
      "Student Portal",
      "Staff Portal",
      "Payment Integration",
      "CBT / Online Examination",
      "Attendance Management",
      "Timetable Scheduling",
      "E-Learning & LMS",
      "Hostel Management",
      "Library Management",
      "Biometric Integration",
      "ID Card Generation",
      "Mobile App",
      "Parent Portal",
      "Fee Payment Platform",
      "Accreditation Reporting",
      "Analytics & Dashboards",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "Can the portal integrate with our existing LMS?",
        answer:
          "Yes. We provide integrations with Moodle, Canvas, Blackboard, and custom LMS platforms through LTI standards and REST APIs, ensuring seamless single sign-on and grade synchronization.",
      },
      {
        question: "Does the system support multiple campuses?",
        answer:
          "Absolutely. The platform supports multi-campus configurations with centralized administration, campus-specific branding, and consolidated reporting across all locations.",
      },
      {
        question: "How is student data protected?",
        answer:
          "We implement role-based access controls, encryption at rest and in transit, audit logging, and compliance with FERPA and local data protection regulations.",
      },
    ],
    relatedServices: [
      "learning-management-system",
      "student-information-system",
      "examination-system",
    ],
    stats: [
      { label: "Institutions Served", value: "30+" },
      { label: "Students Managed", value: "500K+" },
      { label: "Portal Uptime", value: "99.9%" },
      { label: "Admin Time Saved", value: "40%" },
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS", "Flutter"],
    pricingModels: defaultPricing,
  },
  {
    slug: "hospital-management",
    title: "Hospital Management System",
    category: "healthcare",
    shortDescription:
      "Comprehensive HMS covering clinical workflows, billing, pharmacy, laboratory, and administrative operations for healthcare facilities.",
    longDescription:
      "Team X Technologies' Hospital Management System digitizes the complete healthcare delivery chain for hospitals, clinics, and diagnostic centers. From patient registration and appointment scheduling through clinical documentation, billing, and discharge, our platform ensures care continuity while optimizing resource utilization. The system integrates OPD, IPD, emergency, pharmacy, laboratory, radiology, and billing modules into a unified clinical information system compliant with healthcare data standards and local regulatory requirements.",
    bannerImage: images.services.healthcare,
    problems: [
      "Paper-based patient records causing treatment delays and medical errors",
      "Billing discrepancies and revenue leakage from manual charge capture",
      "Pharmacy stockouts and expired medication management challenges",
      "Laboratory result delays impacting clinical decision-making",
      "Limited bed management visibility causing admission bottlenecks",
      "Difficulty tracking clinical quality metrics and accreditation requirements",
    ],
    solutions: [
      "Electronic medical records with clinical decision support alerts",
      "Automated charge capture linked to clinical orders and procedures",
      "Real-time pharmacy inventory with expiry tracking and reorder alerts",
      "Laboratory workflow automation with result delivery to clinician dashboards",
      "Visual bed management with admission, transfer, and discharge tracking",
      "Built-in quality indicators and accreditation reporting dashboards",
    ],
    features: [
      "Patient registration with insurance verification",
      "OPD and IPD appointment scheduling",
      "Electronic prescribing with drug interaction checks",
      "Laboratory order management and result reporting",
      "Radiology PACS integration",
      "Insurance and cash billing with claims management",
      "Nursing station dashboards and medication administration",
      "Discharge summary and referral letter generation",
    ],
    benefits: [
      "Reduce patient wait times by 35% through optimized workflows",
      "Increase revenue capture with automated billing integration",
      "Improve medication safety with interaction and allergy alerts",
      "Enable telemedicine and remote consultation capabilities",
      "Support accreditation with automated quality reporting",
      "Provide executives with real-time operational dashboards",
    ],
    modules: [
      "Patient Registration & Demographics",
      "Appointment Scheduling",
      "Outpatient Department (OPD)",
      "Inpatient Department (IPD)",
      "Emergency & Trauma Management",
      "Operation Theatre Management",
      "Nursing Station & Ward Management",
      "Electronic Medical Records",
      "Pharmacy & Inventory Management",
      "Laboratory Information System",
      "Radiology & Imaging",
      "Blood Bank Management",
      "Billing & Revenue Cycle",
      "Insurance Claims Processing",
      "Human Resources & Payroll",
      "Asset & Equipment Management",
      "Housekeeping & Maintenance",
      "Medical Records & Archive",
      "Telemedicine Module",
      "Analytics & Reporting",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "Is the system HL7/FHIR compliant?",
        answer:
          "Yes. Our HMS supports HL7 v2 messaging and FHIR R4 resources for interoperability with laboratory analyzers, imaging systems, and health information exchanges.",
      },
      {
        question: "Can it handle NHIS and private insurance billing?",
        answer:
          "The billing module supports NHIS capitation, fee-for-service claims, HMO pre-authorizations, and direct patient billing with integrated payment gateways.",
      },
      {
        question: "What training do you provide for clinical staff?",
        answer:
          "We deliver role-based training programs including super-user certification, video tutorials, and on-site support during the go-live period.",
      },
    ],
    relatedServices: [
      "electronic-health-records",
      "telemedicine",
      "pharmacy-management",
      "laboratory-information-system",
    ],
    stats: [
      { label: "Healthcare Facilities", value: "25+" },
      { label: "Patients Served Daily", value: "50K+" },
      { label: "Billing Accuracy", value: "99.5%" },
      { label: "Wait Time Reduction", value: "35%" },
    ],
    techStack: [
      "Java",
      "PostgreSQL",
      "React",
      "HL7/FHIR",
      "Docker",
      "AWS",
      "Redis",
    ],
    pricingModels: defaultPricing,
  },
  {
    slug: "hotel-management",
    title: "Hotel Management System",
    category: "hospitality",
    shortDescription:
      "Integrated property management system for reservations, front desk, housekeeping, and revenue optimization.",
    longDescription:
      "Our Hotel Management System empowers hoteliers to deliver exceptional guest experiences while maximizing revenue and operational efficiency. From boutique properties to multi-property chains, the platform manages the complete guest journey—reservation, check-in, in-stay services, and checkout—while providing real-time visibility into occupancy, housekeeping status, and financial performance. Native integrations with booking engines, channel managers, and payment gateways ensure rate parity and minimize overbooking risks.",
    bannerImage: images.services.hospitality,
    problems: [
      "Manual reservation management leading to overbookings and guest dissatisfaction",
      "Delayed room turnover impacting check-in times and guest experience",
      "Revenue leakage from inconsistent rate management across channels",
      "Fragmented guest data preventing personalized service delivery",
      "Inefficient housekeeping coordination causing operational bottlenecks",
      "Limited visibility into property performance across multiple locations",
    ],
    solutions: [
      "Centralized reservation engine with real-time inventory synchronization",
      "Digital housekeeping dashboards with mobile task assignment",
      "Dynamic pricing engine with channel manager integration",
      "Unified guest profiles capturing preferences and stay history",
      "Mobile housekeeping apps with room status updates and maintenance alerts",
      "Multi-property dashboard with consolidated reporting and benchmarking",
    ],
    features: [
      "Online and walk-in reservation management",
      "Front desk check-in/check-out with key card integration",
      "Housekeeping scheduling and room status tracking",
      "Point of sale for restaurant, bar, and spa charges",
      "Guest folio management with split billing",
      "Channel manager integration (Booking.com, Expedia, Airbnb)",
      "Loyalty program and guest communication tools",
      "Financial reporting and night audit automation",
    ],
    benefits: [
      "Increase direct bookings and reduce OTA commission costs",
      "Improve guest satisfaction scores through faster service delivery",
      "Maximize RevPAR with dynamic pricing and yield management",
      "Reduce housekeeping response times by 50%",
      "Enable contactless check-in and mobile key solutions",
      "Provide owners with transparent performance reporting",
    ],
    modules: [
      "Reservation Management",
      "Front Desk Operations",
      "Housekeeping Management",
      "Maintenance & Engineering",
      "Restaurant & Bar POS",
      "Spa & Activities Booking",
      "Banquet & Event Management",
      "Guest Profile & CRM",
      "Channel Manager Integration",
      "Revenue Management",
      "Night Audit & Accounting",
      "Inventory & Procurement",
      "Staff Scheduling",
      "Guest Communication",
      "Analytics & Reporting",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "Does the system integrate with existing booking channels?",
        answer:
          "Yes. We integrate with major OTAs through channel managers like SiteMinder, Cloudbeds, and direct API connections to Booking.com and Expedia.",
      },
      {
        question: "Can guests check in using their mobile phones?",
        answer:
          "Our mobile check-in module allows guests to complete registration, select rooms, and receive digital keys before arrival.",
      },
      {
        question: "Is multi-property management supported?",
        answer:
          "The enterprise edition supports unlimited properties with centralized reporting, shared guest profiles, and cross-property loyalty programs.",
      },
    ],
    relatedServices: [
      "booking-engine",
      "restaurant-pos",
      "revenue-management",
      "guest-experience",
    ],
    stats: [
      { label: "Properties Managed", value: "80+" },
      { label: "Rooms Under Management", value: "12K+" },
      { label: "Direct Booking Increase", value: "28%" },
      { label: "Housekeeping Efficiency Gain", value: "50%" },
    ],
    techStack: ["Node.js", "PostgreSQL", "React", "Redis", "AWS", "Flutter"],
    pricingModels: defaultPricing,
  },
  {
    slug: "government-portal",
    title: "Government Portal",
    category: "government",
    shortDescription:
      "Citizen-centric digital government platform for licenses, permits, payments, and public service delivery.",
    longDescription:
      "Team X Technologies builds secure, accessible government portals that transform citizen interactions with public institutions. Our platforms enable online application for licenses and permits, tax payments, business registrations, and access to public records—reducing queue times, improving transparency, and increasing revenue collection. Built with accessibility standards, multi-language support, and integration capabilities for national identity systems, the portal serves as the digital front door for government services at federal, state, and local levels.",
    bannerImage: images.services.government,
    problems: [
      "Long queues and processing delays at government service centers",
      "Manual paper-based workflows prone to loss and corruption",
      "Limited transparency in application status and decision timelines",
      "Revenue leakage from cash-based payment collection",
      "Difficulty reaching citizens in remote and underserved areas",
      "Siloed agency systems preventing inter-agency data sharing",
    ],
    solutions: [
      "Online self-service portals with real-time application tracking",
      "Digital workflow automation with audit trails and approval chains",
      "Public dashboards showing service level agreements and performance metrics",
      "Integrated payment gateways supporting cards, bank transfers, and mobile money",
      "Mobile-first design with USSD fallback for low-connectivity areas",
      "Enterprise service bus enabling secure inter-agency data exchange",
    ],
    features: [
      "Citizen registration and profile management",
      "Online application for licenses, permits, and certificates",
      "Document upload with verification workflows",
      "Payment processing with automated receipt generation",
      "Application status tracking with SMS/email notifications",
      "Admin dashboard for case management and reporting",
      "Integration with national ID and tax systems",
      "Accessibility compliance (WCAG 2.1 AA)",
    ],
    benefits: [
      "Reduce citizen service wait times from days to hours",
      "Increase revenue collection through convenient digital payments",
      "Improve transparency and reduce corruption opportunities",
      "Enable data-driven policy decisions with service analytics",
      "Extend government reach to rural and remote populations",
      "Meet digital transformation mandates and e-governance goals",
    ],
    modules: [
      "Citizen Identity & Registration",
      "License & Permit Applications",
      "Business Registration",
      "Tax Assessment & Payment",
      "Land Records & Property Tax",
      "Social Welfare & Benefits",
      "Public Complaints & Feedback",
      "Document Verification",
      "Payment Gateway Integration",
      "Workflow & Approval Engine",
      "Case Management System",
      "Reporting & Analytics",
      "Content Management",
      "Multi-language Support",
      "API Gateway for Agencies",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "How do you ensure data security for citizen information?",
        answer:
          "We implement encryption, role-based access, penetration testing, and compliance with national data protection regulations. All systems undergo security audits before deployment.",
      },
      {
        question: "Can the portal integrate with existing agency systems?",
        answer:
          "Yes. Our integration framework connects with legacy systems through APIs, file transfers, and enterprise service buses while maintaining data integrity and audit trails.",
      },
      {
        question: "What accessibility standards do you follow?",
        answer:
          "Our portals comply with WCAG 2.1 AA standards, supporting screen readers, keyboard navigation, and high-contrast modes for inclusive access.",
      },
    ],
    relatedServices: [
      "e-governance",
      "citizen-services",
      "tax-management",
      "digital-identity",
    ],
    stats: [
      { label: "Citizens Registered", value: "2M+" },
      { label: "Services Digitized", value: "150+" },
      { label: "Processing Time Reduction", value: "70%" },
      { label: "Digital Payment Adoption", value: "85%" },
    ],
    techStack: [
      "Java",
      "PostgreSQL",
      "React",
      "Keycloak",
      "Redis",
      "Kubernetes",
      "AWS GovCloud",
    ],
    pricingModels: defaultPricing,
  },
  {
    slug: "agency-banking",
    title: "Agency Banking Platform",
    category: "financial-solutions",
    shortDescription:
      "Agent network management platform enabling last-mile financial services in underserved communities.",
    longDescription:
      "Our Agency Banking Platform empowers financial institutions to extend their reach through authorized agent networks, bringing deposit, withdrawal, transfer, and account opening services to communities without physical bank branches. The system manages agent onboarding, commission structures, float management, transaction monitoring, and regulatory reporting while providing agents with intuitive mobile and POS interfaces for reliable service delivery.",
    bannerImage: images.services.banking,
    problems: [
      "Limited branch network excluding rural and peri-urban populations",
      "High cost of establishing and maintaining physical branch infrastructure",
      "Agent fraud and reconciliation challenges in distributed networks",
      "Complex commission calculations across multiple product types",
      "Regulatory requirements for agent banking oversight and reporting",
      "Cash management and float optimization across agent locations",
    ],
    solutions: [
      "Scalable agent onboarding with KYC verification and training workflows",
      "Real-time transaction processing with instant core banking integration",
      "Automated commission calculation and settlement",
      "Fraud detection with transaction limits and anomaly alerts",
      "Built-in regulatory reporting for central bank agent banking guidelines",
      "Float management dashboards with cash-in-transit tracking",
    ],
    features: [
      "Agent registration and tier management",
      "Mobile agent app for transactions",
      "POS terminal integration",
      "Biometric customer verification",
      "Real-time float monitoring",
      "Commission and incentive management",
      "Transaction dispute resolution",
      "Agent performance analytics",
    ],
    benefits: [
      "Expand financial inclusion to underserved markets",
      "Reduce branch establishment costs by 80%",
      "Increase transaction volumes through convenient access points",
      "Improve agent accountability with real-time monitoring",
      "Meet central bank financial inclusion targets",
      "Generate new revenue streams through agent fees",
    ],
    modules: [
      "Agent Onboarding & KYC",
      "Agent Mobile Application",
      "Transaction Processing Engine",
      "Float & Cash Management",
      "Commission Management",
      "Customer Account Services",
      "Biometric Verification",
      "Fraud Monitoring",
      "Dispute Management",
      "Regulatory Reporting",
      "Agent Training Portal",
      "Performance Analytics",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "What devices do agents use?",
        answer:
          "Agents can operate using Android smartphones, dedicated POS terminals, or biometric tablets depending on transaction types and regulatory requirements.",
      },
      {
        question: "How is agent float managed?",
        answer:
          "The system tracks agent float balances in real-time, triggers replenishment alerts, and supports cash-in-transit workflows with vault management integration.",
      },
    ],
    relatedServices: [
      "core-banking-application",
      "mobile-banking",
      "payment-gateway",
    ],
    stats: [
      { label: "Active Agents", value: "10K+" },
      { label: "Daily Transactions", value: "500K+" },
      { label: "Rural Coverage", value: "85%" },
      { label: "Agent Uptime", value: "99.5%" },
    ],
    techStack: ["Java", "PostgreSQL", "Flutter", "Redis", "AWS", "ISO 8583"],
    pricingModels: defaultPricing,
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    category: "enterprise-software",
    shortDescription:
      "Bespoke enterprise applications engineered to your exact specifications, workflows, and growth objectives.",
    longDescription:
      "When off-the-shelf solutions fall short, Team X Technologies delivers custom software that fits your business like a glove. Our engineering teams partner with your stakeholders to understand unique processes, compliance requirements, and competitive advantages—then build scalable applications using modern architectures and proven development methodologies. From internal workflow tools to customer-facing platforms, we transform complex business requirements into elegant, maintainable software.",
    bannerImage: images.services.customSoftware,
    problems: [
      "Commercial software forcing business process compromises",
      "Legacy custom applications with outdated technology stacks",
      "Integration gaps between disparate systems",
      "Inability to differentiate through technology capabilities",
      "Vendor dependencies limiting customization and control",
      "Technical debt slowing innovation and increasing maintenance costs",
    ],
    solutions: [
      "Requirements-driven development aligned with your exact workflows",
      "Modern technology stacks ensuring long-term maintainability",
      "API-first architecture enabling seamless integrations",
      "Proprietary IP ownership giving you full control and competitive advantage",
      "Agile delivery with transparent progress and flexible scope management",
      "Comprehensive documentation and knowledge transfer",
    ],
    features: [
      "Stakeholder workshops and requirements documentation",
      "UX/UI design with interactive prototypes",
      "Scalable cloud-native architecture",
      "Automated testing and CI/CD pipelines",
      "Security-first development practices",
      "Performance optimization and load testing",
      "Admin dashboards and reporting",
      "Ongoing maintenance and enhancement support",
    ],
    benefits: [
      "Software that adapts to your business, not the other way around",
      "Competitive differentiation through unique capabilities",
      "Full ownership of intellectual property and source code",
      "Reduced long-term costs compared to perpetual licensing",
      "Seamless integration with existing enterprise systems",
      "Scalability to support business growth",
    ],
    modules: [],
    process: defaultProcess,
    faqs: [
      {
        question: "How do you estimate project timelines and costs?",
        answer:
          "We conduct discovery sessions to understand scope, then provide detailed estimates with milestone-based pricing. Agile projects use story point estimation with regular reforecasting.",
      },
      {
        question: "Who owns the source code?",
        answer:
          "You retain full ownership of all custom code, documentation, and intellectual property upon project completion and final payment.",
      },
      {
        question: "What technologies do you recommend?",
        answer:
          "Technology choices depend on requirements, team capabilities, and scalability needs. We recommend stacks proven in enterprise environments and provide rationale for each decision.",
      },
    ],
    relatedServices: [
      "erp-systems",
      "workflow-automation",
      "legacy-modernization",
    ],
    stats: [
      { label: "Custom Projects Delivered", value: "200+" },
      { label: "Client Retention Rate", value: "94%" },
      { label: "On-Time Delivery", value: "92%" },
      { label: "Engineers on Staff", value: "150+" },
    ],
    techStack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Java",
      "Python",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    pricingModels: defaultPricing,
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots & Virtual Assistants",
    category: "ai-solutions",
    shortDescription:
      "Intelligent conversational AI for customer support, sales, and internal operations automation.",
    longDescription:
      "Team X Technologies builds enterprise-grade AI chatbots that understand context, handle complex queries, and seamlessly escalate to human agents when needed. Powered by large language models fine-tuned on your domain knowledge, our virtual assistants operate across web, mobile, WhatsApp, and voice channels—delivering 24/7 support while reducing operational costs and improving customer satisfaction scores.",
    bannerImage: images.services.ai,
    problems: [
      "High customer support costs with limited availability hours",
      "Repetitive queries consuming agent time and increasing wait times",
      "Inconsistent responses damaging brand reputation",
      "Difficulty scaling support during peak periods",
      "Knowledge trapped in documents inaccessible to customers",
      "Limited insights from unstructured customer conversations",
    ],
    solutions: [
      "LLM-powered chatbots trained on your knowledge base and policies",
      "Omnichannel deployment across web, mobile, and messaging platforms",
      "Intelligent routing with seamless human agent handoff",
      "Continuous learning from conversation analytics and feedback",
      "Integration with CRM, ticketing, and backend systems",
      "Sentiment analysis and conversation quality monitoring",
    ],
    features: [
      "Natural language understanding in multiple languages",
      "Context-aware multi-turn conversations",
      "Knowledge base integration and RAG architecture",
      "WhatsApp Business API integration",
      "Voice bot capabilities",
      "Analytics dashboard with conversation insights",
      "A/B testing for response optimization",
      "Compliance controls for regulated industries",
    ],
    benefits: [
      "Reduce support costs by up to 60%",
      "Provide 24/7 instant response to customer inquiries",
      "Improve CSAT scores with consistent, accurate answers",
      "Free agents to handle complex, high-value interactions",
      "Generate actionable insights from customer conversations",
      "Scale support capacity without proportional headcount increases",
    ],
    modules: [
      "Conversation Engine",
      "Knowledge Base Manager",
      "Intent Classification",
      "Entity Extraction",
      "Human Handoff System",
      "Analytics & Reporting",
      "Multi-channel Connector",
      "Training & Fine-tuning Pipeline",
    ],
    process: defaultProcess,
    faqs: [
      {
        question: "Can the chatbot handle industry-specific terminology?",
        answer:
          "Yes. We fine-tune models on your documentation, FAQs, and conversation history to accurately understand domain-specific language and procedures.",
      },
      {
        question: "How do you prevent incorrect responses?",
        answer:
          "We implement guardrails, confidence thresholds, source citation, and human review workflows for sensitive topics. Fallback to human agents occurs when confidence is low.",
      },
    ],
    relatedServices: [
      "nlp",
      "intelligent-automation",
      "predictive-analytics",
    ],
    stats: [
      { label: "Queries Resolved Automatically", value: "78%" },
      { label: "Average Response Time", value: "<2s" },
      { label: "Support Cost Reduction", value: "60%" },
      { label: "Languages Supported", value: "12+" },
    ],
    techStack: [
      "Python",
      "LangChain",
      "OpenAI",
      "PostgreSQL",
      "Redis",
      "FastAPI",
      "React",
    ],
    pricingModels: defaultPricing,
  },
  {
    slug: "cloud-migration",
    title: "Cloud Migration Services",
    category: "cloud",
    shortDescription:
      "Strategic migration of applications and infrastructure to AWS, Azure, or Google Cloud with minimal disruption.",
    longDescription:
      "Team X Technologies guides enterprises through cloud transformation journeys—from assessment and planning through migration execution and optimization. Our certified cloud architects evaluate your portfolio using the 6 Rs framework (Rehost, Replatform, Refactor, Repurchase, Retire, Retain), develop migration roadmaps aligned with business priorities, and execute migrations with rigorous testing and rollback procedures to ensure business continuity.",
    bannerImage: images.services.cloud,
    problems: [
      "On-premises infrastructure reaching capacity and end-of-life",
      "High capital expenditure on hardware refresh cycles",
      "Difficulty scaling resources to meet demand fluctuations",
      "Disaster recovery gaps exposing business continuity risks",
      "Limited agility slowing time-to-market for new initiatives",
      "Skills gaps preventing effective cloud adoption",
    ],
    solutions: [
      "Comprehensive cloud readiness assessment and TCO analysis",
      "Phased migration roadmaps minimizing business disruption",
      "Automated migration tooling for databases and applications",
      "Cloud-native architecture redesign for optimal performance",
      "Security and compliance framework implementation",
      "Team training and managed services for ongoing operations",
    ],
    features: [
      "Application portfolio discovery and dependency mapping",
      "Migration strategy development (6 Rs framework)",
      "Lift-and-shift and re-platforming execution",
      "Database migration with minimal downtime",
      "Network architecture and connectivity design",
      "Security baseline and identity management",
      "Cost optimization and FinOps practices",
      "Post-migration monitoring and support",
    ],
    benefits: [
      "Reduce infrastructure costs by 30-50%",
      "Improve application availability to 99.99%",
      "Enable elastic scaling for peak demand periods",
      "Accelerate disaster recovery with multi-region deployment",
      "Free IT teams to focus on innovation vs. maintenance",
      "Access latest cloud services for AI, analytics, and IoT",
    ],
    modules: [],
    process: [
      {
        step: 1,
        title: "Assess",
        description:
          "Inventory applications, map dependencies, evaluate cloud readiness, and calculate total cost of ownership for migration scenarios.",
      },
      {
        step: 2,
        title: "Plan",
        description:
          "Develop migration waves, define success criteria, establish security baselines, and create detailed runbooks for each application.",
      },
      {
        step: 3,
        title: "Migrate",
        description:
          "Execute migrations in controlled waves with parallel testing, data validation, and rollback procedures ready.",
      },
      {
        step: 4,
        title: "Optimize",
        description:
          "Right-size resources, implement auto-scaling, optimize costs, and establish FinOps practices for ongoing cloud management.",
      },
      {
        step: 5,
        title: "Operate",
        description:
          "Provide managed services, monitoring, incident response, and continuous improvement for cloud workloads.",
      },
    ],
    faqs: [
      {
        question: "How long does a typical migration take?",
        answer:
          "Timeline depends on portfolio size and complexity. Pilot migrations complete in 8-12 weeks; enterprise-wide programs span 12-24 months with phased delivery.",
      },
      {
        question: "Which cloud provider do you recommend?",
        answer:
          "We are cloud-agnostic and recommend based on your existing investments, compliance requirements, and workload characteristics. We hold certifications across AWS, Azure, and GCP.",
      },
    ],
    relatedServices: [
      "aws-solutions",
      "azure-infrastructure",
      "devops-cicd",
      "managed-cloud",
    ],
    stats: [
      { label: "Applications Migrated", value: "500+" },
      { label: "Average Cost Savings", value: "40%" },
      { label: "Migration Success Rate", value: "99%" },
      { label: "Cloud Certifications", value: "50+" },
    ],
    techStack: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Terraform",
      "Kubernetes",
      "Docker",
      "Ansible",
    ],
    pricingModels: defaultPricing,
  },
  {
    slug: "flutter-development",
    title: "Flutter Development",
    category: "mobile-applications",
    shortDescription:
      "High-performance cross-platform mobile applications with native UX for iOS and Android from a single codebase.",
    longDescription:
      "Team X Technologies leverages Flutter's powerful framework to deliver beautiful, performant mobile applications that run natively on iOS and Android. Our Flutter specialists build consumer apps, enterprise mobility solutions, and embedded interfaces with pixel-perfect UI, smooth animations, and offline capabilities—accelerating time-to-market while reducing development and maintenance costs compared to native dual-platform development.",
    bannerImage: images.services.mobile,
    problems: [
      "Maintaining separate iOS and Android codebases doubling development costs",
      "Inconsistent user experience across mobile platforms",
      "Slow release cycles due to platform-specific development bottlenecks",
      "Difficulty finding developers skilled in both native platforms",
      "Feature parity delays between iOS and Android releases",
      "High maintenance burden for cross-platform hybrid frameworks",
    ],
    solutions: [
      "Single Dart codebase compiling to native ARM code for both platforms",
      "Material and Cupertino widget libraries ensuring platform-native feel",
      "Hot reload accelerating development iteration cycles",
      "Rich animation libraries for engaging user experiences",
      "Offline-first architecture with local data persistence",
      "Continuous delivery pipelines for simultaneous platform releases",
    ],
    features: [
      "Custom UI design implementation",
      "Biometric authentication integration",
      "Push notification setup (FCM/APNs)",
      "Offline data synchronization",
      "Camera, GPS, and sensor integration",
      "In-app purchases and payment gateway integration",
      "App Store and Play Store deployment",
      "Analytics and crash reporting integration",
    ],
    benefits: [
      "Reduce development time by 40% vs. native dual development",
      "Ensure consistent UX across iOS and Android",
      "Single team maintaining one codebase",
      "Near-native performance with 60fps animations",
      "Faster feature releases with unified deployment",
      "Lower total cost of ownership over app lifecycle",
    ],
    modules: [],
    process: defaultProcess,
    faqs: [
      {
        question: "Is Flutter suitable for complex enterprise apps?",
        answer:
          "Yes. Flutter powers apps for Alibaba, BMW, and Google Pay. We use clean architecture, state management patterns, and modular design for enterprise-grade maintainability.",
      },
      {
        question: "Can you migrate our existing native app to Flutter?",
        answer:
          "We assess your current app and can migrate incrementally using Flutter modules or complete rewrites depending on codebase condition and business priorities.",
      },
    ],
    relatedServices: [
      "cross-platform-apps",
      "react-native",
      "progressive-web-apps",
    ],
    stats: [
      { label: "Flutter Apps Delivered", value: "45+" },
      { label: "App Store Rating Average", value: "4.7★" },
      { label: "Development Time Savings", value: "40%" },
      { label: "Crash-Free Sessions", value: "99.8%" },
    ],
    techStack: ["Flutter", "Dart", "Firebase", "REST APIs", "GraphQL", "SQLite"],
    pricingModels: defaultPricing,
  },
];

// Additional services matching mega menu with structured data
const additionalServices: Partial<Service>[] = [
  { slug: "erp-systems", title: "ERP Systems", category: "enterprise-software", shortDescription: "Integrated enterprise resource planning connecting finance, HR, supply chain, and operations.", bannerImage: images.services.erp },
  { slug: "crm-platforms", title: "CRM Platforms", category: "enterprise-software", shortDescription: "Customer relationship management driving sales pipeline visibility and retention.", bannerImage: images.services.crm },
  { slug: "document-management", title: "Document Management", category: "enterprise-software", shortDescription: "Secure document repositories with workflow automation and compliance controls.", bannerImage: images.services.enterprise },
  { slug: "workflow-automation", title: "Workflow Automation", category: "enterprise-software", shortDescription: "Intelligent process orchestration eliminating manual bottlenecks.", bannerImage: images.services.enterprise },
  { slug: "legacy-modernization", title: "Legacy Modernization", category: "enterprise-software", shortDescription: "Strategic migration from monolithic systems to cloud-native architectures.", bannerImage: images.services.enterprise },
  { slug: "payment-gateway", title: "Payment Gateway Integration", category: "financial-solutions", shortDescription: "Multi-rail payment processing with fraud detection and reconciliation.", bannerImage: images.services.banking },
  { slug: "loan-management", title: "Loan Management System", category: "financial-solutions", shortDescription: "End-to-end lending lifecycle from origination through collections.", bannerImage: images.services.banking },
  { slug: "mobile-banking", title: "Mobile Banking", category: "financial-solutions", shortDescription: "Secure consumer and corporate mobile banking applications.", bannerImage: images.services.mobile },
  { slug: "regulatory-compliance", title: "Regulatory Compliance", category: "financial-solutions", shortDescription: "Automated AML, KYC, and banking regulatory reporting frameworks.", bannerImage: images.services.banking },
  { slug: "learning-management-system", title: "Learning Management System", category: "education", shortDescription: "Course delivery, assessments, and progress tracking for digital learning.", bannerImage: images.services.education },
  { slug: "student-information-system", title: "Student Information System", category: "education", shortDescription: "Centralized student records, enrollment, and transcript management.", bannerImage: images.services.education },
  { slug: "e-learning-platform", title: "E-Learning Platform", category: "education", shortDescription: "Interactive online courses with video, quizzes, and collaboration.", bannerImage: images.services.education },
  { slug: "school-management", title: "School Management", category: "education", shortDescription: "Administrative automation for K-12 institutions.", bannerImage: images.services.education },
  { slug: "examination-system", title: "Examination System", category: "education", shortDescription: "Secure online examination with proctoring and automated grading.", bannerImage: images.services.education },
  { slug: "electronic-health-records", title: "Electronic Health Records", category: "healthcare", shortDescription: "Interoperable EHR with clinical decision support.", bannerImage: images.services.healthcare },
  { slug: "telemedicine", title: "Telemedicine Platform", category: "healthcare", shortDescription: "Virtual consultations and remote patient monitoring.", bannerImage: images.services.healthcare },
  { slug: "pharmacy-management", title: "Pharmacy Management", category: "healthcare", shortDescription: "Inventory control and dispensing workflow automation.", bannerImage: images.services.healthcare },
  { slug: "laboratory-information-system", title: "Laboratory Information System", category: "healthcare", shortDescription: "Sample tracking and result reporting integration.", bannerImage: images.services.healthcare },
  { slug: "patient-portal", title: "Patient Portal", category: "healthcare", shortDescription: "Self-service portal for appointments, results, and billing.", bannerImage: images.services.healthcare },
  { slug: "restaurant-pos", title: "Restaurant POS", category: "hospitality", shortDescription: "Point-of-sale with kitchen display and table management.", bannerImage: images.services.hospitality },
  { slug: "booking-engine", title: "Booking Engine", category: "hospitality", shortDescription: "Direct booking with dynamic pricing and channel integration.", bannerImage: images.services.hospitality },
  { slug: "property-management", title: "Property Management", category: "hospitality", shortDescription: "Multi-property portfolio management and owner reporting.", bannerImage: images.services.hospitality },
  { slug: "guest-experience", title: "Guest Experience Platform", category: "hospitality", shortDescription: "Digital concierge and personalized guest communication.", bannerImage: images.services.hospitality },
  { slug: "revenue-management", title: "Revenue Management", category: "hospitality", shortDescription: "Demand forecasting and rate optimization analytics.", bannerImage: images.services.hospitality },
  { slug: "e-governance", title: "E-Governance Platform", category: "government", shortDescription: "Digital transformation of government processes.", bannerImage: images.services.government },
  { slug: "citizen-services", title: "Citizen Services Portal", category: "government", shortDescription: "Self-service access to government benefits and registrations.", bannerImage: images.services.government },
  { slug: "tax-management", title: "Tax Management System", category: "government", shortDescription: "Automated tax filing, assessment, and collection.", bannerImage: images.services.government },
  { slug: "public-records", title: "Public Records Management", category: "government", shortDescription: "Secure archival and lifecycle management of public records.", bannerImage: images.services.government },
  { slug: "digital-identity", title: "Digital Identity", category: "government", shortDescription: "National ID and biometric verification infrastructure.", bannerImage: images.services.government },
  { slug: "e-commerce-platform", title: "E-Commerce Platform", category: "retail", shortDescription: "Scalable online storefronts with catalog and payment integration.", bannerImage: images.services.retail },
  { slug: "inventory-management", title: "Inventory Management", category: "retail", shortDescription: "Real-time stock tracking across warehouses and stores.", bannerImage: images.services.retail },
  { slug: "retail-pos", title: "Point of Sale", category: "retail", shortDescription: "Modern POS with loyalty and returns management.", bannerImage: images.services.retail },
  { slug: "customer-loyalty", title: "Customer Loyalty", category: "retail", shortDescription: "Rewards programs and personalized offer engines.", bannerImage: images.services.retail },
  { slug: "omnichannel-retail", title: "Omnichannel Retail", category: "retail", shortDescription: "Unified commerce across web, mobile, and physical channels.", bannerImage: images.services.retail },
  { slug: "supply-chain-visibility", title: "Supply Chain Visibility", category: "retail", shortDescription: "End-to-end tracking from supplier to customer.", bannerImage: images.services.retail },
  { slug: "fleet-management", title: "Fleet Management", category: "logistics", shortDescription: "GPS tracking and driver performance analytics.", bannerImage: images.services.logistics },
  { slug: "warehouse-management", title: "Warehouse Management", category: "logistics", shortDescription: "WMS with picking optimization and barcode scanning.", bannerImage: images.services.logistics },
  { slug: "route-optimization", title: "Route Optimization", category: "logistics", shortDescription: "AI-powered route planning minimizing costs and delivery times.", bannerImage: images.services.logistics },
  { slug: "last-mile-delivery", title: "Last-Mile Delivery", category: "logistics", shortDescription: "Delivery management with real-time tracking.", bannerImage: images.services.logistics },
  { slug: "freight-management", title: "Freight Management", category: "logistics", shortDescription: "Freight booking and carrier management.", bannerImage: images.services.logistics },
  { slug: "supply-chain-analytics", title: "Supply Chain Analytics", category: "logistics", shortDescription: "Predictive analytics for demand forecasting.", bannerImage: images.services.logistics },
  { slug: "predictive-analytics", title: "Predictive Analytics", category: "ai-solutions", shortDescription: "ML models forecasting trends and opportunities.", bannerImage: images.services.ai },
  { slug: "computer-vision", title: "Computer Vision", category: "ai-solutions", shortDescription: "Visual recognition for quality control and security.", bannerImage: images.services.ai },
  { slug: "nlp", title: "Natural Language Processing", category: "ai-solutions", shortDescription: "Text analysis and automated content classification.", bannerImage: images.services.ai },
  { slug: "mlops", title: "Machine Learning Ops", category: "ai-solutions", shortDescription: "Production ML pipelines with monitoring and retraining.", bannerImage: images.services.ai },
  { slug: "intelligent-automation", title: "Intelligent Automation", category: "ai-solutions", shortDescription: "RPA combined with AI for process automation.", bannerImage: images.services.ai },
  { slug: "ios-development", title: "iOS Development", category: "mobile-applications", shortDescription: "Native Swift applications for Apple ecosystem.", bannerImage: images.services.mobile },
  { slug: "android-development", title: "Android Development", category: "mobile-applications", shortDescription: "Native Kotlin apps with Material Design.", bannerImage: images.services.mobile },
  { slug: "react-native", title: "React Native", category: "mobile-applications", shortDescription: "Cross-platform mobile development with React.", bannerImage: images.services.mobile },
  { slug: "cross-platform-apps", title: "Cross-Platform Apps", category: "mobile-applications", shortDescription: "Unified mobile strategy with shared business logic.", bannerImage: images.services.mobile },
  { slug: "progressive-web-apps", title: "Progressive Web Apps", category: "mobile-applications", shortDescription: "Installable web apps with offline capability.", bannerImage: images.services.mobile },
  { slug: "aws-solutions", title: "AWS Solutions", category: "cloud", shortDescription: "Architecture and optimization on Amazon Web Services.", bannerImage: images.services.cloud },
  { slug: "azure-infrastructure", title: "Azure Infrastructure", category: "cloud", shortDescription: "Enterprise Microsoft Azure deployments.", bannerImage: images.services.cloud },
  { slug: "devops-cicd", title: "DevOps & CI/CD", category: "cloud", shortDescription: "Automated pipelines for continuous delivery.", bannerImage: images.services.cloud },
  { slug: "cloud-security", title: "Cloud Security", category: "cloud", shortDescription: "Zero-trust architecture and compliance monitoring.", bannerImage: images.services.cloud },
  { slug: "managed-cloud", title: "Managed Cloud Services", category: "cloud", shortDescription: "24/7 cloud operations and incident response.", bannerImage: images.services.cloud },
];

function createBasicService(partial: Partial<Service>): Service {
  return {
    slug: partial.slug!,
    title: partial.title!,
    category: partial.category!,
    shortDescription: partial.shortDescription!,
    longDescription:
      partial.longDescription ??
      `Team X Technologies delivers enterprise-grade ${partial.title?.toLowerCase()} solutions tailored to your organization's unique requirements. Our experienced engineering teams combine domain expertise with modern technology stacks to build scalable, secure, and maintainable systems that drive measurable business outcomes.`,
    bannerImage: partial.bannerImage ?? images.services.default,
    problems: partial.problems ?? [
      "Manual processes consuming valuable staff time",
      "Legacy systems limiting scalability and integration",
      "Data silos preventing unified business visibility",
      "Compliance gaps exposing regulatory risk",
    ],
    solutions: partial.solutions ?? [
      "Automated workflows reducing manual intervention",
      "Modern architecture enabling seamless integration",
      "Unified data platform for real-time insights",
      "Built-in compliance controls and audit trails",
    ],
    features: partial.features ?? [
      "Role-based access control and security",
      "Real-time dashboards and reporting",
      "API integration capabilities",
      "Mobile-responsive interface",
      "Automated notifications and alerts",
      "Audit logging and compliance reporting",
    ],
    benefits: partial.benefits ?? [
      "Increased operational efficiency",
      "Reduced manual errors and rework",
      "Improved decision-making with real-time data",
      "Enhanced customer and user satisfaction",
      "Scalable platform supporting business growth",
    ],
    modules: partial.modules ?? [],
    process: partial.process ?? defaultProcess,
    faqs: partial.faqs ?? [
      {
        question: "What is the typical implementation timeline?",
        answer:
          "Implementation timelines vary based on scope and complexity, typically ranging from 3-12 months. We provide detailed project plans during the discovery phase.",
      },
      {
        question: "Do you provide training and support?",
        answer:
          "Yes. We include user training, administrator certification, comprehensive documentation, and ongoing support with SLA-backed response times.",
      },
    ],
    relatedServices: partial.relatedServices ?? [],
    stats: partial.stats ?? [
      { label: "Projects Delivered", value: "50+" },
      { label: "Client Satisfaction", value: "96%" },
      { label: "Uptime SLA", value: "99.9%" },
    ],
    techStack: partial.techStack ?? [
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    pricingModels: partial.pricingModels ?? defaultPricing,
  };
}

export const allServices: Service[] = [
  ...services,
  ...additionalServices.map(createBasicService),
];

export function getServiceBySlug(slug: string): Service | undefined {
  return allServices.find((service) => service.slug === slug);
}

export function getServicesByCategory(category: string): Service[] {
  return allServices.filter((service) => service.category === category);
}

export function getRelatedServices(slug: string): Service[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return service.relatedServices
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((s): s is Service => s !== undefined);
}

export function getFeaturedServices(count = 6): Service[] {
  const featuredSlugs = [
    "core-banking-application",
    "hospital-management",
    "government-portal",
    "ai-chatbots",
    "cloud-migration",
    "custom-software-development",
  ];
  return featuredSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => s !== undefined)
    .slice(0, count);
}

export function searchServices(query: string): Service[] {
  const lowerQuery = query.toLowerCase();
  return allServices.filter(
    (service) =>
      service.title.toLowerCase().includes(lowerQuery) ||
      service.shortDescription.toLowerCase().includes(lowerQuery) ||
      service.category.toLowerCase().includes(lowerQuery)
  );
}
