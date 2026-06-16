import {
  Building2,
  ClipboardCheck,
  Factory,
  FileBox,
  HardHat,
  Layers3,
  Ruler,
  Truck,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCategoryCard } from "@/components/category-card";
import { categories } from "@/data/catalog";
import { RequestQuoteForm } from "@/components/request-quote-form";

const advantages = [
  [Factory, "Собственное литейное производство"],
  [Wrench, "Мехобработка отливок"],
  [Ruler, "Работа по чертежам и ТЗ"],
  [Layers3, "Жаропрочные и специальные сплавы"],
  [FileBox, "Документы и техописания"],
  [Truck, "Поставка для промышленных заказчиков"],
] as const;

export function HomeSections() {
  const selected = categories.slice(0, 6);

  return (
    <>
      <section className="section-shell">
        <Container>
          <SectionHeading
            eyebrow="01 / ПРОДУКЦИЯ"
            title="Каталог литейной продукции"
            description="Номенклатура Камского Литейного Завода: жаропрочное литьё, печная оснастка, центробежнолитые трубы, ролики, валки и детали по чертежам заказчика."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {selected.map((item, index) => (
              <ProductCategoryCard
                key={item.slug}
                name={item.name}
                description={item.description}
                href={`/catalog/${item.slug}`}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-10">
        <Container>
          <div className="grid gap-px bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map(([Icon, title]) => (
              <div key={title} className="flex min-h-36 gap-4 bg-[var(--surface)] p-6">
                <Icon className="shrink-0 text-[var(--accent)]" />
                <div>
                  <h3 className="font-bold uppercase">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                    Параметры и условия подтверждаются при обработке конкретного запроса.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell">
        <Container>
          <SectionHeading eyebrow="03 / ПРОИЗВОДСТВО" title="Серийная продукция и изготовление по чертежам" />
          <div className="grid gap-4 lg:grid-cols-2">
            <InfoPanel
              icon={Factory}
              title="Производство"
              text="Литьё деталей для печного, термического и машиностроительного оборудования. Раздел будет дополнен фактическими фотографиями и описанием оборудования предприятия."
              href="/production"
            />
            <InfoPanel
              icon={ClipboardCheck}
              title="Контроль качества"
              text="Контроль размеров, внешнего вида, марки материала и сопроводительной документации описывается только по подтверждённым данным предприятия."
              href="/quality"
            />
          </div>
        </Container>
      </section>

      <section className="section-shell border-y border-[var(--border)] bg-[var(--background-secondary)]">
        <Container>
          <SectionHeading
            eyebrow="04 / ВОЗМОЖНОСТИ"
            title="От чертежа до готовой детали"
            description="Сайт подготовлен под B2B-запросы: заказчик отправляет чертёж, материал, условия эксплуатации и объём партии, после чего предприятие рассчитывает возможность изготовления."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Литьё", "Подбор технологии и материала под назначение детали"],
              ["Мехобработка", "Доведение размеров и посадок по рабочей документации"],
              ["Документы", "Паспорта, сертификаты и техописания публикуются после проверки"],
            ].map(([title, text], index) => (
              <div key={title} className="subtle-grid min-h-60 border border-[var(--border)] p-6">
                <span className="heading text-7xl text-[var(--border-strong)]">0{index + 1}</span>
                <h3 className="heading mt-10 text-3xl">{title}</h3>
                <p className="mt-2 text-sm text-[var(--foreground-muted)]">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell bg-[var(--light-section)] text-[var(--light-text)]">
        <Container>
          <SectionHeading eyebrow="05 / ПРИМЕНЕНИЕ" title="Отрасли применения" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Термическое оборудование",
              "Промышленные печи",
              "Металлургия",
              "Машиностроение",
              "Конвейерные линии",
              "Ремонтная оснастка",
            ].map((item, index) => (
              <div key={item} className="border border-black/20 p-6">
                <span className="font-mono text-sm">0{index + 1}</span>
                <h3 className="heading mt-12 text-3xl">{item}</h3>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            <InfoPanel
              icon={Ruler}
              title="Изготовление по чертежам"
              text="Отправьте КД, эскиз, спецификацию, марку материала, количество и условия эксплуатации."
              href="/custom-production"
            />
            <InfoPanel
              icon={HardHat}
              title="Проектировщикам"
              text="Раздел для PDF-техописаний, чертежей, STEP/DWG-файлов и материалов для проектной документации."
              href="/designers"
            />
            <InfoPanel
              icon={Building2}
              title="Снабженцам"
              text="Запрос цены, загрузка спецификации, реквизиты заказчика и контакт для обратной связи."
              href="/procurement"
            />
          </div>
        </Container>
      </section>

      <section className="section-shell border-y border-[var(--border)] bg-[var(--surface)]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-sm font-bold text-[var(--accent)]">10 / ЗАПРОС</p>
              <h2 className="heading mt-5 text-5xl lg:text-7xl">Отправить чертёж на расчёт</h2>
              <p className="mt-5 text-[var(--foreground-muted)]">
                Приложите спецификацию, чертёж или техническое задание. До подключения автоматической доставки запрос можно направить напрямую на указанный email.
              </p>
            </div>
            <RequestQuoteForm compact />
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoPanel({
  icon: Icon,
  title,
  text,
  href,
}: {
  icon: typeof Factory;
  title: string;
  text: string;
  href: string;
}) {
  return (
    <article className="noise min-h-80 min-w-0 border border-[var(--border)] p-7">
      <Icon className="text-[var(--accent)]" size={34} />
      <h3 className="heading mt-16 text-4xl">{title}</h3>
      <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--foreground-muted)]">{text}</p>
      <a href={href} className="btn-secondary mt-6">
        Подробнее
      </a>
    </article>
  );
}
