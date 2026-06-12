"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/types/catalog";
import { ProductCard } from "@/components/product-card";
import { EmptyState } from "@/components/ui/states";

export function ProductFilters({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const shape = params.get("shape") ?? "";
  const type = params.get("type") ?? "";
  const frame = params.get("frame") ?? "";
  const custom = params.get("custom") ?? "";

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }

  const result = useMemo(() => products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    const matchesShape = !shape || product.shape === shape;
    const matchesType = !type || product.productType === type;
    const matchesFrame = !frame || (frame === "true" && product.completeness.some((item) => item.id === "full"));
    const matchesCustom = !custom || (custom === "true" && product.customProductionAvailable);
    return matchesQuery && matchesShape && matchesType && matchesFrame && matchesCustom;
  }), [products, query, shape, type, frame, custom]);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit border border-[var(--border)] bg-[var(--surface)] p-5 lg:sticky lg:top-24">
        <h2 className="heading text-2xl">Фильтры</h2>
        <label className="mt-5 grid gap-2 text-xs">Поиск<input value={query} onChange={(event) => { setQuery(event.target.value); setParam("q", event.target.value); }} className="field" placeholder="Название изделия" /></label>
        <Filter label="Форма" value={shape} onChange={(value) => setParam("shape", value)} options={[["", "Все"],["round","Круглая"],["rectangular","Прямоугольная"]]} />
        <Filter label="Тип изделия" value={type} onChange={(value) => setParam("type", value)} options={[["","Все"],["manhole","Люк"],["storm-drain","Дождеприёмник"],["frame","Обойма"],["grate","Решётка"],["set","Комплект"]]} />
        <Filter label="Наличие обоймы" value={frame} onChange={(value) => setParam("frame", value)} options={[["","Все"],["true","Доступен комплект"]]} />
        <Filter label="Под заказ" value={custom} onChange={(value) => setParam("custom", value)} options={[["","Все"],["true","Доступно"]]} />
      </aside>
      <div>
        <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-4"><p>{result.length} позиций</p><span className="text-xs text-[var(--foreground-muted)]">Без цен и складских остатков</span></div>
        {result.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{result.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <EmptyState message="По выбранным параметрам демонстрационных позиций нет." />}
      </div>
    </div>
  );
}

function Filter({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[][] }) {
  return <label className="mt-4 grid gap-2 text-xs">{label}<select className="field" value={value} onChange={(event) => onChange(event.target.value)}>{options.map(([optionValue, name]) => <option key={optionValue} value={optionValue}>{name}</option>)}</select></label>;
}
