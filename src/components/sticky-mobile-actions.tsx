import { FileText, Phone } from "lucide-react";
import { company, quoteEmailHref } from "@/config/company";

export function StickyMobileActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-[var(--border)] bg-[#0b0d0e] px-2 pb-[calc(.5rem+env(safe-area-inset-bottom))] pt-2 lg:hidden">
      <a href={company.phone.href} className="flex min-h-12 items-center justify-center gap-2 text-sm text-[var(--foreground-muted)]"><Phone size={17} /> Позвонить</a>
      <a href={quoteEmailHref} className="flex min-h-12 items-center justify-center gap-2 bg-[var(--accent)] text-sm font-bold text-black"><FileText size={17} /> Запросить цену</a>
    </div>
  );
}
