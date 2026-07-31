import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./globals.css";

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://teamxtech.com"),
  title: {
    default: "Team X Technologies | Enterprise Software That Transforms Businesses",
    template: "%s | Team X Technologies",
  },
  description:
    "Team X Technologies builds enterprise-grade software — banking platforms, government portals, healthcare systems, education solutions, AI, and custom applications for organizations worldwide.",
  keywords: [
    "enterprise software",
    "core banking",
    "fintech",
    "digital transformation",
    "custom software development",
    "AI solutions",
    "Team X Technologies",
  ],
  authors: [{ name: "Team X Technologies Ltd" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://teamxtech.com",
    siteName: "Team X Technologies",
    title: "Team X Technologies | Building Digital Solutions That Transform Businesses",
    description:
      "Enterprise software, banking systems, mobile apps, and AI solutions for organizations of every size.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team X Technologies",
    description: "Building Digital Solutions That Transform Businesses",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Team X Technologies Ltd",
  url: "https://teamxtech.com",
  logo: "https://teamxtech.com/logo.png",
  description:
    "Premium software development company delivering enterprise-grade solutions for banking, government, healthcare, education, and digital transformation.",
  email: "hello@teamxtech.com",
  telephone: "+234-1-234-5678",
  sameAs: [
    "https://linkedin.com/company/teamxtech",
    "https://twitter.com/teamxtech",
    "https://github.com/teamxtech",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${body.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
