import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { CTABanner } from "@/components/ui/CTABanner";
import { Section } from "@/components/ui/Section";
import { testimonials } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CaseStudiesPreview } from "@/components/home/CaseStudiesPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TechnologiesSection } from "@/components/home/TechnologiesSection";
import { AISolutions } from "@/components/home/AISolutions";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { AwardsSection } from "@/components/home/AwardsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FAQSection } from "@/components/home/FAQSection";

/** Always render from CMS — do not serve a build-time static snapshot */
export const dynamic = "force-dynamic";

const carouselTestimonials = testimonials.map(
  ({ quote, author, role, company }) => ({
    quote,
    author,
    role,
    company,
  })
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <ServicesOverview />
      <IndustriesSection />
      <FeaturedProducts />
      <CaseStudiesPreview />
      <ProcessSection />
      <TechnologiesSection />
      <AISolutions />
      <WhyChooseUs />

      <Section
        id="testimonials"
        eyebrow="Client Stories"
        title="Trusted by leaders across industries"
        description="Hear from the CTOs, commissioners, and executives who partner with Team X to transform their organizations."
        centered
      >
        <TestimonialCarousel testimonials={carouselTestimonials} />
      </Section>

      <AwardsSection />
      <PartnersSection />
      <BlogPreview />
      <FAQSection />

      <CTABanner
        primaryHref="/request-quote"
        primaryLabel="Request a Quote"
        secondaryHref="/book-demo"
        secondaryLabel="Book Consultation"
      />
    </>
  );
}
