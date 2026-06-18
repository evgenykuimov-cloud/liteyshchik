import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/catalog";

const typeLabels: Record<Product["productType"], string> = {
  "heat-resistant-casting": "Жаропрочное литьё",
  "centrifugal-casting": "Центробежное литьё",
  "furnace-equipment": "Печная оснастка",
  "machined-part": "Мехобработка",
  "conveyor-part": "Конвейерные детали",
  "custom-part": "По чертежу",
};

export function ProductCard({ product }: { product: Product }) {
  const href = `/catalog/${product.categorySlug}/${product.slug}`;

  return (
    <article className="group flex h-full flex-col border border-[var(--border)] bg-[var(--surface)]">
      <Link href={href} className="block overflow-hidden">
        <Image src={product.images[0].src} alt={product.images[0].alt} width={600} height={450} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[var(--accent)]">{typeLabels[product.productType]}</p>
        <h3 className="heading text-2xl">
          <Link
            href={href}
            className="transition-colors hover:text-[var(--accent)] focus-visible:text-[var(--accent)] focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-3 min-h-12 text-sm leading-6 text-[var(--foreground-muted)]">{product.shortDescription}</p>
        <dl className="mb-5 mt-4 grid gap-2 text-xs text-[var(--foreground-muted)]">
          <div>
            <dt className="font-bold uppercase tracking-[.1em] text-white">Материалы</dt>
            <dd className="mt-1">{product.materials.slice(0, 2).join(", ")}</dd>
          </div>
          <div>
            <dt className="font-bold uppercase tracking-[.1em] text-white">Назначение</dt>
            <dd className="mt-1">{product.application[0] ?? "По ТЗ заказчика"}</dd>
          </div>
        </dl>
        <Link href={href} className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs font-bold uppercase">
          Подробнее <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}
