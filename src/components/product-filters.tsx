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
  const type = params.get("type") ?? "";
  const material = params.get("material") ?? "";
  const custom = params.get("custom") ?? "";

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }

  const result = useMemo(() => products.filter((product) => {
    const haystack = [
      product.name,
      product.shortDescription,
      product.description,
      product.materials.join(" "),
      product.application.join(" "),
    ].join(" ").toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesType = !type || product.productType === type;
    const matchesMaterial = !material || product.materials.some((item) => item.toLowerCase().includes(material.toLowerCase()));
    const matchesCustom = !custom || (custom === "true" && product.customProductionAvailable);
    return matchesQuery && matchesType && matchesMaterial && matchesCustom;
  }), [products, query, type, material, custom]);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit border border-[var(--border)] bg-[var(--surface)] p-5 lg:sticky lg:top-24">
        <h2 className="heading text-2xl">Фильтры</h2>
        <label className="mt-5 grid gap-2 text-xs">Поиск<input value={query} onChange={(event) => { setQuery(event.target.value); setParam("q", event.target.value); }} className="field" placeholder="Название, сплав или назначение" /></label>
        <Filter label="Тип продукции" value={type} onChange={(value) => setParam("type", value)} options={[["","Все"],["heat-resistant-casting","Жаропрочное литьё"],["centrifugal-casting","Центробежное литьё"],["furnace-equipment","Печная оснастка"],["machined-part","Мехобработка"],["conveyor-part","Конвейерные детали"],["custom-part","По чертежу"]]} />
        <Filter label="Материал" value={material} onChange={(value) => setParam("material", value)} options={[["","Все"],["жаропроч","Жаропрочные стали"],["чугун","Чугун"],["углерод","Углеродистые стали"],["нержав","Нержавеющие стали"]]} />
        <Filter label="Изготовление по чертежу" value={custom} onChange={(value) => setParam("custom", value)} options={[["","Все"],["true","Доступно"]]} />
      </aside>
      <div>
        <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-4"><p>{result.length} позиций</p><span className="text-xs text-[var(--foreground-muted)]">Расчёт после чертежа или ТЗ</span></div>
        {result.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{result.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <EmptyState message="По выбранным параметрам позиций нет. Отправьте чертёж, и мы рассчитаем изделие индивидуально." />}
      </div>
    </div>
  );
}

function Filter({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[][] }) {
  return <label className="mt-4 grid gap-2 text-xs">{label}<select className="field" value={value} onChange={(event) => onChange(event.target.value)}>{options.map(([optionValue, name]) => <option key={optionValue} value={optionValue}>{name}</option>)}</select></label>;
}
