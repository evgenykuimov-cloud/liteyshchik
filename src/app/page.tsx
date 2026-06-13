import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { HomeSections } from "@/components/home-sections";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: "Чугунные люки и дождеприёмники от производителя — ООО «Литейщик»",
  description: "Производство круглых и прямоугольных чугунных люков, дождеприёмников, решёток, крышек и обойм. Серийные изделия и изготовление по чертежам. Запросите расчёт и коммерческое предложение.",
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
      postalCode: "352500",
      addressRegion: "Краснодарский край",
      addressLocality: "Лабинск",
      streetAddress: "ул. Делегатская, 40/2",
      addressCountry: "RU",
    },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /><HeroSection /><HomeSections /></>;
}
