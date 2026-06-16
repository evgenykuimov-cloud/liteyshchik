import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/product-card";
import { EmptyState } from "@/components/ui/states";
import { categories, getCategory, products } from "@/data/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return { title: category.name, description: category.description, alternates: { canonical: `/catalog/${slug}` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const directProducts = products.filter((product) => product.categorySlug === slug);
  return <Container className="section-shell"><Breadcrumbs items={[{ label: "Каталог", href: "/catalog" }, { label: category.name }]} /><p className="text-sm font-bold text-[var(--accent)]">КАТЕГОРИЯ</p><h1 className="heading mt-4 text-6xl sm:text-8xl">{category.name}</h1><p className="mt-6 max-w-3xl leading-7 text-[var(--foreground-muted)]">{category.description} Точные технические данные подтверждаются после анализа чертежа, материала и условий эксплуатации.</p><div className="mt-12">{directProducts.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{directProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <EmptyState message="Позиции этой категории готовятся к публикации. Можно отправить чертёж или технический запрос." />}</div></Container>;
}
