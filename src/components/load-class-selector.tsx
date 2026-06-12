"use client";

import { useState } from "react";
import Link from "next/link";

const items = [
  ["A15", "Пешеходные зоны и территории с соответствующими проектными требованиями"],
  ["B125", "Типовые зоны применения определяются проектом и документацией"],
  ["C250", "Участки с повышенной расчётной нагрузкой"],
  ["D400", "Дорожные зоны при подтверждённой применимости изделия"],
  ["E600", "Промышленные территории по требованиям проекта"],
  ["F900", "Особо тяжёлые условия при техническом подтверждении"],
] as const;

export function LoadClassSelector() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="border border-[var(--border)] bg-[#111416]">
      <div className="grid grid-cols-3 md:grid-cols-6">
        {items.map(([name], index) => (
          <button key={name} onClick={() => setSelected(index)} className={`min-h-24 border-b border-r border-[var(--border)] p-3 text-center ${selected === index ? "bg-[var(--accent)] text-black" : "hover:bg-[var(--surface)]"}`} aria-pressed={selected === index}>
            <strong className="heading text-2xl">{name}</strong>
          </button>
        ))}
      </div>
      <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div><p className="font-bold">{items[selected][0]}</p><p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{items[selected][1]}</p></div>
        <Link href={`/catalog?loadClass=${items[selected][0]}`} className="btn-primary">Подобрать изделие</Link>
      </div>
      <p className="border-t border-[var(--border)] p-4 text-xs leading-5 text-[var(--foreground-muted)]">Класс нагрузки и применимость конкретного изделия необходимо подтверждать технической документацией и требованиями проекта.</p>
    </div>
  );
}
