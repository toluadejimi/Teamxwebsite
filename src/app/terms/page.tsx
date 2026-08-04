import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/seo";
import { company } from "@/lib/data";
import { readCms } from "@/lib/cms/store";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for Team X Technologies Ltd. Read the terms governing use of our website and services.",
  path: "/terms",
});

const lastUpdated = "July 31, 2025";

export const dynamic = "force-dynamic";

export default async function TermsPage() {
  const cms = await readCms();
  const contactEmail = cms.contact.email;
  const contactPhone = cms.contact.phone;
  return (
    <>
      <PageHero
        title="Terms of Service"
        description={`Last updated: ${lastUpdated}`}
        eyebrow="Legal"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Service" },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-10 text-muted">
          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              1. Agreement to Terms
            </h2>
            <p className="leading-relaxed">
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of the
              website and services provided by {company.name} (&quot;Team X,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;). By accessing{" "}
              <Link href={company.website} className="text-accent hover:underline">
                {company.website.replace("https://", "")}
              </Link>{" "}
              or engaging our services, you agree to be bound by these Terms. If you disagree with
              any part, you may not access our website or services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              2. Services Description
            </h2>
            <p className="leading-relaxed">
              Team X provides enterprise software development, consulting, and related technology
              services including custom application development, system integration, cloud
              migration, and managed services. Specific deliverables, timelines, and fees are
              defined in individual statements of work or service agreements.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              3. Use of Website
            </h2>
            <p className="leading-relaxed">You agree to use our website only for lawful purposes. You may not:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Transmit malware, viruses, or harmful code</li>
              <li>Scrape, crawl, or harvest data without written permission</li>
              <li>Impersonate Team X or misrepresent your affiliation</li>
              <li>Interfere with the proper functioning of the website</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              4. Intellectual Property
            </h2>
            <p className="leading-relaxed">
              All content on this website — including text, graphics, logos, images, and software
              — is the property of Team X or its licensors and is protected by copyright and
              intellectual property laws. You may not reproduce, distribute, or create derivative
              works without our prior written consent.
            </p>
            <p className="mt-4 leading-relaxed">
              For contracted projects, intellectual property ownership is governed by the applicable
              service agreement. Unless otherwise specified, clients receive ownership of custom
              deliverables upon full payment.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              5. Client Responsibilities
            </h2>
            <p className="leading-relaxed">
              Clients engaging our services agree to provide timely access to required information,
              stakeholders, and systems; review deliverables within agreed timeframes; and maintain
              confidentiality of proprietary methodologies and tools disclosed during engagements.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              6. Payment Terms
            </h2>
            <p className="leading-relaxed">
              Payment terms are specified in individual contracts. Unless otherwise agreed, invoices
              are due within 30 days of receipt. Late payments may incur interest at 1.5% per month
              or the maximum rate permitted by law. Team X reserves the right to suspend services
              for overdue accounts.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              7. Warranties and Disclaimers
            </h2>
            <p className="leading-relaxed">
              We warrant that services will be performed in a professional manner consistent with
              industry standards. Project-specific warranties are defined in service agreements.
            </p>
            <p className="mt-4 leading-relaxed">
              THE WEBSITE AND ITS CONTENT ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY
              KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              8. Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, TEAM X SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. OUR TOTAL LIABILITY FOR ANY
              CLAIM ARISING FROM THESE TERMS OR USE OF THE WEBSITE SHALL NOT EXCEED THE AMOUNT PAID
              BY YOU TO TEAM X IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED US DOLLARS
              ($100), WHICHEVER IS GREATER.
            </p>
            <p className="mt-4 leading-relaxed">
              For contracted services, liability limits are as specified in the applicable service
              agreement.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              9. Confidentiality
            </h2>
            <p className="leading-relaxed">
              Both parties agree to maintain confidentiality of proprietary information disclosed
              during engagements. Confidentiality obligations survive termination of services for
              a period of five (5) years, except for trade secrets which remain protected
              indefinitely.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              10. Termination
            </h2>
            <p className="leading-relaxed">
              We may terminate or suspend access to our website immediately, without prior notice,
              for conduct that violates these Terms. Service agreements may be terminated per the
              terms specified in individual contracts, including provisions for wind-down and
              transition assistance.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              11. Governing Law
            </h2>
            <p className="leading-relaxed">
              These Terms are governed by the laws of the Federal Republic of Nigeria, without
              regard to conflict of law principles. Disputes shall be resolved through good-faith
              negotiation, and if unresolved, through arbitration in Lagos, Nigeria under the
              rules of the Lagos Court of Arbitration, unless otherwise specified in a service
              agreement.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              12. Changes to Terms
            </h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms at any time. Material changes will be
              posted on this page with an updated date. Your continued use of the website after
              changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
              13. Contact
            </h2>
            <p className="leading-relaxed">
              For questions about these Terms, contact us at:
            </p>
            <address className="mt-4 not-italic leading-relaxed">
              {company.name}
              <br />
              12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria
              <br />
              Email:{" "}
              <a href={`mailto:${contactEmail}`} className="text-accent hover:underline">
                {contactEmail}
              </a>
              <br />
              Phone:{" "}
              <a href={`tel:${contactPhone.replace(/\s/g, "")}`} className="text-accent hover:underline">
                {contactPhone}
              </a>
            </address>
            <p className="mt-4 leading-relaxed">
              See also our{" "}
              <Link href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
