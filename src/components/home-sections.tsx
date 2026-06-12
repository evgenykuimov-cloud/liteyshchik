import Link from "next/link";
import { Building2, ClipboardCheck, Factory, FileBox, HardHat, Layers3, Ruler, Truck, Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCategoryCard } from "@/components/category-card";
import { categories } from "@/data/catalog";
import { LoadClassSelector } from "@/components/load-class-selector";
import { RequestQuoteForm } from "@/components/request-quote-form";

const advantages = [
  [Factory, "Собственное производство"],
  [Wrench, "Серийные и нестандартные изделия"],
  [Ruler, "Производство по чертежам и ТЗ"],
  [Layers3, "Комплектация крышками, решётками и обоймами"],
  [FileBox, "Технические материалы для проектировщиков"],
  [Truck, "Организация поставки для B2B-заказчиков"],
] as const;

export function HomeSections() {
  const selected = [categories[0], categories[3], categories[6], categories[7], categories[8], categories[10]];
  return (
    <>
      <section className="section-shell"><Container><SectionHeading eyebrow="01 / КАТАЛОГ" title="Каталог чугунных изделий" description="Демонстрационная структура ассортимента подготовлена для замены на фактическую номенклатуру предприятия." /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{selected.map((item, index) => <ProductCategoryCard key={item.slug} name={item.name} description={item.description} href={`/catalog/${item.slug}`} index={index} />)}</div></Container></section>
      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-10"><Container><div className="grid gap-px bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">{advantages.map(([Icon, title]) => <div key={title} className="flex min-h-36 gap-4 bg-[var(--surface)] p-6"><Icon className="shrink-0 text-[var(--accent)]" /><div><h3 className="font-bold uppercase">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">Параметры и условия подтверждаются при обработке конкретного запроса.</p></div></div>)}</div></Container></section>
      <section className="section-shell"><Container><SectionHeading eyebrow="03 / ПРОИЗВОДСТВО" title="Серийная продукция и изготовление по чертежам" /><div className="grid gap-4 lg:grid-cols-2"><InfoPanel icon={Factory} title="Производство" text="Серийное производство и изготовление чугунных изделий по техническим требованиям заказчика. Раздел будет дополнен фактическими фотографиями и описанием оборудования предприятия." href="/production" /><InfoPanel icon={ClipboardCheck} title="Контроль качества" text="Структура контроля размеров, внешнего вида, комплектности, маркировки и сопроводительных материалов без неподтверждённых заявлений." href="/quality" /></div></Container></section>
      <section className="section-shell border-y border-[var(--border)] bg-[var(--background-secondary)]"><Container><SectionHeading eyebrow="04 / КОНСТРУКЦИЯ" title="Люки и дождеприёмники с обоймами" description="Комплектность на выбор: полный комплект, крышка или решётка отдельно, чугунная обойма отдельно." /><div className="grid gap-4 md:grid-cols-3">{[["Крышка или решётка", "Верхняя часть изделия"],["Чугунная обойма", "Опорная часть комплекта"],["Собранный комплект", "Согласованная совместимость элементов"]].map(([a,b],i) => <div key={a} className="subtle-grid min-h-60 border border-[var(--border)] p-6"><span className="heading text-7xl text-[var(--border-strong)]">0{i+1}</span><h3 className="heading mt-10 text-3xl">{a}</h3><p className="mt-2 text-sm text-[var(--foreground-muted)]">{b}</p></div>)}</div></Container></section>
      <section className="section-shell"><Container><SectionHeading eyebrow="05 / ПОДБОР" title="Подбор по классу нагрузки" /><LoadClassSelector /></Container></section>
      <section className="section-shell bg-[var(--light-section)] text-[var(--light-text)]"><Container><SectionHeading eyebrow="06 / ПРИМЕНЕНИЕ" title="Отрасли применения" /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{["Дорожное строительство","Благоустройство территорий","Коммунальная инфраструктура","Водоснабжение и водоотведение","Промышленные предприятия","Жилищное строительство"].map((item, i) => <div key={item} className="border border-black/20 p-6"><span className="font-mono text-sm">0{i+1}</span><h3 className="heading mt-12 text-3xl">{item}</h3></div>)}</div></Container></section>
      <section className="section-shell"><Container><div className="grid gap-4 lg:grid-cols-3"><InfoPanel icon={Ruler} title="Изготовление по чертежам" text="Отправьте размеры, чертёж, спецификацию, требуемую комплектность и условия эксплуатации." href="/custom-production" /><InfoPanel icon={HardHat} title="Для проектировщиков" text="Технические материалы для включения продукции в проектную документацию." href="/designers" /><InfoPanel icon={Building2} title="Для снабженцев" text="Запрос цены, загрузка спецификации, выбор комплектности и адреса доставки." href="/procurement" /></div></Container></section>
      <section className="section-shell border-y border-[var(--border)] bg-[var(--surface)]"><Container><div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-sm font-bold text-[var(--accent)]">11 / ЗАПРОС</p><h2 className="heading mt-5 text-5xl lg:text-7xl">Получить коммерческое предложение</h2><p className="mt-5 text-[var(--foreground-muted)]">Приложите спецификацию, чертёж или техническое задание. Отправка будет доступна после настройки канала доставки заявок.</p></div><RequestQuoteForm compact /></div></Container></section>
    </>
  );
}

function InfoPanel({ icon: Icon, title, text, href }: { icon: typeof Factory; title: string; text: string; href: string }) {
  return <article className="noise min-w-0 min-h-80 border border-[var(--border)] p-7"><Icon className="text-[var(--accent)]" size={34} /><h3 className="heading mt-16 text-4xl">{title}</h3><p className="mt-4 max-w-xl text-sm leading-6 text-[var(--foreground-muted)]">{text}</p><Link href={href} className="btn-secondary mt-6">Подробнее</Link></article>;
}
