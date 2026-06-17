import type { Metadata } from "next";
import { Manrope, Roboto_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StickyMobileActions } from "@/components/sticky-mobile-actions";
import { company } from "@/config/company";

const bodyFont = Manrope({ subsets: ["cyrillic", "latin"], variable: "--font-body", display: "swap" });
const headingFont = Roboto_Condensed({ subsets: ["cyrillic", "latin"], variable: "--font-heading", display: "swap", weight: ["700", "800", "900"] });

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: { default: "Камский Литейный Завод — жаропрочное литьё и механическая обработка металла", template: "%s | Камский Литейный Завод" },
  description: "Производство жаропрочных отливок, реторт, муфелей, радиантных труб, валков, роликов, печных плит и центробежнолитых труб по чертежам заказчика.",
  openGraph: { type: "website", locale: "ru_RU", siteName: company.legalName },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body><Header /><main id="main-content">{children}</main><Footer /><StickyMobileActions /><Analytics /></body>
    </html>
  );
}
