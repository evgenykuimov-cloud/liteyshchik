import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="mb-8 text-xs text-[var(--foreground-muted)]">
      <ol className="flex flex-wrap gap-2">
        <li><Link href="/">Главная</Link></li>
        {items.map((item) => <li key={item.label} className="flex gap-2"><span aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}
      </ol>
    </nav>
  );
}
