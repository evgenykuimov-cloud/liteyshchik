"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  ["/catalog", "Каталог"],
  ["/production", "Производство"],
  ["/custom-production", "Изделия под заказ"],
  ["/designers", "Проектировщикам"],
  ["/documents", "Документы"],
  ["/about", "О компании"],
  ["/contacts", "Контакты"],
];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button className="grid size-11 place-items-center border border-[var(--border)]" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Закрыть меню" : "Открыть меню"}>
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <div className="fixed inset-x-0 top-[73px] z-50 border-y border-[var(--border)] bg-[#101315] p-5 shadow-2xl">
          <nav className="grid">
            {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="border-b border-[var(--border)] py-4 font-bold uppercase">{label}</Link>)}
          </nav>
          <Link href="/request-quote" onClick={() => setOpen(false)} className="btn-primary mt-6 w-full">Получить КП</Link>
        </div>
      )}
    </div>
  );
}
