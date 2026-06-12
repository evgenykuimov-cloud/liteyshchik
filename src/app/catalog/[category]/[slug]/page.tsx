import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductSpecifications } from "@/components/product-specifications";
import { RequestQuoteForm } from "@/components/request-quote-form";
import { EmptyState } from "@/components/ui/states";
import { getCategory, getProduct, products } from "@/data/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ category: product.categorySlug, slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  const product = getProduct(category, slug);
  if (!product) return {};
  return { title: { absolute: product.seo.title }, description: product.seo.description, alternates: { canonical: `/catalog/${category}/${slug}` } };
}

export default async function ProductPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: categorySlug, slug } = await params;
  const product = getProduct(categorySlug, slug);
  if (!product) notFound();
  const category = getCategory(categorySlug);
  const schema = { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.shortDescription, category: category?.name, image: product.images[0].src };
  return (
    <Container className="section-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs items={[{ label: "Каталог", href: "/catalog" }, { label: category?.name ?? "Категория", href: `/catalog/${categorySlug}` }, { label: product.name }]} />
      <div className="grid gap-9 lg:grid-cols-2">
        <div><Image src={product.images[0].src} alt={product.images[0].alt} width={1200} height={900} className="w-full border border-[var(--border)]" /><p className="mt-3 text-xs text-[var(--foreground-muted)]">Изображение демонстрационное и требует замены фактической фотографией.</p></div>
        <div><p className="text-sm font-bold text-[var(--accent)]">{category?.name}</p><h1 className="heading mt-4 text-5xl sm:text-7xl">{product.name}</h1><p className="mt-4 text-xs uppercase tracking-wide text-[var(--foreground-muted)]">Обозначение уточняется</p><p className="mt-7 text-lg leading-8 text-[var(--foreground-muted)]">{product.description}</p><div className="mt-7 grid gap-3 sm:grid-cols-2"><Link href="#quote" className="btn-primary">Запросить цену</Link><Link href="#quote" className="btn-secondary">Отправить спецификацию</Link></div><div className="mt-8 border-t border-[var(--border)] pt-5"><h2 className="font-bold uppercase">Комплектность</h2><ul className="mt-4 grid gap-3">{product.completeness.map((item) => <li key={item.id} className="border-l-2 border-[var(--accent)] pl-4"><strong>{item.title}</strong><p className="text-sm text-[var(--foreground-muted)]">{item.description}</p></li>)}</ul></div></div>
      </div>
      <section className="section-shell"><h2 className="heading mb-8 text-5xl">Технические характеристики</h2><ProductSpecifications items={product.specifications} /></section>
      <section className="grid gap-4 pb-16 md:grid-cols-3"><div className="border border-[var(--border)] p-6"><h2 className="heading text-3xl">Применение</h2><p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">{product.application?.join(", ") || "Определяется требованиями проекта."}</p></div><div className="border border-[var(--border)] p-6"><h2 className="heading text-3xl">Схема изделия</h2><p className="mt-4 text-sm text-[var(--foreground-muted)]">Габаритная схема готовится к публикации.</p></div><div className="border border-[var(--border)] p-6"><h2 className="heading text-3xl">Документы</h2>{product.documents?.length ? product.documents.map((doc) => <p key={doc.title} className="mt-4 text-sm text-[var(--foreground-muted)]">{doc.title}: файл готовится к публикации</p>) : <EmptyState />}</div></section>
      <section id="quote" className="scroll-mt-28 border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-9"><div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><h2 className="heading text-5xl">Запрос по изделию</h2><p className="mt-4 leading-7 text-[var(--foreground-muted)]">Укажите количество, комплектность, размеры и требования проекта.</p></div><RequestQuoteForm productName={product.name} /></div></section>
    </Container>
  );
}
