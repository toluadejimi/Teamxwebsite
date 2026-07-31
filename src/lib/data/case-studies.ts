import { images } from "./images";

export interface CaseStudyMetric {
  label: string;
  value: string;
  description?: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  service: string;
  duration: string;
  teamSize: number;
  image: string;
  summary: string;
  challenge: string;
  planning: string;
  design: string;
  architecture: string;
  development: string;
  testing: string;
  deployment: string;
  results: string;
  testimonial: CaseStudyTestimonial;
  metrics: CaseStudyMetric[];
  technologies: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "unity-bank-digital-transformation",
    title: "Unity Bank Digital Transformation",
    client: "Unity Bank Plc",
    industry: "Financial Services",
    service: "Core Banking Application",
    duration: "18 months",
    teamSize: 45,
    image: images.portfolio.banking,
    summary:
      "Complete modernization of legacy mainframe core banking system serving 2.5 million customers, enabling digital channels and reducing operational costs by 40%.",
    challenge:
      "Unity Bank operated on a 25-year-old mainframe core banking system that couldn't support modern digital channels. End-of-day processing took 4 hours, blocking real-time services. Mobile banking launch had been delayed twice due to integration failures. Regulatory reporting required 15 staff days monthly for manual compilation. The bank faced competitive pressure from digital-first neobanks while technical debt accumulated with each workaround.",
    planning:
      "Team X conducted a 6-week discovery phase including stakeholder interviews across retail banking, IT, compliance, and operations. We mapped 847 business processes, identified 23 integration points, and assessed data quality across 15 legacy databases. A phased migration strategy was developed with parallel run validation, prioritizing customer-facing modules first. Risk mitigation included rollback procedures, data reconciliation frameworks, and dedicated war room protocols for cutover weekends.",
    design:
      "UX workshops with branch staff and customers informed mobile-first interface designs. Information architecture separated retail, corporate, and agency banking workflows. Design system established consistent patterns for transaction flows, account management, and reporting. Accessibility compliance (WCAG 2.1) ensured inclusive access. Interactive prototypes validated with 50 branch managers before development commenced.",
    architecture:
      "Microservices architecture deployed on Kubernetes with domain-driven design boundaries: Customer, Accounts, Lending, Treasury, and Reporting services. Event-driven communication via Apache Kafka ensured loose coupling and audit trails. PostgreSQL for transactional data with read replicas for reporting. Redis caching for session management and rate limiting. API Gateway with OAuth 2.0 secured all external integrations. Multi-region deployment provided disaster recovery with 15-minute RPO.",
    development:
      "Four agile squads delivered in 2-week sprints over 14 months. Squad Alpha focused on customer and account modules. Squad Beta delivered lending and treasury. Squad Gamma built integration adapters and APIs. Squad Delta handled reporting and compliance. Continuous integration deployed to staging daily. Code review gates and automated security scanning maintained quality. Bi-weekly demos kept stakeholders aligned with incremental delivery.",
    testing:
      "Comprehensive test strategy included unit tests (85% coverage), integration tests for all API endpoints, and end-to-end scenarios covering 200 critical user journeys. Performance testing validated 10,000 TPS capacity. Security penetration testing by third-party firm identified and remediated vulnerabilities. User acceptance testing involved 150 bank staff across 20 branches over 8 weeks. Parallel run compared 30 days of legacy vs. new system outputs with 100% reconciliation.",
    deployment:
      "Phased rollout began with pilot branch (2 weeks), expanded to region (4 weeks), then national deployment over 8 weeks. Blue-green deployment enabled instant rollback capability. 24/7 command center staffed during cutover weekends. Data migration executed in 4-hour windows with incremental sync. Training delivered to 1,800 staff through blended online and in-person sessions. Hypercare support provided for 90 days post-launch.",
    results:
      "Unity Bank successfully migrated 2.5 million customer accounts with zero data loss. End-of-day processing reduced from 4 hours to 22 minutes. Mobile banking launched serving 800,000 active users within 6 months. Regulatory report generation automated, saving 320 staff hours monthly. System availability exceeded 99.99% SLA. The bank reduced operational costs by 40% while increasing transaction capacity 5x.",
    testimonial: {
      quote:
        "Team X didn't just deliver technology—they transformed our bank. Their methodical approach to migration gave us confidence during the most critical cutover weekend of our 40-year history. Today we're competing with neobanks on digital experience while maintaining the trust our customers expect.",
      author: "Adewale Okonkwo",
      role: "Chief Technology Officer",
      company: "Unity Bank Plc",
    },
    metrics: [
      { label: "Processing Time Reduction", value: "94%", description: "End-of-day batch processing" },
      { label: "Mobile Banking Users", value: "800K", description: "Within 6 months of launch" },
      { label: "System Availability", value: "99.99%", description: "First year post-migration" },
      { label: "Operational Cost Savings", value: "40%", description: "Annual IT operations" },
      { label: "Transaction Capacity", value: "5x", description: "Peak throughput increase" },
    ],
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Kafka", "Kubernetes", "React", "Redis"],
  },
  {
    slug: "lagos-citizen-portal",
    title: "Lagos State Citizen Services Portal",
    client: "Lagos State Government",
    industry: "Government",
    service: "Government Portal",
    duration: "24 months",
    teamSize: 38,
    image: images.portfolio.government,
    summary:
      "Digital transformation of 120 government services serving 1.8 million registered citizens with 70% reduction in processing times.",
    challenge:
      "Lagos State's 25 million residents faced average 6-hour queue times at service centers for basic transactions like business registration and land records. Manual paper-based processes caused 40% application rejection rates. Revenue collection lagged projections due to cash-only payment requirements. Multiple agencies operated siloed systems with no citizen identity federation. Digital transformation mandates required measurable progress within 24 months.",
    planning:
      "Team X partnered with Lagos State Ministry of Science and Technology to catalog 340 citizen-facing services, prioritizing top 120 by volume and revenue impact. Service design workshops mapped current-state journeys identifying pain points. Change management strategy addressed civil servant concerns about automation. Phased rollout plan prioritized high-volume services first. Integration requirements documented for 15 legacy agency systems.",
    design:
      "Citizen-centric design prioritized mobile-first access given smartphone penetration rates. Guided application workflows reduced rejection rates with inline validation and document checklists. Multi-language support (English, Yoruba, Pidgin) ensured inclusive access. Admin interfaces designed for case workers with queue management and SLA tracking. Public dashboards provided transparency on service performance metrics.",
    architecture:
      "Modular platform with citizen identity module, service catalog engine, workflow orchestration, and payment gateway integration. Keycloak provided federated identity with integration to national ID database. Microservices deployed on AWS with auto-scaling for registration peaks. Document storage on S3 with encryption. USSD gateway extended access to feature phone users. API gateway enabled inter-agency data exchange.",
    development:
      "Development organized around service categories: Business Services, Land & Property, Tax & Revenue, Social Services. Each category delivered as incremental release every 6 weeks. Shared platform components (identity, payments, notifications) developed by platform squad. Integration adapters built for each legacy agency system. Content management enabled non-technical staff to update service descriptions.",
    testing:
      "Accessibility testing ensured WCAG 2.1 AA compliance. Load testing validated 50,000 concurrent users during registration campaigns. Security assessment included penetration testing and code review. Pilot testing with 5,000 citizens in selected LGAs before statewide rollout. Agency staff UAT validated case management workflows.",
    deployment:
      "Statewide rollout over 6 months following successful LGA pilots. Marketing campaign drove citizen registration. Service center staff trained as digital ambassadors assisting citizens with portal adoption. Payment gateway integration with major banks and mobile money providers. 24/7 support hotline established for citizen assistance.",
    results:
      "1.8 million citizens registered on portal within first year. Average service processing time reduced from 14 days to 48 hours. Application rejection rate dropped from 40% to 8%. Digital payment adoption reached 82%, increasing revenue collection by ₦12 billion annually. Citizen satisfaction scores improved from 2.1 to 4.2 out of 5.",
    testimonial: {
      quote:
        "This portal has fundamentally changed how Lagos citizens interact with their government. What once required a day off work and hours in queue now happens on a smartphone in minutes. Team X understood the complexity of government processes and delivered a solution that civil servants actually want to use.",
      author: "Dr. Olumide Akintola",
      role: "Commissioner for Science & Technology",
      company: "Lagos State Government",
    },
    metrics: [
      { label: "Citizens Registered", value: "1.8M", description: "First year adoption" },
      { label: "Processing Time", value: "70%", description: "Reduction in average turnaround" },
      { label: "Digital Payments", value: "82%", description: "Adoption rate" },
      { label: "Revenue Increase", value: "₦12B", description: "Annual collection improvement" },
      { label: "Services Digitized", value: "120", description: "Citizen-facing services" },
    ],
    technologies: ["Java", "React", "PostgreSQL", "Keycloak", "AWS", "Redis", "USSD Gateway"],
  },
  {
    slug: "medplus-healthcare-network",
    title: "MedPlus Healthcare Network Integration",
    client: "MedPlus Healthcare Group",
    industry: "Healthcare",
    service: "Hospital Management System",
    duration: "14 months",
    teamSize: 32,
    image: images.portfolio.healthcare,
    summary:
      "Unified hospital management system across 12 facilities managing 15,000 daily patient encounters with 38% wait time reduction.",
    challenge:
      "MedPlus operated 12 hospital facilities on disconnected systems with no unified patient records. Patients repeating medical histories at each visit. Billing errors caused estimated 8% revenue leakage. Laboratory results averaged 48 hours to reach clinicians. Pharmacy stockouts of critical medications occurred weekly. NHIS claims processing delays impacted cash flow. Leadership lacked consolidated view of network performance.",
    planning:
      "Current-state assessment across all 12 facilities documented workflow variations and integration requirements. Standardization workshops with clinical leads established unified protocols while respecting facility-specific needs. Phased rollout prioritized highest-volume facilities. Data migration strategy addressed 10 years of patient records across disparate systems. Training plan developed for 2,500 clinical and administrative staff.",
    design:
      "Clinical workflow design followed patient journey from registration through discharge. Nursing station dashboards optimized for ward rounds. Physician interfaces minimized clicks for common orders. Patient portal designed for appointment booking and result access. Mobile apps for nurses enabled bedside documentation. Accessibility considered for aging patient population.",
    architecture:
      "Centralized HMS with facility-specific configuration. HL7 FHIR integration layer connected laboratory analyzers and imaging systems. Master patient index deduplicated records across facilities. PostgreSQL with partitioning for performance at scale. Redis for session and cache management. Disaster recovery with warm standby datacenter.",
    development:
      "Core platform squad delivered shared modules while facility squads customized workflows. Integration development parallelized with core modules. Laboratory and pharmacy modules prioritized for revenue impact. NHIS claims automation developed with payer-specific rules engine. Mobile apps developed in Flutter for iOS and Android.",
    testing:
      "Clinical scenario testing with physician and nursing focus groups. Integration testing with laboratory equipment vendors. Performance testing validated 15,000 daily encounters. Security assessment for PHI compliance. Parallel operation at pilot facility for 60 days before network rollout.",
    deployment:
      "Facility rollout over 8 months, two facilities per month. Super-users trained at each facility for peer support. Legacy system decommissioned only after 30-day parallel validation. 24/7 clinical support hotline during transition periods.",
    results:
      "Unified patient records across all 12 facilities. Patient wait times reduced 38%. Billing accuracy improved to 99.4%. Laboratory result turnaround reduced to 4 hours. Pharmacy stockouts reduced 75%. NHIS claims processing automated with 95% first-pass acceptance. Telemedicine module enabled 25,000 monthly virtual consultations.",
    testimonial: {
      quote:
        "Team X understood that healthcare software isn't just about features—it's about clinical workflows that save lives. Their team spent weeks in our hospitals observing how care is actually delivered. The result is a system our doctors and nurses trust.",
      author: "Dr. Chioma Eze",
      role: "Chief Medical Officer",
      company: "MedPlus Healthcare Group",
    },
    metrics: [
      { label: "Wait Time Reduction", value: "38%", description: "Patient encounter time" },
      { label: "Billing Accuracy", value: "99.4%", description: "Revenue capture rate" },
      { label: "Lab Turnaround", value: "4 hrs", description: "Down from 48 hours" },
      { label: "Daily Encounters", value: "15K", description: "Managed across network" },
      { label: "Telemedicine Visits", value: "25K/mo", description: "Virtual consultations" },
    ],
    technologies: ["Java", "React", "PostgreSQL", "HL7/FHIR", "Flutter", "Docker", "AWS"],
  },
  {
    slug: "swiftlogistics-ai-optimization",
    title: "SwiftLogistics AI Route Optimization",
    client: "SwiftLogistics Nigeria Ltd",
    industry: "Logistics",
    service: "Fleet Management",
    duration: "12 months",
    teamSize: 24,
    image: images.portfolio.logistics,
    summary:
      "AI-powered fleet management platform optimizing 3,500 vehicles with 22% fuel cost reduction and 94% on-time delivery.",
    challenge:
      "SwiftLogistics operated 3,500 vehicles across West Africa with limited visibility into fleet locations. Manual dispatch based on phone calls caused inefficient routing. Fuel costs consumed 35% of operating budget with suspected theft unprovable. Vehicle breakdowns caused 15% delivery failures with no predictive maintenance. Customer complaints about delivery visibility dominated support channels.",
    planning:
      "Fleet audit documented vehicle types, routes, and operational patterns. Telematics vendor evaluation selected IoT devices compatible with vehicle mix. ML team analyzed 2 years of historical delivery data to identify optimization opportunities. Change management addressed driver concerns about monitoring. Pilot program designed for Lagos metropolitan routes.",
    design:
      "Dispatcher dashboard prioritized exception management over routine monitoring. Driver mobile app designed for one-handed operation during deliveries. Customer tracking portal provided ETA updates with proof of delivery photos. Manager analytics focused on actionable KPIs: fuel efficiency, on-time rate, maintenance alerts.",
    architecture:
      "IoT ingestion pipeline processed GPS and CAN bus telemetry via AWS IoT Core. Time-series database (TimescaleDB) stored vehicle metrics. ML models deployed on SageMaker for route optimization and predictive maintenance. Real-time tracking via WebSocket connections. Mobile apps built in Flutter with offline capability.",
    development:
      "Platform squad delivered tracking infrastructure. ML squad developed route optimization and maintenance prediction models. Integration squad connected customer ERP systems for automated dispatch. Mobile squad built driver and customer applications. Iterative model training improved optimization accuracy over 6 months of production data.",
    testing:
      "Pilot deployment on 200 vehicles validated tracking accuracy and driver app usability. A/B testing compared optimized vs. manual routes measuring fuel consumption and delivery times. Load testing validated 3,500 concurrent vehicle tracking. Security assessment for fleet data protection.",
    deployment:
      "Phased rollout by region over 6 months. Driver training included app usage and fuel efficiency best practices. Customer notification campaign introduced tracking portal. Legacy dispatch system retired after full fleet migration.",
    results:
      "Real-time visibility across 3,500 vehicles. On-time delivery improved from 78% to 94%. Fuel costs reduced 22% through optimized routing and theft detection. Unplanned breakdowns decreased 45% via predictive maintenance. Customer NPS increased 28 points. Platform processed 50,000 daily deliveries.",
    testimonial: {
      quote:
        "The ROI was visible within 90 days. Fuel savings alone covered the project investment. But the real win is customer trust—when we say a delivery arrives at 2pm, it arrives at 2pm. Team X's AI team understood logistics isn't theoretical—it's trucks on bad roads with unpredictable traffic.",
      author: "Ibrahim Musa",
      role: "Chief Operations Officer",
      company: "SwiftLogistics Nigeria Ltd",
    },
    metrics: [
      { label: "On-Time Delivery", value: "94%", description: "Up from 78%" },
      { label: "Fuel Cost Reduction", value: "22%", description: "Annual savings" },
      { label: "Breakdown Reduction", value: "45%", description: "Unplanned maintenance" },
      { label: "NPS Improvement", value: "+28", description: "Customer satisfaction" },
      { label: "Vehicles Managed", value: "3,500", description: "Real-time tracking" },
    ],
    technologies: ["Python", "React", "PostgreSQL", "TimescaleDB", "AWS IoT", "SageMaker", "Flutter"],
  },
  {
    slug: "shopmart-retail-transformation",
    title: "ShopMart Omnichannel Retail Transformation",
    client: "ShopMart Retail Group",
    industry: "Retail",
    service: "Omnichannel Retail",
    duration: "11 months",
    teamSize: 28,
    image: images.portfolio.retail,
    summary:
      "Unified commerce platform connecting 85 stores with e-commerce, achieving 180% online revenue growth and 98.5% inventory accuracy.",
    challenge:
      "ShopMart's 85 retail stores and e-commerce operated on disconnected systems. Online orders frequently cancelled due to inventory discrepancies. No unified customer view prevented personalized marketing. Loyalty program penetration stuck at 12%. Click-and-collect implementation failed twice due to integration complexity. Competitors with unified commerce gained market share.",
    planning:
      "Omnichannel maturity assessment identified capability gaps. Customer journey mapping revealed friction points between channels. Inventory accuracy audit at 10 pilot stores quantified discrepancy sources. Vendor consolidation reduced integration complexity. Rollout plan prioritized high-volume stores and e-commerce integration.",
    design:
      "Customer app unified browsing, purchasing, and loyalty across channels. Store associate app enabled endless aisle and clienteling. Admin dashboard provided inventory visibility and promotion management. Checkout optimized for mobile conversion. Store locator integrated inventory availability.",
    architecture:
      "Event-driven architecture synchronized inventory across channels in near-real-time. Customer data platform unified profiles from POS, e-commerce, and loyalty. Order management orchestrated fulfillment from store or warehouse. PostgreSQL with read replicas for reporting. Redis for cart and session management.",
    development:
      "Inventory squad delivered real-time sync engine. Commerce squad built e-commerce and mobile app. Store squad developed POS integration and associate tools. Loyalty squad implemented points engine and personalized offers. Phased store rollout enabled iterative refinement.",
    testing:
      "Inventory sync testing validated accuracy under concurrent transactions. Peak load testing simulated Black Friday traffic. Store associate UAT at pilot locations. Customer journey testing across all touchpoints.",
    deployment:
      "E-commerce launch followed by store rollout (10 stores per month). Staff training on endless aisle and clienteling capabilities. Marketing campaign drove app downloads and loyalty enrollment. Legacy e-commerce platform decommissioned after migration.",
    results:
      "Online revenue grew 180% in first year. Inventory accuracy reached 98.5%. Loyalty enrollment increased from 12% to 45%. Average order value up 23%. Click-and-collect orders reached 15% of online sales. Customer lifetime value increased 35%.",
    testimonial: {
      quote:
        "We finally have one view of our customer and one view of our inventory. That sounds simple but took years and two failed attempts with other vendors. Team X's event-driven architecture was the breakthrough—we see inventory changes in seconds, not hours.",
      author: "Funke Adeyemi",
      role: "Chief Digital Officer",
      company: "ShopMart Retail Group",
    },
    metrics: [
      { label: "Online Revenue Growth", value: "180%", description: "First year" },
      { label: "Inventory Accuracy", value: "98.5%", description: "Cross-channel sync" },
      { label: "Loyalty Enrollment", value: "45%", description: "Up from 12%" },
      { label: "Average Order Value", value: "+23%", description: "Cross-channel customers" },
      { label: "Stores Connected", value: "85", description: "Unified platform" },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS", "React Native"],
  },
  {
    slug: "telecom-ai-customer-care",
    title: "Telecom AI Customer Care Transformation",
    client: "Major Telecom Operator",
    industry: "Telecommunications",
    service: "AI Chatbots",
    duration: "7 months",
    teamSize: 18,
    image: images.portfolio.telecom,
    summary:
      "Multilingual AI assistant handling 2 million monthly interactions with 82% automated resolution and ₦450M annual savings.",
    challenge:
      "Call center handled 80,000 daily calls with 45-minute average wait times during peaks. 70% of queries were repetitive: balance checks, bundle purchases, and service status. Agent turnover exceeded 40% annually due to repetitive work. WhatsApp inquiries growing 200% year-over-year with no automated handling. Customer satisfaction scores declining despite increased staffing.",
    planning:
      "Conversation mining analyzed 500,000 historical calls identifying top 50 intent categories. Language requirements included English, Hausa, Yoruba, and Igbo. Channel strategy prioritized WhatsApp given customer preference. Human handoff protocols defined for complex issues. Success metrics established: containment rate, CSAT, cost per contact.",
    design:
      "Conversational flows designed for natural dialogue with quick reply options. Persona development created consistent brand voice across languages. Agent desktop designed for seamless handoff with full conversation context. Analytics dashboard highlighted improvement opportunities.",
    architecture:
      "LLM-powered conversation engine with RAG architecture grounding responses in knowledge base. Intent classification routed queries to specialized handlers. CRM integration provided customer context. WhatsApp Business API for messaging channel. Voice bot integrated with existing IVR via SIP. Analytics pipeline captured conversation outcomes for model improvement.",
    development:
      "NLP squad fine-tuned models on telecom domain terminology. Integration squad connected billing, CRM, and provisioning systems. Channel squad implemented WhatsApp and web chat interfaces. Voice squad integrated with telephony infrastructure. Continuous learning pipeline improved accuracy from 72% to 89% over 4 months.",
    testing:
      "Conversation testing with native speakers validated language quality. Adversarial testing identified edge cases and inappropriate responses. Load testing validated 10,000 concurrent conversations. Pilot deployment handled 5% of traffic before full rollout.",
    deployment:
      "Gradual traffic shift from 5% to 100% over 8 weeks. Agent training on new escalation workflows. Customer communication introduced AI assistant capabilities. Continuous monitoring with human review of flagged conversations.",
    results:
      "82% of customer queries resolved without human agent. Average wait time reduced from 45 minutes to under 2 minutes. Call center costs reduced ₦450 million annually. WhatsApp channel handled 60% of digital interactions. Customer satisfaction improved 15 points. Agent satisfaction increased with focus on complex, rewarding interactions.",
    testimonial: {
      quote:
        "Our customers don't care if they're talking to AI or a human—they care about getting answers fast. Team X's multilingual models actually understand Nigerian English and local languages better than some of our agents. The ROI exceeded our business case within 4 months.",
      author: "Ngozi Okoro",
      role: "VP Customer Experience",
      company: "Major Telecom Operator",
    },
    metrics: [
      { label: "Automated Resolution", value: "82%", description: "Without human agent" },
      { label: "Wait Time", value: "<2 min", description: "Down from 45 minutes" },
      { label: "Annual Savings", value: "₦450M", description: "Call center costs" },
      { label: "Monthly Interactions", value: "2M", description: "AI-handled conversations" },
      { label: "CSAT Improvement", value: "+15", description: "Customer satisfaction points" },
    ],
    technologies: ["Python", "LangChain", "FastAPI", "PostgreSQL", "WhatsApp API", "React", "AWS"],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  return caseStudies.filter(
    (study) => study.industry.toLowerCase() === industry.toLowerCase()
  );
}

export function getFeaturedCaseStudies(count = 3): CaseStudy[] {
  return caseStudies.slice(0, count);
}

export function searchCaseStudies(query: string): CaseStudy[] {
  const lowerQuery = query.toLowerCase();
  return caseStudies.filter(
    (study) =>
      study.title.toLowerCase().includes(lowerQuery) ||
      study.client.toLowerCase().includes(lowerQuery) ||
      study.industry.toLowerCase().includes(lowerQuery) ||
      study.summary.toLowerCase().includes(lowerQuery)
  );
}
