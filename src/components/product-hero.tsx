"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Factory,
  FileText,
  Hammer,
  PackageCheck,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { Category, Product } from "@/types/catalog";
import { company, quoteEmailHref } from "@/config/company";

export function ProductHero({
  product,
  category,
}: {
  product: Product;
  category?: Category;
}) {
  const variantGallery = product.variants
    ?.filter((variant) => variant.image)
    .map((variant) => ({
      name: variant.name,
      description: variant.description,
      image: variant.image!,
    }));
  const gallery = variantGallery?.length
    ? variantGallery
    : product.images.map((image) => ({
        name: image.label ?? product.name,
        description: product.shortDescription,
        image,
      }));
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = gallery[activeIndex] ?? gallery[0];
  const activeImage = activeSlide.image;
  const keyRows = [
    { label: "Производство", value: "литьё по чертежам, эскизам и техническим требованиям заказчика" },
    { label: "Материалы", value: product.materials.join(", ") },
    { label: "Назначение", value: product.application.join(", ") || "по проекту заказчика" },
    findSpec(product, "Мехобработка"),
    findSpec(product, "Контроль качества"),
  ];
  const benefits = [
    {
      icon: ShieldCheck,
      title: "По чертежам",
      text: "Изготовление по КД, эскизу, образцу или техническому заданию.",
    },
    {
      icon: Factory,
      title: "Собственное литьё",
      text: "Отливки для печного, термического и машиностроительного оборудования.",
    },
    {
      icon: Hammer,
      title: "Мехобработка",
      text: "Размеры, посадки и обработка согласуются по рабочей документации.",
    },
    {
      icon: PackageCheck,
      title: "Партии и единичные изделия",
      text: "Расчёт выполняется после получения чертежа, материала и объёма.",
    },
  ];

  return (
    <section className="product-hero-frame overflow-hidden border border-[var(--border)] bg-[#0c0f11]">
      <div className="grid xl:grid-cols-[1.12fr_.88fr]">
        <div className="relative self-start overflow-hidden border-b border-[var(--border)] bg-[#15191b] p-4 sm:p-6 xl:border-b-0 xl:border-r">
          <div className="relative aspect-[16/9] overflow-hidden bg-black">
            <Image
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              sizes="(max-width: 1279px) 100vw, 56vw"
              className="object-cover object-center transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
          </div>
          {gallery.length > 1 && (
            <div className="relative z-10 mt-4">
              <div className="mb-4 max-w-xl border-l-2 border-[var(--accent)] bg-black/65 px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--accent)]">
                  {activeSlide.name}
                </p>
                <p className="mt-1 text-xs leading-5 text-white/70">
                  {activeSlide.description}
                </p>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {gallery.map((slide, index) => (
                  <button
                    key={slide.name}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-20 w-28 shrink-0 overflow-hidden border bg-black/60 transition ${
                      activeIndex === index ? "border-[var(--accent)]" : "border-[var(--border-strong)] hover:border-[var(--accent-dark)]"
                    }`}
                    aria-label={`Показать ${slide.name}`}
                  >
                    <Image src={slide.image.src} alt="" fill sizes="112px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
          {gallery.length === 1 && (
            <p className="relative z-10 mt-4 border-l-2 border-[var(--accent)] bg-black/65 px-4 py-3 text-[10px] uppercase tracking-[.14em] text-white/70 backdrop-blur-sm">
              Изображение типовое. TODO: заменить фактической фотографией изделия
            </p>
          )}
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
                <p className="mt-1 text-sm font-bold">{company.legalName}</p>
              </div>
            </div>

            <div className="mb-10 h-px bg-gradient-to-r from-[var(--accent)] via-[var(--accent-dark)] to-transparent" />
            <h1 className="heading max-w-3xl text-5xl [overflow-wrap:normal] sm:text-6xl xl:text-[4.35rem]">
              {product.name}
            </h1>
            <p className="mt-4 text-xl text-[var(--accent)]">
              {product.shortDescription}
            </p>

            {gallery.length > 1 && (
              <div className="mt-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[var(--accent)]">
                  Выберите вид реторты/муфеля
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {gallery.map((slide, index) => (
                    <button
                      key={slide.name}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`border px-4 py-3 text-left text-xs font-bold uppercase leading-5 transition ${
                        activeIndex === index
                          ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                          : "border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--accent-dark)] hover:text-white"
                      }`}
                    >
                      {slide.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                  {product.calculationCta ?? "Отправить чертёж на расчёт"}
                </span>
                <ArrowRight />
              </Link>
              <Link
                href={quoteEmailHref}
                className="flex min-h-16 items-center justify-between border border-[var(--accent-dark)] px-6 text-[var(--foreground-muted)] transition hover:border-[var(--accent)] hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <FileText className="text-[var(--accent)]" />
                  Получить консультацию инженера
                </span>
                <ArrowRight />
              </Link>
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
