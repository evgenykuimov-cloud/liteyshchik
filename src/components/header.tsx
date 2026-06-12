import Link from "next/link";
import { Logo } from "@/components/logo";
import { MobileNavigation } from "@/components/mobile-navigation";
import { Container } from "@/components/ui/container";

const links = [
  ["/production", "Производство"],
  ["/custom-production", "Под заказ"],
  ["/designers", "Проектировщикам"],
  ["/documents", "Документы"],
  ["/about", "О компании"],
  ["/contacts", "Контакты"],
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0d0e]/95 backdrop-blur-lg">
      <a href="#main-content" className="fixed left-3 top-3 z-[100] -translate-y-24 bg-[var(--accent)] p-3 text-black focus:translate-y-0">К содержимому</a>
      <Container className="flex min-h-[72px] items-center justify-between gap-5">
        <Logo />
        <nav className="hidden items-center gap-5 text-[11px] font-bold uppercase tracking-wide lg:flex" aria-label="Основная навигация">
          <div className="group relative">
            <Link href="/catalog" className="py-7">Каталог</Link>
            <div className="invisible absolute left-0 top-full w-[620px] translate-y-2 border border-[var(--border)] bg-[#131719] p-5 opacity-0 shadow-2xl transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["/catalog/chugunnye-lyuki", "Чугунные люки"],
                  ["/catalog/kruglye-lyuki", "Круглые люки"],
                  ["/catalog/pryamougolnye-lyuki", "Прямоугольные люки"],
                  ["/catalog/dozhdepriemniki", "Дождеприёмники"],
                  ["/catalog/oboymy", "Обоймы"],
                  ["/catalog/kryshki", "Крышки"],
                  ["/catalog/reshetki", "Решётки"],
                  ["/catalog/komplekty", "Комплекты"],
                  ["/catalog", "Все изделия"],
                ].map(([href, label]) => <Link key={href} href={href} className="border border-[var(--border)] p-3 hover:border-[var(--accent)]">{label}</Link>)}
              </div>
            </div>
          </div>
          {links.map(([href, label]) => <Link key={href} href={href} className="py-7 hover:text-[var(--accent)]">{label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <span className="text-right text-xs text-[var(--foreground-muted)]">Контактные данные<br />будут добавлены</span>
          <Link href="/request-quote" className="btn-primary">Получить КП</Link>
        </div>
        <MobileNavigation />
      </Container>
    </header>
  );
}
