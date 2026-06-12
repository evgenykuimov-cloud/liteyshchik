import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group border border-[var(--border)] bg-[var(--surface)]">
      <Link href={`/catalog/${product.categorySlug}/${product.slug}`} className="block overflow-hidden">
        <Image src={product.images[0].src} alt={product.images[0].alt} width={600} height={450} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
      </Link>
      <div className="p-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[var(--accent)]">Демонстрационная позиция</p>
        <h3 className="heading text-2xl">{product.name}</h3>
        <p className="mt-3 min-h-12 text-sm leading-6 text-[var(--foreground-muted)]">{product.shortDescription}</p>
        <Link href={`/catalog/${product.categorySlug}/${product.slug}`} className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs font-bold uppercase">
          Характеристики <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}
