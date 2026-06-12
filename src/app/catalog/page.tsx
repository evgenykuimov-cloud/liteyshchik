import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductFilters } from "@/components/product-filters";
import { categories, products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Каталог чугунных изделий",
  description: "Каталог чугунных люков, дождеприёмников, обойм, крышек, решёток и комплектов.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  const itemList = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: products.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.name, url: `/catalog/${product.categorySlug}/${product.slug}` })) };
  return (
    <Container className="section-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <Breadcrumbs items={[{ label: "Каталог" }]} />
      <p className="text-sm font-bold text-[var(--accent)]">КАТАЛОГ / ДЕМО-ДАННЫЕ</p>
      <h1 className="heading mt-4 text-6xl sm:text-8xl">Чугунные изделия</h1>
      <p className="mt-6 max-w-3xl leading-7 text-[var(--foreground-muted)]">Подберите категорию и отправьте запрос с техническими требованиями. Характеристики демонстрационных позиций не являются спецификацией.</p>
      <div className="my-10 flex flex-wrap gap-2">{categories.map((item) => <Link key={item.slug} href={`/catalog/${item.slug}`} className="border border-[var(--border)] px-4 py-3 text-xs font-bold uppercase hover:border-[var(--accent)]">{item.name}</Link>)}</div>
      <Suspense fallback={<div className="min-h-96 animate-pulse bg-[var(--surface)]" />}><ProductFilters products={products} /></Suspense>
      <div className="mt-12 border border-[var(--accent)] p-7"><h2 className="heading text-4xl">Нестандартное изделие</h2><p className="mt-3 text-[var(--foreground-muted)]">Отправьте чертёж, размеры и условия эксплуатации для технического анализа.</p><Link href="/custom-production" className="btn-primary mt-5">Отправить ТЗ</Link></div>
    </Container>
  );
}
