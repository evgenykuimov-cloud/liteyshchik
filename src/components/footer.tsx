import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[#0b0d0e] py-12">
      <Container className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div><Logo /><p className="mt-5 text-sm leading-6 text-[var(--foreground-muted)]">Корпоративный сайт-каталог промышленного чугунного литья.</p></div>
        <div><h2 className="mb-4 font-bold uppercase">Каталог</h2><div className="grid gap-2 text-sm text-[var(--foreground-muted)]"><Link href="/catalog/chugunnye-lyuki">Чугунные люки</Link><Link href="/catalog/dozhdepriemniki">Дождеприёмники</Link><Link href="/catalog/oboymy">Обоймы</Link><Link href="/catalog/komplekty">Комплекты</Link></div></div>
        <div><h2 className="mb-4 font-bold uppercase">Компания</h2><div className="grid gap-2 text-sm text-[var(--foreground-muted)]"><Link href="/production">Производство</Link><Link href="/quality">Контроль качества</Link><Link href="/delivery">Доставка</Link><Link href="/projects">Поставки и объекты</Link></div></div>
        <div><h2 className="mb-4 font-bold uppercase">Контакты</h2><p className="text-sm leading-6 text-[var(--foreground-muted)]">Контактные данные будут добавлены после подтверждения компанией.</p><Link href="/request-quote" className="mt-5 inline-block text-sm font-bold text-[var(--accent)]">Отправить запрос →</Link></div>
      </Container>
      <Container className="mt-10 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-xs text-[var(--foreground-muted)] sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} ООО «Литейщик»</span>
        <span><Link href="/privacy">Политика конфиденциальности</Link> · <Link href="/personal-data-consent">Согласие на обработку данных</Link></span>
      </Container>
    </footer>
  );
}
