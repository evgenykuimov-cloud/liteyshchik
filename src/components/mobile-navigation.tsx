"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Menu, Phone, X } from "lucide-react";
import { company } from "@/config/company";

const links = [
  ["/catalog", "Продукция"],
  ["/services", "Услуги"],
  ["/production", "Производство"],
  ["/steel-grades", "Марки стали"],
  ["/documents", "Документы"],
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
          <div className="mt-5 grid gap-3 text-sm">
            <a href={company.phone.href} className="flex items-center gap-3 text-[var(--foreground-muted)]"><Phone size={18} className="text-[var(--accent)]" />{company.phone.display}</a>
            <a href={company.email.href} className="flex items-center gap-3 break-all text-[var(--foreground-muted)]"><Mail size={18} className="shrink-0 text-[var(--accent)]" />{company.email.display}</a>
          </div>
          <Link href="/request-quote" onClick={() => setOpen(false)} className="btn-primary mt-6 w-full">Отправить чертёж на расчёт</Link>
        </div>
      )}
    </div>
  );
}
