import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductFilters } from "@/components/product-filters";
import { categories, products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Продукция Камского Литейного Завода",
  description: "Каталог литейной продукции: реторты, муфели, радиантные трубы, печная оснастка, валки, ролики и детали по чертежам.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  const itemList = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: products.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.name, url: `/catalog/${product.categorySlug}/${product.slug}` })) };
  return (
    <Container className="section-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <Breadcrumbs items={[{ label: "Каталог" }]} />
      <p className="text-sm font-bold text-[var(--accent)]">КАТАЛОГ / ЛИТЕЙНАЯ ПРОДУКЦИЯ</p>
      <h1 className="heading mt-4 text-6xl sm:text-8xl">Продукция</h1>
      <p className="mt-6 max-w-3xl leading-7 text-[var(--foreground-muted)]">Выберите тип изделия или отправьте чертёж на расчёт. Окончательные размеры, материал, мехобработка и сроки подтверждаются после технического анализа.</p>
      <div className="my-10 flex flex-wrap gap-2">{categories.map((item) => <Link key={item.slug} href={`/catalog/${item.slug}`} className="border border-[var(--border)] px-4 py-3 text-xs font-bold uppercase hover:border-[var(--accent)]">{item.name}</Link>)}</div>
      <Suspense fallback={<div className="min-h-96 animate-pulse bg-[var(--surface)]" />}><ProductFilters products={products} /></Suspense>
      <div className="mt-12 border border-[var(--accent)] p-7"><h2 className="heading text-4xl">Изделие по чертежу</h2><p className="mt-3 text-[var(--foreground-muted)]">Приложите КД, эскиз, марку материала, количество и условия эксплуатации для технического анализа.</p><Link href="/custom-production" className="btn-primary mt-5">Отправить чертёж</Link></div>
    </Container>
  );
}
