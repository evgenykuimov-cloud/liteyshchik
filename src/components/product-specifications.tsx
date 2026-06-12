import type { ProductSpecification } from "@/types/catalog";

export function ProductSpecifications({ items }: { items: ProductSpecification[] }) {
  return <div className="border border-[var(--border)]">{items.filter((item) => item.important || item.value).map((item) => <div key={item.label} className="grid border-b border-[var(--border)] last:border-b-0 sm:grid-cols-2"><dt className="bg-[var(--surface)] p-4 text-sm text-[var(--foreground-muted)]">{item.label}</dt><dd className="p-4 text-sm font-semibold">{item.value ?? "Уточняется"}</dd></div>)}</div>;
}
