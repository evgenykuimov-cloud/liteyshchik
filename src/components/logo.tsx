import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="ООО Литейщик, главная">
      <svg width="34" height="42" viewBox="0 0 34 42" aria-hidden="true" className="shrink-0">
        <path d="M2 2h30v38H2z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M9 9h16v5h-5v19h-6V14H9z" fill="var(--accent)" />
      </svg>
      <span>
        <strong className="heading block text-xl leading-none">Литейщик</strong>
        <span className="mt-1 block text-[9px] uppercase tracking-[.13em] text-[var(--foreground-muted)]">Промышленное чугунное литьё</span>
      </span>
    </Link>
  );
}
