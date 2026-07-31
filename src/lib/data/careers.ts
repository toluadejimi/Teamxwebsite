import { images } from "./images";

export interface JobListing {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  salary?: string;
  postedDate: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface HiringStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

export interface CulturePoint {
  title: string;
  description: string;
  icon: string;
}

export const companyBenefits: Benefit[] = [
  {
    title: "Competitive Compensation",
    description:
      "Market-leading salaries with annual reviews, performance bonuses, and equity participation for senior roles.",
    icon: "DollarSign",
  },
  {
    title: "Health & Wellness",
    description:
      "Comprehensive health insurance for you and dependents, mental health support, and annual wellness allowance.",
    icon: "Heart",
  },
  {
    title: "Flexible Work",
    description:
      "Remote-first culture with flexible hours. Work from anywhere with quarterly team gatherings.",
    icon: "Home",
  },
  {
    title: "Learning Budget",
    description:
      "$2,000 annual learning budget for courses, conferences, certifications, and books.",
    icon: "GraduationCap",
  },
  {
    title: "Equipment Allowance",
    description:
      "Top-tier laptop, monitor, and home office setup allowance for remote productivity.",
    icon: "Laptop",
  },
  {
    title: "Generous PTO",
    description:
      "25 days paid time off plus public holidays, parental leave, and sabbatical options for long-tenured employees.",
    icon: "Palmtree",
  },
  {
    title: "Team Events",
    description:
      "Regular team outings, annual company retreat, and celebration of milestones and achievements.",
    icon: "PartyPopper",
  },
  {
    title: "Career Growth",
    description:
      "Clear progression paths, mentorship programs, and internal mobility across projects and roles.",
    icon: "TrendingUp",
  },
];

export const hiringProcess: HiringStep[] = [
  {
    step: 1,
    title: "Application Review",
    description:
      "Our recruiting team reviews your application and portfolio. We look for relevant experience, problem-solving ability, and cultural alignment.",
    duration: "3-5 days",
  },
  {
    step: 2,
    title: "Recruiter Screen",
    description:
      "30-minute conversation to discuss your background, career goals, and the role. Opportunity to ask questions about Team X.",
    duration: "30 minutes",
  },
  {
    step: 3,
    title: "Technical Assessment",
    description:
      "Role-appropriate evaluation: coding challenge for engineers, case study for consultants, portfolio review for designers.",
    duration: "2-4 hours",
  },
  {
    step: 4,
    title: "Team Interviews",
    description:
      "Two to three interviews with potential teammates covering technical depth, system design, and collaboration style.",
    duration: "2-3 hours total",
  },
  {
    step: 5,
    title: "Leadership Conversation",
    description:
      "Final discussion with department lead about vision, expectations, and mutual fit. Offer extended to successful candidates.",
    duration: "45 minutes",
  },
];

export const culturePoints: CulturePoint[] = [
  {
    title: "Engineering Excellence",
    description:
      "We hold ourselves to high standards. Code reviews, automated testing, and continuous learning are non-negotiable.",
    icon: "Award",
  },
  {
    title: "Client Obsession",
    description:
      "Our success is measured by client outcomes. We embed with client teams, understand their challenges, and deliver lasting value.",
    icon: "Users",
  },
  {
    title: "Radical Transparency",
    description:
      "Open communication about project status, company direction, and decisions. No surprises, no politics.",
    icon: "Eye",
  },
  {
    title: "Continuous Learning",
    description:
      "Technology evolves rapidly. We invest in growth through training, conferences, and challenging projects.",
    icon: "BookOpen",
  },
  {
    title: "Work-Life Balance",
    description:
      "Sustainable pace over burnout. We plan realistically and respect boundaries between work and personal life.",
    icon: "Scale",
  },
  {
    title: "Diversity & Inclusion",
    description:
      "Diverse teams build better products. We actively cultivate inclusive environments where all voices are heard.",
    icon: "Globe",
  },
];

export const jobListings: JobListing[] = [
  {
    slug: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Lagos, Nigeria / Remote",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Join our engineering team building enterprise applications for banking, healthcare, and government clients. You'll architect solutions, mentor junior engineers, and deliver high-quality code across the stack.",
    responsibilities: [
      "Design and implement scalable backend services and frontend applications",
      "Lead technical decisions within project squads",
      "Conduct code reviews and mentor junior engineers",
      "Collaborate with clients to translate requirements into technical solutions",
      "Contribute to architectural standards and best practices",
      "Participate in on-call rotation for production support",
    ],
    requirements: [
      "5+ years professional software development experience",
      "Strong proficiency in TypeScript/JavaScript and at least one backend language (Java, Node.js, Python)",
      "Experience with React or similar frontend frameworks",
      "Solid understanding of database design and SQL",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Strong communication skills and client-facing experience",
    ],
    niceToHave: [
      "Experience in financial services or healthcare domains",
      "Kubernetes and container orchestration experience",
      "Contributions to open source projects",
      "System design interview experience",
    ],
    benefits: companyBenefits.map((b) => b.title),
    salary: "₦8M - ₦15M annually",
    postedDate: "2025-11-01",
  },
  {
    slug: "flutter-mobile-developer",
    title: "Flutter Mobile Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Build beautiful, performant mobile applications for enterprise clients using Flutter. Work on banking apps, healthcare platforms, and consumer applications reaching millions of users.",
    responsibilities: [
      "Develop cross-platform mobile applications using Flutter and Dart",
      "Implement pixel-perfect UI from design specifications",
      "Integrate with REST APIs and implement offline-first architectures",
      "Optimize app performance and reduce bundle size",
      "Write unit and widget tests for critical functionality",
      "Collaborate with backend teams on API design",
    ],
    requirements: [
      "3+ years mobile development experience with 2+ years Flutter",
      "Published apps on App Store and Google Play",
      "Strong understanding of mobile UI/UX patterns",
      "Experience with state management (Riverpod, Bloc, or Provider)",
      "Familiarity with CI/CD for mobile applications",
      "Experience with Firebase or similar backend services",
    ],
    niceToHave: [
      "Native iOS (Swift) or Android (Kotlin) experience",
      "Experience with biometric authentication and security",
      "Contributions to Flutter packages",
    ],
    benefits: companyBenefits.map((b) => b.title),
    salary: "₦6M - ₦12M annually",
    postedDate: "2025-10-28",
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Lagos, Nigeria / Remote",
    type: "Full-time",
    experience: "4+ years",
    description:
      "Build and maintain cloud infrastructure supporting mission-critical enterprise applications. Implement CI/CD pipelines, monitoring, and security controls across AWS and Azure environments.",
    responsibilities: [
      "Design and implement cloud infrastructure using Infrastructure as Code",
      "Build and maintain CI/CD pipelines for multiple projects",
      "Implement monitoring, alerting, and incident response procedures",
      "Manage Kubernetes clusters and container deployments",
      "Ensure security compliance and conduct regular audits",
      "Support development teams with deployment and troubleshooting",
    ],
    requirements: [
      "4+ years DevOps or SRE experience",
      "Strong AWS or Azure experience with certifications preferred",
      "Proficiency with Terraform or CloudFormation",
      "Experience with Kubernetes in production environments",
      "Strong scripting skills (Python, Bash)",
      "Experience with monitoring tools (Prometheus, Grafana, Datadog)",
    ],
    niceToHave: [
      "Experience with financial services compliance requirements",
      "GitOps workflow experience (ArgoCD, Flux)",
      "Security certifications (CISSP, AWS Security)",
    ],
    benefits: companyBenefits.map((b) => b.title),
    salary: "₦7M - ₦14M annually",
    postedDate: "2025-10-25",
  },
  {
    slug: "ai-ml-engineer",
    title: "AI/ML Engineer",
    department: "AI Practice",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Develop and deploy machine learning solutions for enterprise clients. Build chatbots, predictive models, and intelligent automation systems that deliver measurable business value.",
    responsibilities: [
      "Design and implement ML models for client use cases",
      "Build RAG architectures and fine-tune LLMs for domain applications",
      "Deploy models to production with monitoring and retraining pipelines",
      "Collaborate with engineering teams on AI integration",
      "Research and evaluate new AI technologies and techniques",
      "Document solutions and present findings to clients",
    ],
    requirements: [
      "3+ years experience in machine learning or data science",
      "Strong Python skills and ML framework experience (PyTorch, TensorFlow)",
      "Experience with LLMs, prompt engineering, and RAG architectures",
      "Experience deploying ML models to production",
      "Understanding of MLOps practices and tools",
      "Strong problem-solving and communication skills",
    ],
    niceToHave: [
      "Experience with LangChain, LlamaIndex, or similar frameworks",
      "NLP experience with multilingual models",
      "Publications or contributions to AI community",
    ],
    benefits: companyBenefits.map((b) => b.title),
    salary: "₦8M - ₦16M annually",
    postedDate: "2025-10-20",
  },
  {
    slug: "ux-ui-designer",
    title: "Senior UX/UI Designer",
    department: "Design",
    location: "Lagos, Nigeria / Remote",
    type: "Full-time",
    experience: "4+ years",
    description:
      "Create intuitive, accessible interfaces for complex enterprise applications. Lead design from research through implementation, working closely with engineering and client stakeholders.",
    responsibilities: [
      "Conduct user research and translate findings into design requirements",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Develop and maintain design systems",
      "Collaborate with engineers to ensure design fidelity",
      "Present designs to clients and incorporate feedback",
      "Advocate for accessibility and inclusive design",
    ],
    requirements: [
      "4+ years UX/UI design experience",
      "Strong portfolio demonstrating enterprise application design",
      "Proficiency in Figma and prototyping tools",
      "Experience with design systems and component libraries",
      "Understanding of frontend development constraints",
      "Excellent communication and presentation skills",
    ],
    niceToHave: [
      "Experience in financial services, healthcare, or government",
      "Front-end development skills (HTML, CSS, React)",
      "Accessibility certification (CPACC, WAS)",
    ],
    benefits: companyBenefits.map((b) => b.title),
    salary: "₦5M - ₦10M annually",
    postedDate: "2025-10-15",
  },
  {
    slug: "project-manager",
    title: "Technical Project Manager",
    department: "Delivery",
    location: "Lagos, Nigeria",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Lead enterprise software projects from inception through delivery. Coordinate cross-functional teams, manage client relationships, and ensure projects deliver on time and within scope.",
    responsibilities: [
      "Plan and manage software development projects using Agile methodologies",
      "Coordinate cross-functional teams including engineers, designers, and QA",
      "Manage client relationships and expectations",
      "Track project metrics, budgets, and timelines",
      "Identify and mitigate project risks",
      "Facilitate ceremonies and maintain project documentation",
    ],
    requirements: [
      "5+ years project management experience in software development",
      "PMP, Scrum Master, or similar certification",
      "Experience managing enterprise client projects",
      "Strong understanding of software development lifecycle",
      "Excellent communication and stakeholder management skills",
      "Experience with project management tools (Jira, Asana, MS Project)",
    ],
    niceToHave: [
      "Technical background or CS degree",
      "Experience in financial services or government projects",
      "PMP or PRINCE2 certification",
    ],
    benefits: companyBenefits.map((b) => b.title),
    salary: "₦6M - ₦12M annually",
    postedDate: "2025-10-10",
  },
  {
    slug: "qa-engineer",
    title: "Senior QA Engineer",
    department: "Quality Assurance",
    location: "Remote",
    type: "Full-time",
    experience: "4+ years",
    description:
      "Ensure quality across enterprise applications through manual and automated testing. Build test frameworks, define quality standards, and champion quality throughout the development lifecycle.",
    responsibilities: [
      "Develop and execute test plans for web and mobile applications",
      "Build and maintain automated test suites (Playwright, Cypress, Appium)",
      "Perform API testing and integration testing",
      "Conduct performance and security testing",
      "Define quality metrics and reporting",
      "Mentor junior QA engineers",
    ],
    requirements: [
      "4+ years QA experience in software development",
      "Strong experience with test automation frameworks",
      "Experience with API testing tools (Postman, REST Assured)",
      "Understanding of CI/CD integration for tests",
      "Experience with Agile testing methodologies",
      "Strong attention to detail and analytical skills",
    ],
    niceToHave: [
      "Performance testing experience (JMeter, k6)",
      "Security testing knowledge",
      "Programming skills (JavaScript, Python)",
    ],
    benefits: companyBenefits.map((b) => b.title),
    salary: "₦5M - ₦10M annually",
    postedDate: "2025-10-05",
  },
  {
    slug: "business-analyst",
    title: "Business Analyst",
    department: "Consulting",
    location: "Lagos, Nigeria",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Bridge business and technology by gathering requirements, analyzing processes, and defining solutions for enterprise clients in banking, healthcare, and government sectors.",
    responsibilities: [
      "Conduct stakeholder interviews and requirements workshops",
      "Document business requirements and user stories",
      "Create process maps and workflow diagrams",
      "Support solution design and validation",
      "Assist with user acceptance testing",
      "Create training materials and documentation",
    ],
    requirements: [
      "3+ years business analysis experience",
      "Experience in financial services, healthcare, or government",
      "Strong requirements documentation skills",
      "Proficiency with diagramming tools (Visio, Lucidchart, Miro)",
      "Understanding of software development processes",
      "Excellent communication and facilitation skills",
    ],
    niceToHave: [
      "CBAP or similar certification",
      "Technical background or ability to read code",
      "Experience with Agile requirements practices",
    ],
    benefits: companyBenefits.map((b) => b.title),
    salary: "₦4M - ₦8M annually",
    postedDate: "2025-09-28",
  },
  {
    slug: "java-backend-developer",
    title: "Java Backend Developer",
    department: "Engineering",
    location: "Lagos, Nigeria / Remote",
    type: "Full-time",
    experience: "4+ years",
    description:
      "Build robust backend systems for core banking, healthcare, and enterprise applications using Java and Spring ecosystem. Work on high-transaction systems requiring reliability and performance.",
    responsibilities: [
      "Design and implement RESTful APIs and microservices",
      "Develop business logic for financial and healthcare applications",
      "Optimize database queries and application performance",
      "Implement security controls and authentication",
      "Write unit and integration tests",
      "Participate in code reviews and architectural discussions",
    ],
    requirements: [
      "4+ years Java development experience",
      "Strong Spring Boot and Spring ecosystem knowledge",
      "Experience with relational databases (PostgreSQL, Oracle)",
      "Understanding of microservices architecture patterns",
      "Experience with message queues (Kafka, RabbitMQ)",
      "Knowledge of security best practices",
    ],
    niceToHave: [
      "Core banking or financial services experience",
      "Experience with HL7/FHIR in healthcare",
      "Kubernetes deployment experience",
    ],
    benefits: companyBenefits.map((b) => b.title),
    salary: "₦7M - ₦14M annually",
    postedDate: "2025-09-20",
  },
];

export const careersPageContent = {
  hero: {
    title: "Build the Future of Enterprise Software",
    subtitle:
      "Join 150+ engineers, designers, and consultants delivering transformative solutions for Africa's leading organizations.",
    image: images.careers.culture,
  },
  whyJoin: {
    title: "Why Team X?",
    description:
      "We're not a body shop—we're a team of craftspeople who take pride in building software that matters. Work on challenging projects, learn continuously, and grow your career with mentors who've shipped enterprise systems at scale.",
  },
};

export function getJobBySlug(slug: string): JobListing | undefined {
  return jobListings.find((job) => job.slug === slug);
}

export function getJobsByDepartment(department: string): JobListing[] {
  return jobListings.filter(
    (job) => job.department.toLowerCase() === department.toLowerCase()
  );
}

export function getOpenPositions(): JobListing[] {
  return jobListings.sort(
    (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  );
}

export function getDepartments(): string[] {
  return [...new Set(jobListings.map((job) => job.department))];
}

export function searchJobs(query: string): JobListing[] {
  const lowerQuery = query.toLowerCase();
  return jobListings.filter(
    (job) =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.department.toLowerCase().includes(lowerQuery) ||
      job.description.toLowerCase().includes(lowerQuery)
  );
}
