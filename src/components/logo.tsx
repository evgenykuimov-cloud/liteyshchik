import Image from "next/image";
import Link from "next/link";
import { company } from "@/config/company";

export function Logo() {
  return (
    <Link
      href="/"
      className="group isolate inline-flex min-w-0 items-center gap-3"
      aria-label={`${company.legalName}, главная`}
    >
      <span className="relative grid size-12 shrink-0 place-items-center sm:size-14">
        <span className="absolute inset-1 rounded-full bg-white/20 blur-lg transition group-hover:bg-white/30" aria-hidden="true" />
        <Image
          src="/images/kamalit-mark.png"
          alt=""
          width={112}
          height={112}
          priority
          className="relative size-11 object-contain [filter:drop-shadow(0_0_8px_rgba(255,255,255,.75))] sm:size-[3.25rem]"
        />
      </span>
      <span className="min-w-0 text-white">
        <strong className="heading block max-w-[210px] text-[17px] leading-none tracking-[.01em] [text-shadow:0_0_10px_rgba(255,255,255,.45)] sm:max-w-[310px] sm:text-2xl">
          {company.brandName}
        </strong>
        <span className="mt-1 block max-w-[220px] text-[9px] uppercase leading-tight tracking-[.16em] text-white/70 [text-shadow:0_0_8px_rgba(255,255,255,.38)] sm:max-w-[330px] sm:text-[11px]">
          {company.descriptor}
        </span>
      </span>
    </Link>
  );
}
