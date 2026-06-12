import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return <Container className="grid min-h-[65vh] place-items-center py-20 text-center"><div><p className="heading text-[9rem] leading-none text-[var(--border-strong)]">404</p><h1 className="heading text-5xl">Страница не найдена</h1><p className="mt-5 text-[var(--foreground-muted)]">Проверьте адрес или перейдите в каталог продукции.</p><Link href="/catalog" className="btn-primary mt-7">Открыть каталог</Link></div></Container>;
}
