import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/seo";
import { company } from "@/lib/data";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Team X Technologies Ltd. Learn how we collect, use, and protect your personal information.",
  path: "/privacy",
});

const lastUpdated = "July 31, 2025";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description={`Last updated: ${lastUpdated}`}
        eyebrow="Legal"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-10 text-muted">
          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              1. Introduction
            </h2>
            <p className="leading-relaxed">
              {company.name} (&quot;Team X,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
              is committed to protecting your privacy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website at{" "}
              <Link href={company.website} className="text-accent hover:underline">
                {company.website.replace("https://", "")}
              </Link>
              , use our services, or interact with us in any capacity.
            </p>
            <p className="mt-4 leading-relaxed">
              By accessing our website or using our services, you agree to the collection and use
              of information in accordance with this policy. If you do not agree, please do not
              use our services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              2. Information We Collect
            </h2>
            <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
              Personal Information
            </h3>
            <p className="leading-relaxed">
              We may collect personal information that you voluntarily provide, including:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Name, email address, phone number, and company name</li>
              <li>Job title and professional information</li>
              <li>Project requirements and communications submitted through contact forms</li>
              <li>Resume and application materials for career opportunities</li>
              <li>Payment and billing information for contracted services</li>
            </ul>

            <h3 className="mb-2 mt-6 font-display text-lg font-semibold text-foreground">
              Automatically Collected Information
            </h3>
            <p className="leading-relaxed">
              When you visit our website, we may automatically collect certain information,
              including IP address, browser type, operating system, referring URLs, pages viewed,
              and timestamps. We use cookies and similar technologies as described in our Cookie
              Policy.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              3. How We Use Your Information
            </h2>
            <p className="leading-relaxed">We use collected information to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Respond to inquiries and provide requested services</li>
              <li>Process job applications and manage recruitment</li>
              <li>Deliver contracted software development and consulting services</li>
              <li>Send relevant communications about our services (with your consent)</li>
              <li>Improve our website, services, and user experience</li>
              <li>Comply with legal obligations and protect our rights</li>
              <li>Detect and prevent fraud, security incidents, and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              4. Legal Basis for Processing
            </h2>
            <p className="leading-relaxed">
              We process personal data based on: (a) your consent; (b) performance of a contract;
              (c) our legitimate business interests; or (d) compliance with legal obligations.
              For users in Nigeria, we comply with the Nigeria Data Protection Regulation (NDPR).
              For users in the European Economic Area, we comply with the General Data Protection
              Regulation (GDPR) where applicable.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              5. Information Sharing
            </h2>
            <p className="leading-relaxed">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Service providers who assist in hosting, analytics, and communications</li>
              <li>Professional advisors (legal, accounting) under confidentiality obligations</li>
              <li>Law enforcement or regulatory authorities when required by law</li>
              <li>Business successors in the event of a merger or acquisition</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              All third parties are contractually required to protect your data and use it only
              for specified purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              6. Data Security
            </h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational measures to protect personal
              information, including encryption in transit and at rest, access controls, and
              regular security assessments. While we strive to protect your data, no method of
              transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              7. Data Retention
            </h2>
            <p className="leading-relaxed">
              We retain personal information only as long as necessary for the purposes outlined
              in this policy, to comply with legal obligations, resolve disputes, and enforce
              agreements. Client project data is retained per contractual terms and applicable
              regulatory requirements.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              8. Your Rights
            </h2>
            <p className="leading-relaxed">
              Depending on your jurisdiction, you may have the right to access, correct, delete,
              or restrict processing of your personal data, object to processing, request data
              portability, and withdraw consent. To exercise these rights, contact us at{" "}
              <a href={`mailto:${company.email}`} className="text-accent hover:underline">
                {company.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              9. International Transfers
            </h2>
            <p className="leading-relaxed">
              Team X operates from Nigeria, with offices in Lagos and Abuja.
              Your information may be transferred to and processed in countries other than your
              country of residence. We ensure appropriate safeguards are in place for such
              transfers.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              10. Children&apos;s Privacy
            </h2>
            <p className="leading-relaxed">
              Our services are not directed to individuals under 16. We do not knowingly collect
              personal information from children. If we become aware of such collection, we will
              delete the information promptly.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              11. Changes to This Policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy periodically. Changes will be posted on this page
              with an updated revision date. Continued use of our services after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              12. Contact Us
            </h2>
            <p className="leading-relaxed">
              For privacy-related inquiries or to exercise your rights, contact our Data Protection
              Officer:
            </p>
            <address className="mt-4 not-italic leading-relaxed">
              {company.name}
              <br />
              12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria
              <br />
              Email:{" "}
              <a href={`mailto:${company.email}`} className="text-accent hover:underline">
                {company.email}
              </a>
              <br />
              Phone:{" "}
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="text-accent hover:underline">
                {company.phone}
              </a>
            </address>
          </section>
        </div>
      </Section>
    </>
  );
}
