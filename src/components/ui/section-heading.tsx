export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 grid gap-5 border-t border-[var(--border)] pt-5 lg:grid-cols-[180px_1fr]">
      <div className="font-mono text-sm text-[var(--accent)]">{eyebrow ?? "РАЗДЕЛ"}</div>
      <div>
        <h2 className="heading max-w-4xl text-4xl sm:text-5xl lg:text-7xl">{title}</h2>
        {description && <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--foreground-muted)]">{description}</p>}
      </div>
    </div>
  );
}
