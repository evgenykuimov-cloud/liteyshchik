"use client";

import { useMemo, useState } from "react";
import { Download, FileClock, Search } from "lucide-react";
import { documents } from "@/data/documents";

export function DocumentsSection() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const result = useMemo(() => documents.filter((item) => (!type || item.type === type) && item.title.toLowerCase().includes(query.toLowerCase())), [query, type]);
  return (
    <div>
      <div className="mb-8 grid gap-3 sm:grid-cols-2"><label className="relative"><span className="sr-only">Поиск документов</span><Search className="absolute left-4 top-3.5 text-[var(--foreground-muted)]" size={20} /><input className="field pl-12" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск документов" /></label><label><span className="sr-only">Тип документа</span><select className="field" value={type} onChange={(event) => setType(event.target.value)}><option value="">Все типы</option>{[...new Set(documents.map((item) => item.type))].map((item) => <option key={item}>{item}</option>)}</select></label></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {result.map((item) => (
          <article key={item.id} className="border border-[var(--border)] bg-[var(--surface)] p-6">
            <FileClock className="text-[var(--accent)]" />
            <p className="mt-8 text-xs uppercase text-[var(--foreground-muted)]">{item.type} · {item.category}</p>
            <h2 className="heading mt-3 text-3xl">{item.title}</h2>
            {item.href ? (
              <div className="mt-5 border-t border-[var(--border)] pt-4">
                <p className="text-sm text-[var(--foreground-muted)]">{item.updatedAt ? `Обновлено: ${item.updatedAt}` : "Файл готов к скачиванию"}</p>
                <a href={item.href} target="_blank" rel="noreferrer" className="btn-primary mt-4 w-full"><Download size={18} />Открыть PDF</a>
              </div>
            ) : (
              <p className="mt-5 border-t border-[var(--border)] pt-4 text-sm text-[var(--foreground-muted)]">TODO: файл ожидает загрузки и проверки</p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
