import { Container } from "@/components/ui/container";

export default function Loading() {
  return <Container className="section-shell"><div className="h-5 w-36 animate-pulse bg-[var(--surface-elevated)]" /><div className="mt-5 h-24 max-w-4xl animate-pulse bg-[var(--surface)]" /><div className="mt-12 grid gap-4 md:grid-cols-3">{[1,2,3].map((item) => <div key={item} className="h-64 animate-pulse bg-[var(--surface)]" />)}</div></Container>;
}
