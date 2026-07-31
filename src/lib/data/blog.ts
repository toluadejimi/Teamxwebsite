import { images } from "./images";

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: BlogAuthor;
  date: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
}

export const blogAuthors: BlogAuthor[] = [
  {
    name: "Emeka Nwosu",
    role: "Chief Technology Officer",
    avatar: images.testimonials.executive,
  },
  {
    name: "Sarah Okafor",
    role: "Head of Engineering",
    avatar: images.testimonials.techLead,
  },
  {
    name: "David Chen",
    role: "Principal Architect",
    avatar: images.testimonials.product,
  },
  {
    name: "Amara Bello",
    role: "AI Practice Lead",
    avatar: images.testimonials.techLead,
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "microservices-core-banking-architecture",
    title: "Why Microservices Architecture Is Essential for Modern Core Banking",
    excerpt:
      "Legacy monolithic core banking systems are reaching their limits. Here's how microservices architecture enables banks to compete with digital-first challengers while maintaining regulatory compliance.",
    content: `The banking industry stands at an inflection point. Digital-native neobanks launch new products in weeks while traditional institutions struggle with months-long release cycles tied to monolithic core systems built decades ago. At Team X Technologies, we've helped 15 banks navigate this transformation, and the pattern is clear: microservices architecture isn't optional—it's survival.

## The Monolith Problem

Traditional core banking systems bundle customer management, accounts, lending, treasury, and reporting into tightly coupled codebases. A change to loan interest calculation might require regression testing the entire system. End-of-day batch processing locks the database for hours. Adding a mobile banking feature means navigating layers of legacy code with diminishing returns.

We've seen banks spend ₦500 million on "enhancements" that delivered marginal improvements because the underlying architecture couldn't support modern requirements.

## The Microservices Alternative

Microservices decompose core banking into bounded domains: Customer, Accounts, Lending, Treasury, Payments, and Reporting. Each service owns its data, exposes well-defined APIs, and deploys independently. When Unity Bank needed real-time balance updates for mobile banking, we deployed an enhanced Accounts service without touching Lending or Treasury.

Event-driven communication via message queues ensures loose coupling while maintaining audit trails regulators require. When a loan is disbursed, an event triggers account crediting, general ledger posting, and notification services—each operating independently with guaranteed delivery.

## Migration Without Disruption

The fear of "big bang" migration keeps many banks trapped in legacy systems. Our approach uses the strangler fig pattern: new services handle new requirements while adapters integrate with legacy systems for existing data. Over 18 months, Unity Bank migrated 2.5 million accounts with zero downtime events.

Parallel run validation compares legacy and new system outputs for months before cutover. Rollback procedures remain ready until confidence is established. This isn't reckless innovation—it's methodical transformation.

## Regulatory Considerations

Central banks rightly scrutinize core banking changes. Microservices actually improve compliance posture: audit trails are granular, reporting services generate regulator-ready outputs automatically, and security controls apply consistently via API gateways.

We've automated 50+ regulatory reports across our banking implementations, saving compliance teams hundreds of hours monthly while reducing error rates.

## Getting Started

Transformation begins with honest assessment: Which capabilities limit your competitive response? Where do integration failures block digital initiatives? What would real-time processing enable?

Start with bounded scope—a single product line, a specific channel, a reporting requirement. Prove the architecture works, build organizational confidence, then expand. The banks winning today started this journey years ago. The second-best time to start is now.`,
    author: blogAuthors[0],
    date: "2025-11-15",
    category: "Engineering",
    image: images.blog.engineering,
    readTime: "8 min read",
    tags: ["Core Banking", "Microservices", "Architecture", "FinTech"],
  },
  {
    slug: "enterprise-ai-chatbot-implementation-guide",
    title: "Enterprise AI Chatbot Implementation: A Practical Guide",
    excerpt:
      "Deploying AI chatbots in enterprise environments requires more than connecting to ChatGPT. Learn the architecture, governance, and integration patterns that deliver ROI.",
    content: `Every enterprise is exploring AI chatbots, but success rates vary wildly. We've deployed conversational AI handling 2 million monthly interactions for a major telecom, and the difference between projects that deliver ROI and those that become expensive experiments comes down to architecture and governance.

## Start With Use Cases, Not Technology

The technology is now commoditized—LLMs, vector databases, and orchestration frameworks abound. Success starts with rigorous use case selection. Analyze your support tickets and call transcripts. Which queries are repetitive, well-documented, and low-risk?

Our telecom client found 70% of calls were balance checks, bundle purchases, and service status—perfect for automation. Complex billing disputes and cancellation requests still route to human agents.

## RAG Architecture for Accuracy

Large language models hallucinate. In enterprise contexts, wrong answers damage trust and create liability. Retrieval-Augmented Generation (RAG) grounds responses in your knowledge base: product documentation, policy manuals, FAQ databases.

We chunk documents intelligently, embed them in vector databases, and retrieve relevant context for each query. The LLM synthesizes answers from retrieved content, not general training data. Confidence thresholds trigger human escalation when retrieval quality is low.

## Multilingual Requirements

Global enterprises—and those serving diverse local markets—need multilingual capabilities beyond simple translation. Nigerian enterprises require English, Hausa, Yoruba, and Igbo with code-switching support. Fine-tuning on domain-specific conversations improves accuracy dramatically over generic models.

## Integration Is Everything

Chatbots that can't access customer accounts, process transactions, or create tickets are fancy FAQ search. Plan integrations early: CRM for customer context, billing systems for account queries, ticketing for escalations, analytics for continuous improvement.

Our architecture uses tool-calling patterns where the LLM invokes backend functions securely. "Check my balance" triggers an authenticated API call, not a guess based on training data.

## Governance and Safety

Implement guardrails before launch: blocked topics, PII handling policies, response review workflows for sensitive categories. Log every conversation for quality monitoring and model improvement. Establish human review for flagged interactions.

## Measuring Success

Track containment rate (queries resolved without human), customer satisfaction, cost per contact, and escalation quality. A 78% containment rate with maintained CSAT delivers substantial ROI. Below 60%, you're frustrating customers with inadequate automation.

AI chatbots aren't magic—they're systems requiring thoughtful design, robust architecture, and continuous improvement. Done right, they transform customer experience while reducing operational costs.`,
    author: blogAuthors[3],
    date: "2025-10-28",
    category: "AI & Machine Learning",
    image: images.blog.ai,
    readTime: "10 min read",
    tags: ["AI", "Chatbots", "Enterprise", "Customer Experience"],
  },
  {
    slug: "cloud-migration-strategies-2025",
    title: "Cloud Migration Strategies for Enterprise: The 6 Rs Framework in 2025",
    excerpt:
      "Not every application belongs in the cloud the same way. Learn how to evaluate your portfolio and choose the right migration strategy for each workload.",
    content: `Cloud migration has matured from "lift and shift everything" to nuanced portfolio strategies. After migrating 500+ applications across AWS, Azure, and GCP, we've refined our approach using the 6 Rs framework—updated for 2025 realities.

## Rehost (Lift and Shift)

Move applications to cloud infrastructure without modification. Appropriate for stable applications nearing end-of-life, where refactoring ROI doesn't justify investment. Quick wins demonstrate cloud value while planning deeper transformations.

Caution: Lift and shift without optimization often increases costs. Right-sizing and reserved instances are essential follow-ups.

## Replatform

Minimal modifications to leverage cloud services—migrating databases to managed RDS, replacing self-managed message queues with SQS. Balances speed with cloud benefits. Our warehouse management migration used replatforming to adopt managed PostgreSQL, reducing DBA overhead 60%.

## Refactor (Cloud-Native)

Rebuild applications for cloud-native architectures: microservices, containers, serverless. Highest transformation value but longest timeline. Appropriate for strategic applications where cloud capabilities enable competitive advantage.

Unity Bank's core banking refactor enabled real-time processing impossible on mainframe architecture.

## Repurchase (SaaS)

Replace custom applications with SaaS alternatives. CRM, HR, and collaboration tools often fit here. Evaluate total cost of ownership including customization limits and data portability.

## Retire

Decommission applications no longer needed. Portfolio assessments typically identify 20-30% of applications candidates for retirement. Sunsetting unused systems reduces migration scope and ongoing costs.

## Retain

Keep applications on-premises when cloud migration doesn't make sense: regulatory requirements, latency-sensitive workloads, or applications with years of remaining useful life.

## Building Your Migration Roadmap

Assess each application against business criticality, technical debt, and cloud readiness. Prioritize quick wins that fund longer transformations. Sequence migrations to build organizational capability before tackling complex systems.

Cloud migration is a journey, not a project. The enterprises succeeding treat it as ongoing capability building, not a one-time event.`,
    author: blogAuthors[2],
    date: "2025-09-12",
    category: "Cloud",
    image: images.blog.cloud,
    readTime: "7 min read",
    tags: ["Cloud Migration", "AWS", "Azure", "Enterprise Architecture"],
  },
  {
    slug: "healthcare-software-hipaa-compliance",
    title: "Building HIPAA-Compliant Healthcare Software: Technical Requirements",
    excerpt:
      "Healthcare software demands rigorous security and privacy controls. Here's how we implement compliance-by-design in hospital management and telemedicine platforms.",
    content: `Healthcare software handles the most sensitive personal data. Regulatory frameworks—HIPAA in the US, NDPR in Nigeria, POPIA in South Africa—impose strict requirements that can't be bolted on after development. At Team X, compliance is architectural, not checklist.

## Access Controls

Role-based access control (RBAC) ensures clinicians see only patients under their care. Break-glass procedures log emergency access with mandatory review. Multi-factor authentication protects all accounts. Session timeouts prevent unauthorized access on shared workstations.

## Audit Logging

Every access to protected health information generates immutable audit logs: who, what, when, from where. Logs are tamper-evident and retained per regulatory requirements. Anomaly detection alerts on unusual access patterns.

## Encryption

Data encrypted at rest using AES-256. TLS 1.3 for data in transit. Key management via cloud HSM or dedicated key management services. Encryption extends to backups and disaster recovery systems.

## Data Minimization

Collect only necessary data. Implement data retention policies with automated purging. De-identification for analytics and research datasets. Patient consent management tracks permissions for data use.

## Interoperability Standards

HL7 FHIR enables secure data exchange with laboratories, imaging systems, and health information exchanges. API security follows OAuth 2.0 and SMART on FHIR profiles. Integration testing validates compliance across connected systems.

## Business Associate Agreements

Cloud providers and third-party services require BAAs confirming their compliance responsibilities. We maintain approved vendor lists and conduct periodic compliance assessments.

## Incident Response

Documented procedures for breach detection, containment, notification, and remediation. Regular tabletop exercises validate response readiness. Cyber insurance provides additional protection.

Healthcare software development demands expertise beyond typical enterprise applications. Partner with teams who understand both technology and regulatory landscapes.`,
    author: blogAuthors[1],
    date: "2025-08-22",
    category: "Healthcare",
    image: images.blog.healthcare,
    readTime: "9 min read",
    tags: ["Healthcare", "Compliance", "Security", "HIPAA"],
  },
  {
    slug: "flutter-vs-react-native-2025",
    title: "Flutter vs React Native in 2025: An Enterprise Perspective",
    excerpt:
      "Cross-platform mobile development has matured. We compare Flutter and React Native for enterprise applications based on real project outcomes.",
    content: `Enterprises face a perennial question: build native iOS and Android apps separately, or use cross-platform frameworks? After delivering 45+ Flutter apps and 30+ React Native projects, here's our honest assessment for 2025.

## Performance

Flutter compiles to native ARM code, delivering consistent 60fps animations. React Native uses JavaScript bridge, introducing potential bottlenecks for complex animations. For consumer apps with rich UI, Flutter often feels smoother. For business apps with form-heavy interfaces, both perform adequately.

## Developer Experience

Flutter's hot reload and single language (Dart) simplify onboarding. React Native leverages existing JavaScript/React skills—valuable if your team already knows React. Flutter's widget system provides consistency; React Native relies on community libraries with varying quality.

## UI Consistency

Flutter renders its own widgets, ensuring pixel-perfect consistency across platforms. React Native uses native components, providing platform-authentic feel but requiring platform-specific code for edge cases.

## Ecosystem and Libraries

React Native's JavaScript ecosystem is vast—npm packages for everything. Flutter's pub.dev has matured significantly, covering most enterprise needs. For specialized hardware integration, evaluate specific library availability before choosing.

## Team Structure

Flutter enables single team maintaining one codebase. React Native similarly, though platform-specific modules often require native developers for complex features. Both reduce team size vs. dual native development.

## Maintenance and Upgrades

Flutter's release cycle is predictable with strong backward compatibility. React Native upgrades can be painful due to native dependency conflicts. Factor long-term maintenance into platform decisions.

## Our Recommendation

Choose Flutter for: consumer apps prioritizing UI polish, teams without React expertise, projects requiring offline-first architecture.

Choose React Native for: teams with strong React skills, apps heavily integrated with web properties, projects needing specific npm packages.

Both platforms are production-ready for enterprise applications. The "wrong" choice is often sticking with dual native development due to analysis paralysis.`,
    author: blogAuthors[1],
    date: "2025-07-08",
    category: "Mobile Development",
    image: images.blog.mobile,
    readTime: "6 min read",
    tags: ["Flutter", "React Native", "Mobile", "Cross-Platform"],
  },
  {
    slug: "digital-government-transformation-africa",
    title: "Digital Government Transformation in Africa: Lessons from Lagos",
    excerpt:
      "Government digitization faces unique challenges in African contexts. Here's what we learned deploying citizen portals serving millions.",
    content: `Africa's digital government transformation accelerates as citizens demand services matching their private sector experiences. Our Lagos State portal serving 1.8 million citizens offers lessons applicable across the continent.

## Mobile-First Is Non-Negotiable

Smartphone penetration exceeds desktop access. Design for mobile screens, touch interfaces, and variable connectivity. Progressive enhancement ensures basic functionality on low-bandwidth connections.

## USSD Extends Reach

Feature phones remain prevalent. USSD channels provide access for citizens without smartphones or reliable data. Balance between smartphone-rich experiences and inclusive access defines successful deployments.

## Payment Integration Complexity

Cash economies transition gradually. Integrate mobile money (M-Pesa, MTN MoMo), bank transfers, and card payments. Cash payment options at service centers remain necessary during transition periods.

## Change Management for Civil Servants

Digitization threatens perceived job security. Involve civil servants in design, emphasize how automation eliminates tedious tasks, and provide retraining for higher-value roles. Resistance from within government kills more projects than technical failures.

## Inter-Agency Integration

Citizen services span agencies with siloed systems. Enterprise service buses and API gateways enable data sharing while respecting agency autonomy. Political coordination often exceeds technical complexity.

## Trust and Transparency

Citizens skeptical of government efficiency need visible progress. Public dashboards showing service metrics, processing times, and satisfaction scores build trust. Clear application tracking reduces corruption opportunities.

## Language and Accessibility

Multilingual support isn't optional in diverse nations. WCAG accessibility ensures services reach citizens with disabilities. Simple language avoids bureaucratic jargon confusing citizens.

Digital government transforms citizen-state relationships. Success requires technology excellence combined with deep understanding of local contexts.`,
    author: blogAuthors[0],
    date: "2025-06-18",
    category: "Government",
    image: images.blog.leadership,
    readTime: "8 min read",
    tags: ["E-Government", "Digital Transformation", "Africa", "Citizen Services"],
  },
  {
    slug: "securing-enterprise-applications-2025",
    title: "Enterprise Application Security: Essential Practices for 2025",
    excerpt:
      "Security threats evolve constantly. Here are the practices we implement in every enterprise project to protect applications and data.",
    content: `Security breaches make headlines, but most vulnerabilities stem from preventable failures: unpatched dependencies, misconfigured cloud resources, insufficient input validation. Our security practices integrate into development, not bolted on before launch.

## Secure Development Lifecycle

Security requirements defined during planning. Threat modeling identifies attack surfaces early. Code reviews include security checklist. Static analysis scans every commit. Dynamic testing validates running applications. Penetration testing before production release.

## Authentication and Authorization

OAuth 2.0 and OpenID Connect for authentication. Fine-grained authorization checking every request. Principle of least privilege for all accounts. Multi-factor authentication mandatory for privileged access.

## Input Validation

Never trust client input. Validate, sanitize, and parameterize all inputs. Prepared statements prevent SQL injection. Content Security Policy mitigates XSS. File upload restrictions prevent malicious payloads.

## Secrets Management

No secrets in code or configuration files. Vault services rotate credentials automatically. Environment-specific secrets isolated. Audit logging tracks secret access.

## Cloud Security

Infrastructure as code enables consistent security baselines. Network segmentation limits blast radius. Encryption enabled by default. Cloud security posture management detects misconfigurations. Regular compliance scanning against CIS benchmarks.

## Dependency Management

Automated dependency scanning identifies vulnerable packages. Update policies balance security patches with stability testing. Software bill of materials tracks all components.

## Incident Response

Documented playbooks for common scenarios. Regular drills validate response capability. Logging and monitoring enable detection. Communication templates ready for stakeholder notification.

Security is continuous, not a milestone. Build it into your development culture.`,
    author: blogAuthors[2],
    date: "2025-05-03",
    category: "Security",
    image: images.blog.security,
    readTime: "7 min read",
    tags: ["Security", "DevSecOps", "Enterprise", "Best Practices"],
  },
  {
    slug: "building-high-performance-engineering-teams",
    title: "Building High-Performance Engineering Teams: Lessons from Team X",
    excerpt:
      "Great software requires great teams. Here's how we've built and scaled engineering organizations delivering enterprise projects consistently.",
    content: `Technology choices matter, but team capability determines outcomes. Over 12 years, Team X has grown from 5 engineers to 150+, delivering 200+ enterprise projects. Our team-building lessons might help your organization.

## Hire for Potential, Train for Excellence

We prioritize learning ability and collaboration over specific technology experience. Technologies change; adaptability persists. Structured onboarding pairs new hires with mentors. Continuous learning budgets support conference attendance and certifications.

## Squad Model Over Hierarchy

Cross-functional squads own features end-to-end: backend, frontend, QA, DevOps embedded together. Squads have autonomy within architectural guardrails. Regular rotation prevents knowledge silos and burnout.

## Psychological Safety

Engineers must raise concerns without fear. Blameless post-mortems analyze failures constructively. "I don't know" is acceptable; hiding ignorance isn't. Leaders admit mistakes modeling vulnerability.

## Sustainable Pace

Crunch mode destroys long-term productivity. We plan realistically, protect focus time, and respect boundaries. Occasional intense periods happen, but chronic overtime indicates planning failures, not heroism.

## Clear Career Progression

Individual contributor and management tracks offer equal prestige. Competency frameworks define expectations at each level. Regular calibration ensures fair promotion decisions. Compensation transparency reduces attrition.

## Remote-First Culture

Distributed teams require intentional communication. Async documentation reduces meeting overhead. Regular video calls maintain connection. Time zone overlap windows for collaboration. Results over presence.

## Client Collaboration

Engineers interact directly with clients, building domain understanding and accountability. Regular demos maintain alignment. Client feedback shapes priorities without micromanaging implementation.

Great teams aren't accidents—they're designed, nurtured, and protected.`,
    author: blogAuthors[0],
    date: "2025-04-10",
    category: "Leadership",
    image: images.blog.leadership,
    readTime: "6 min read",
    tags: ["Leadership", "Engineering Culture", "Team Building", "Management"],
  },
  {
    slug: "fintech-regulatory-compliance-nigeria",
    title: "Navigating FinTech Regulatory Compliance in Nigeria",
    excerpt:
      "Nigeria's financial services regulations evolve rapidly. A guide for technology companies building banking, payments, and lending platforms.",
    content: `Nigeria's FinTech ecosystem thrives under CBN oversight, NDIC requirements, and evolving digital banking guidelines. Technology companies entering financial services must embed compliance from day one.

## Licensing Requirements

Different activities require different licenses: commercial banking, microfinance banking, payment service banking, mobile money operators. Understand your model's regulatory classification before building. License applications take 6-18 months—factor into go-to-market planning.

## CBN Guidelines

Digital banking guidelines specify technology requirements: disaster recovery, cybersecurity, customer authentication. Payment system guidelines govern transaction processing, settlement, and reconciliation. Regular circulars update requirements—maintain compliance monitoring.

## KYC and AML

Customer identification requirements vary by transaction limits and product types. Tiered KYC enables progressive onboarding. AML monitoring detects suspicious patterns. Transaction reporting obligations apply above thresholds. Integrate compliance into customer journeys, not as afterthoughts.

## Data Localization

CBN requires financial data storage within Nigeria. Cloud architectures must use local regions or on-premises infrastructure. Cross-border data transfers require explicit approval.

## NDIC Insurance

Deposit-taking institutions require NDIC insurance. Understand coverage limits and reporting requirements. Non-deposit products have different protections—communicate clearly to customers.

## Open Banking

CBN's open banking framework enables API-based financial services. Standardized APIs, consent management, and security requirements apply. Early adopters gain partnership advantages.

## Partner Strategically

Licensed partners can accelerate market entry while building toward direct licensing. Due diligence on partner compliance posture protects your business. Contractual obligations flow through partnerships.

Regulatory compliance isn't obstacle—it's foundation for sustainable FinTech businesses.`,
    author: blogAuthors[0],
    date: "2025-03-22",
    category: "FinTech",
    image: images.blog.fintech,
    readTime: "9 min read",
    tags: ["FinTech", "Compliance", "Nigeria", "CBN", "Banking"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedBlogPosts(count = 3): BlogPost[] {
  return blogPosts.slice(0, count);
}

export function getBlogCategories(): string[] {
  return [...new Set(blogPosts.map((post) => post.category))];
}

export function searchBlogPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.category.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getRelatedBlogPosts(slug: string, count = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(slug);
  if (!currentPost) return [];

  return blogPosts
    .filter(
      (post) =>
        post.slug !== slug &&
        (post.category === currentPost.category ||
          post.tags.some((tag) => currentPost.tags.includes(tag)))
    )
    .slice(0, count);
}
