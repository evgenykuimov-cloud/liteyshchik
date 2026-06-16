import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RequestQuoteForm } from "@/components/request-quote-form";
import { DocumentsSection } from "@/components/documents-section";
import { pages } from "@/data/pages";
import { company, yandexMapEmbedHref, yandexMapHref } from "@/config/company";

const specialSlugs = ["documents", "request-quote", "privacy", "personal-data-consent"];
export const dynamicParams = false;

export function generateStaticParams() {
  return [...Object.keys(pages), ...specialSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  const titles: Record<string, string> = { documents: "Документы", "request-quote": "Запрос коммерческого предложения", privacy: "Политика конфиденциальности", "personal-data-consent": "Согласие на обработку персональных данных" };
  const title = page?.title ?? titles[slug];
  if (!title) return {};
  return { title, description: page?.description ?? `${title} — ${company.legalName}`, alternates: { canonical: `/${slug}` } };
}

export default async function InformationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "documents") return <DocumentPage />;
  if (slug === "request-quote") return <QuotePage />;
  if (slug === "privacy" || slug === "personal-data-consent") return <LegalPage consent={slug === "personal-data-consent"} />;
  const page = pages[slug];
  if (!page) notFound();
  const showForm = ["custom-production", "designers", "procurement", "contacts"].includes(slug);
  return (
    <Container className="section-shell">
      <Breadcrumbs items={[{ label: page.title }]} />
      <p className="text-sm font-bold uppercase tracking-[.18em] text-[var(--accent)]">{page.eyebrow}</p>
      <h1 className="heading mt-5 max-w-6xl text-6xl sm:text-8xl lg:text-9xl">{page.title}</h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--foreground-muted)]">{page.description}</p>
      <div className="my-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {page.sections.map((section, index) => section.type === "map" ? (
          <section key={section.title} className="overflow-hidden border border-[var(--border)] bg-[var(--surface)] md:col-span-2 lg:col-span-3">
            <div className="p-6">
              <span className="font-mono text-sm text-[var(--accent)]">0{index + 1}</span>
              <h2 className="heading mt-6 text-3xl">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">{section.text}</p>
              <a href={yandexMapHref} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-bold text-[var(--accent)] underline underline-offset-4">Открыть в Яндекс Картах →</a>
            </div>
            <iframe
              src={yandexMapEmbedHref}
              title={`Яндекс Карта: ${section.text}`}
              loading="lazy"
              allowFullScreen
              className="h-[360px] w-full border-0 sm:h-[440px]"
            />
          </section>
        ) : (
          <section key={section.title} className="min-h-64 border border-[var(--border)] bg-[var(--surface)] p-6"><span className="font-mono text-sm text-[var(--accent)]">0{index + 1}</span><h2 className="heading mt-10 text-3xl">{section.title}</h2>{section.href ? <a href={section.href} className="mt-4 block break-all text-sm leading-6 text-[var(--accent)] underline underline-offset-4">{section.text}</a> : <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">{section.text}</p>}{section.items && <ul className="mt-4 grid gap-2 text-sm">{section.items.map((item) => <li key={item} className="break-all border-l border-[var(--accent)] pl-3">{item}</li>)}</ul>}</section>
        ))}
      </div>
      {showForm && <section className="border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-9"><h2 className="heading mb-8 text-5xl">Отправить технический запрос</h2><RequestQuoteForm /></section>}
    </Container>
  );
}

function DocumentPage() {
  return <Container className="section-shell"><Breadcrumbs items={[{ label: "Документы" }]} /><p className="text-sm font-bold text-[var(--accent)]">ТЕХНИЧЕСКИЙ АРХИВ</p><h1 className="heading mt-5 text-7xl sm:text-9xl">Документы</h1><p className="my-8 max-w-3xl text-[var(--foreground-muted)]">Публикуются только проверенные документы Камского Литейного Завода. Сейчас файлы ожидают предоставления компанией.</p><DocumentsSection /></Container>;
}

function QuotePage() {
  return <Container className="section-shell"><Breadcrumbs items={[{ label: "Запрос КП" }]} /><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-sm font-bold text-[var(--accent)]">B2B-ЗАПРОС</p><h1 className="heading mt-5 text-6xl sm:text-8xl">Отправить чертёж на расчёт</h1><p className="mt-6 leading-7 text-[var(--foreground-muted)]">Заполните обязательные поля и приложите чертёж, спецификацию или 3D-модель. Канал автоматической отправки формы настраивается; сейчас запрос можно направить напрямую на <a href={company.email.href} className="text-[var(--accent)] underline underline-offset-4">{company.email.display}</a> или обсудить по телефону <a href={company.phone.href} className="text-[var(--accent)] underline underline-offset-4">{company.phone.display}</a>.</p></div><div className="border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-9"><RequestQuoteForm /></div></div></Container>;
}

function LegalPage({ consent }: { consent: boolean }) {
  return <Container className="section-shell max-w-4xl"><Breadcrumbs items={[{ label: consent ? "Согласие на обработку данных" : "Политика конфиденциальности" }]} /><h1 className="heading text-5xl sm:text-7xl">{consent ? "Согласие на обработку персональных данных" : "Политика конфиденциальности"}</h1><div className="mt-8 grid gap-5 leading-7 text-[var(--foreground-muted)]"><p>Документ является редакционной заготовкой и требует юридической проверки до начала реального сбора персональных данных.</p><p>Оператор: {company.fullLegalName}, ИНН {company.requisites.inn}, ОГРН {company.requisites.ogrn}. Адрес: {company.legalAddress}. Email: <a href={company.email.href} className="text-[var(--accent)] underline underline-offset-4">{company.email.display}</a>.</p><p>Форма предназначена для обработки запросов на литейную продукцию и мехобработку. Состав, сроки хранения, правовые основания и порядок отзыва согласия должны быть утверждены компанией.</p></div></Container>;
}
