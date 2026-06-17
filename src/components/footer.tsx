import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/logo";
import { company } from "@/config/company";

export function Footer() {
  return (
    <footer className="relative z-10 isolate border-t border-[var(--border)] bg-[#0b0d0e] pb-[calc(7rem+env(safe-area-inset-bottom))] pt-12 lg:pb-12">
      <Container className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div><Logo /><p className="mt-5 text-sm leading-6 text-[var(--foreground-muted)]">Жаропрочное литьё, центробежнолитые изделия и механическая обработка металла по чертежам заказчика.</p></div>
        <div><h2 className="mb-4 font-bold uppercase">Продукция</h2><div className="grid gap-2 text-sm text-[var(--foreground-muted)]"><Link href="/catalog/retorty">Реторты/Муфели</Link><Link href="/catalog/radiantnye-truby">Радиантные трубы</Link><Link href="/catalog/centrobezhnolitye-truby">Центробежнолитые трубы</Link><Link href="/catalog/pechnaya-osnastka">Печная оснастка</Link></div></div>
        <div><h2 className="mb-4 font-bold uppercase">Работа по чертежам</h2><div className="grid gap-2 text-sm text-[var(--foreground-muted)]"><Link href="/services">Услуги</Link><Link href="/custom-production">Отправить чертёж</Link><Link href="/steel-grades">Марки стали</Link><Link href="/documents">Документы</Link></div></div>
        <div>
          <h2 className="mb-4 font-bold uppercase">Контакты</h2>
          <div className="grid gap-2 text-sm leading-6 text-[var(--foreground-muted)]">
            <a href={company.phone.href}>{company.phone.display}</a>
            {company.additionalPhones.slice(0, 2).map((phone) => (
              <a key={phone.href} href={phone.href}>{phone.display}</a>
            ))}
            <a href={company.email.href} className="break-all">{company.email.display}</a>
            <p>{company.productionAddress}</p>
          </div>
          <Link href="/request-quote" className="mt-5 inline-block text-sm font-bold text-[var(--accent)]">Отправить чертёж →</Link>
        </div>
      </Container>
      <Container className="mt-10 flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-xs leading-5 text-[var(--foreground-muted)] sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} {company.legalName} · ИНН {company.requisites.inn}</span>
        <span className="flex flex-col gap-2 sm:flex-row sm:gap-1">
          <Link href="/privacy" className="underline decoration-[var(--border-strong)] underline-offset-4">
            Политика конфиденциальности
          </Link>
          <span className="hidden sm:inline">·</span>
          <Link href="/personal-data-consent" className="underline decoration-[var(--border-strong)] underline-offset-4">
            Согласие на обработку данных
          </Link>
        </span>
      </Container>
    </footer>
  );
}
