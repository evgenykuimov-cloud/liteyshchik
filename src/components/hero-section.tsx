import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";

export function HeroSection() {
  return (
    <section className="noise relative min-h-[calc(100svh-72px)] overflow-hidden border-b border-[var(--border)]">
      <Container className="grid min-h-[calc(100svh-72px)] items-center gap-8 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,.95fr)] lg:py-20">
        <div className="relative z-10 min-w-0">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-[var(--accent)]"><span className="h-px w-12 bg-[var(--accent)]" /> Промышленное производство</p>
          <h1 className="heading text-balance text-[clamp(3.25rem,6.2vw,7rem)]">Производство чугунных люков, дождеприёмников и обойм</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--foreground-muted)] sm:text-lg">Серийное производство и изготовление изделий из чугуна по индивидуальным размерам, чертежам и техническим требованиям заказчика.</p>
          <ul className="mt-7 grid gap-3 text-sm sm:grid-cols-3">
            {["Собственное производство", "Серийные и нестандартные изделия", "Комплекты с чугунными обоймами"].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="shrink-0 text-[var(--accent)]" size={19} />{item}</li>)}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/catalog" className="btn-primary">Перейти в каталог <ArrowDownRight size={18} /></Link><Link href="/request-quote" className="btn-secondary">Получить коммерческое предложение</Link></div>
          <Link href="/custom-production" className="mt-5 inline-block border-b border-[var(--foreground-muted)] pb-1 text-sm text-[var(--foreground-muted)] hover:text-white">Отправить чертёж или техническое задание</Link>
        </div>
        <div className="relative">
          <div className="absolute inset-10 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <Image priority src="/images/product-placeholder.svg" alt="Демонстрационная визуализация чугунного люка в комплекте с обоймой" width={1200} height={900} className="relative w-full object-contain drop-shadow-2xl" />
        </div>
      </Container>
    </section>
  );
}
