import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  Factory,
  FileClock,
  Gauge,
  PackageCheck,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { Category, Product } from "@/types/catalog";

export function ProductHero({
  product,
  category,
}: {
  product: Product;
  category?: Category;
}) {
  const keyRows = [
    findSpec(product, "Нормативный документ"),
    findSpec(product, "Высота"),
    findSpec(product, "Класс нагрузки"),
    {
      label: "Рекомендуемые места установки",
      value: product.application?.join(", ") || "Определяются проектом",
    },
  ];
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Комплектность",
      text: product.completeness[0]?.description ?? "Уточняется при запросе",
    },
    {
      icon: Gauge,
      title: "Расчётная нагрузка",
      text: "Класс подтверждается документацией",
    },
    {
      icon: product.productType === "storm-drain" ? Droplets : PackageCheck,
      title: product.productType === "storm-drain" ? "Водоотведение" : "Назначение",
      text:
        product.productType === "storm-drain"
          ? "Открытая решётчатая конструкция"
          : "Применимость определяется проектом",
    },
    {
      icon: Factory,
      title: "Серийное производство",
      text: "Параметры партии уточняются при запросе",
    },
  ];

  return (
    <section className="product-hero-frame overflow-hidden border border-[var(--border)] bg-[#0c0f11]">
      <div className="grid xl:grid-cols-[1.12fr_.88fr]">
        <div className="relative min-h-[620px] overflow-hidden border-b border-[var(--border)] bg-[#15191b] xl:min-h-[860px] xl:border-b-0 xl:border-r">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            priority
            sizes="(max-width: 1279px) 100vw, 56vw"
            className={
              product.id === "demo-rect-drain"
                ? "object-cover object-center"
                : "object-contain object-center p-8"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          <p className="absolute bottom-5 left-5 border-l-2 border-[var(--accent)] bg-black/65 px-4 py-3 text-[10px] uppercase tracking-[.14em] text-white/70 backdrop-blur-sm">
            Фотография предоставленного образца
          </p>
        </div>

        <div className="relative flex flex-col p-6 sm:p-10 xl:p-12">
          <div className="pointer-events-none absolute right-0 top-0 size-64 opacity-40 [background:linear-gradient(135deg,transparent_49.7%,var(--accent-dark)_50%,transparent_50.3%)]" />
          <div className="relative">
            <div className="mb-8 flex items-center gap-4">
              <span className="grid size-14 place-items-center border border-[var(--accent)] text-[var(--accent)]">
                <Wrench size={28} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--foreground-muted)]">
                  {category?.name}
                </p>
                <p className="mt-1 text-sm font-bold">ООО «Литейщик»</p>
              </div>
            </div>

            <div className="mb-10 h-px bg-gradient-to-r from-[var(--accent)] via-[var(--accent-dark)] to-transparent" />
            <h1 className="heading max-w-3xl text-5xl [overflow-wrap:normal] sm:text-6xl xl:text-[4.35rem]">
              {product.id === "demo-rect-drain" ? (
                <>
                  <span className="block">Дождеприёмник</span>
                  <span className="block">ДБ 400/800</span>
                </>
              ) : (
                product.name
              )}
            </h1>
            <p className="mt-4 text-xl text-[var(--accent)]">
              {product.productType === "storm-drain"
                ? "Чугунное литьё для водоотведения"
                : product.shortDescription}
            </p>

            <div className="mt-14 flex items-center gap-3">
              <span className="grid size-11 place-items-center border border-[var(--accent)] text-[var(--accent)]">
                <PackageCheck size={24} />
              </span>
              <h2 className="font-bold uppercase tracking-[.08em]">
                Характеристики
              </h2>
            </div>

            <dl className="mt-5 border border-[var(--border-strong)] bg-black/20 px-5 sm:px-7">
              {keyRows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 border-b border-[var(--border)] py-5 last:border-b-0 sm:grid-cols-[190px_1fr]"
                >
                  <dt className="flex gap-3 font-bold">
                    <span className="mt-2 size-1.5 shrink-0 bg-[var(--accent)]" />
                    {row.label}:
                  </dt>
                  <dd className="leading-7 text-[var(--foreground-muted)]">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 grid gap-3">
              <Link
                href="#quote"
                className="flex min-h-16 items-center justify-between bg-[var(--accent)] px-6 font-bold text-black transition hover:bg-[var(--accent-hover)]"
              >
                <span className="flex items-center gap-3">
                  <PackageCheck />
                  Запросить цену
                </span>
                <ArrowRight />
              </Link>
              <div className="flex min-h-16 items-center justify-between border border-[var(--accent-dark)] px-6 text-[var(--foreground-muted)]">
                <span className="flex items-center gap-3">
                  <FileClock className="text-[var(--accent)]" />
                  Карточка изделия готовится
                </span>
                <span className="text-xs uppercase">Нет файла</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid border-t border-[var(--border)] sm:grid-cols-2 xl:grid-cols-4">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex min-h-32 gap-4 border-b border-[var(--border)] p-6 sm:border-r xl:border-b-0 last:border-r-0"
          >
            <Icon className="shrink-0 text-[var(--accent)]" size={34} />
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[.04em]">
                {title}
              </h2>
              <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)]">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function findSpec(product: Product, label: string) {
  const item = product.specifications.find((spec) => spec.label === label);
  return { label, value: item?.value ?? "Уточняется" };
}
