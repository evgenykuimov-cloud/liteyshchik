import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { HomeSections } from "@/components/home-sections";
import { company } from "@/config/company";

const title = "Камский Литейный Завод — жаропрочное литьё и механическая обработка металла";
const description = "Производство жаропрочных отливок, реторт, муфелей, радиантных труб, валков, роликов, печных плит и центробежнолитых труб по чертежам заказчика.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    siteName: company.legalName,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function HomePage() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    url: company.siteUrl,
    email: company.email.display,
    telephone: company.phone.display,
    taxID: company.requisites.inn,
    address: {
      "@type": "PostalAddress",
      postalCode: "423832",
      addressRegion: "Республика Татарстан",
      addressLocality: "Набережные Челны",
      streetAddress: "Ремонтный проезд, 7",
      addressCountry: "RU",
    },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /><HeroSection /><HomeSections /></>;
}
