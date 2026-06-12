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
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: company.legalName, url: company.siteUrl };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /><HeroSection /><HomeSections /></>;
}
