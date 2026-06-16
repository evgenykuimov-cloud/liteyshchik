import Image from "next/image";
import Link from "next/link";
import { company } from "@/config/company";

export function Logo() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={`${company.legalName}, главная`}>
      <Image
        src="/images/kamalit-logo.png"
        alt="Камский Литейный Завод"
        width={286}
        height={78}
        priority
        className="h-12 w-auto max-w-[230px] object-contain sm:h-14 sm:max-w-[286px]"
      />
    </Link>
  );
}
