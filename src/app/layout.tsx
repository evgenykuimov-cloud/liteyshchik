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
const defaultTitle = "Камский Литейный Завод — жаропрочное литьё и механическая обработка металла";
const defaultDescription = "Производство жаропрочных отливок, реторт/муфелей, радиантных труб, валков, роликов, печных плит и центробежнолитых труб по чертежам заказчика.";

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  applicationName: company.brandName,
  title: { default: defaultTitle, template: "%s | Камский Литейный Завод" },
  description: defaultDescription,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: company.legalName,
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body><Header /><main id="main-content">{children}</main><Footer /><StickyMobileActions /><Analytics /></body>
    </html>
  );
}
