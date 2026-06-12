import Link from "next/link";
import { ArrowRight, CircleDot, Grid3X3, Hexagon, Layers3, PanelTop, ScanLine } from "lucide-react";
import type { ComponentType } from "react";

const icons: ComponentType<{ size?: number }>[] = [CircleDot, Grid3X3, Hexagon, PanelTop, ScanLine, Layers3];

export function ProductCategoryCard({ name, href, description, index }: { name: string; href: string; description: string; index: number }) {
  const Icon = icons[index % icons.length];
  return (
    <Link href={href} className="group relative min-h-72 overflow-hidden border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--accent)]">
      <div className="absolute -right-8 -top-8 text-[var(--border-strong)] transition group-hover:rotate-6 group-hover:text-[var(--accent-dark)]"><Icon size={190} /></div>
      <span className="relative text-xs font-bold text-[var(--accent)]">0{index + 1}</span>
      <div className="absolute inset-x-6 bottom-6">
        <h3 className="heading text-3xl">{name}</h3>
        <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--foreground-muted)]">{description}</p>
        <span className="mt-5 flex items-center gap-2 text-xs font-bold uppercase">Смотреть каталог <ArrowRight size={17} /></span>
      </div>
    </Link>
  );
}
