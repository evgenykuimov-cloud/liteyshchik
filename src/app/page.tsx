import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { HomeSections } from "@/components/home-sections";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: "Камский Литейный Завод — жаропрочное литьё и механическая обработка металла",
  description: "Производство жаропрочных отливок, реторт, муфелей, радиантных труб, валков, роликов, печных плит и центробежнолитых труб по чертежам заказчика.",
  alternates: { canonical: "/" },
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
