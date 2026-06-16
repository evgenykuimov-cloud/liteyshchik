import Link from "next/link";
import { Logo } from "@/components/logo";
import { MobileNavigation } from "@/components/mobile-navigation";
import { Container } from "@/components/ui/container";
import { company } from "@/config/company";

const links = [
  ["/catalog", "Продукция"],
  ["/services", "Услуги"],
  ["/production", "Производство"],
  ["/steel-grades", "Марки стали"],
  ["/documents", "Документы"],
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
            <Link href="/catalog" className="py-7">Продукция</Link>
            <div className="invisible absolute left-0 top-full w-[620px] translate-y-2 border border-[var(--border)] bg-[#131719] p-5 opacity-0 shadow-2xl transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["/catalog/retorty", "Реторты"],
                  ["/catalog/mufeli-pechey", "Муфели"],
                  ["/catalog/radiantnye-truby", "Радиантные трубы"],
                  ["/catalog/centrobezhnolitye-truby", "Центробежнолитые трубы"],
                  ["/catalog/valki-i-roliki", "Валки и ролики"],
                  ["/catalog/pechnaya-osnastka", "Печная оснастка"],
                  ["/catalog/zharoprochnoe-litye", "Жаропрочное литьё"],
                  ["/custom-production", "Литьё по чертежам"],
                  ["/catalog", "Все изделия"],
                ].map(([href, label]) => <Link key={href} href={href} className="border border-[var(--border)] p-3 hover:border-[var(--accent)]">{label}</Link>)}
              </div>
            </div>
          </div>
          {links.slice(1).map(([href, label]) => <Link key={href} href={href} className="py-7 hover:text-[var(--accent)]">{label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <div className="text-right text-xs text-[var(--foreground-muted)]">
            <a href={company.phone.href} className="block hover:text-white">{company.phone.display}</a>
            <a href={company.email.href} className="block hover:text-white">{company.email.display}</a>
          </div>
          <Link href="/request-quote" className="btn-primary">Отправить чертёж</Link>
        </div>
        <MobileNavigation />
      </Container>
    </header>
  );
}
