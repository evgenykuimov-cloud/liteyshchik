import { AlertTriangle, CheckCircle2, PackageOpen } from "lucide-react";

export function EmptyState({ message = "Данные пока не опубликованы" }: { message?: string }) {
  return <div className="industrial-border flex items-center gap-3 p-6 text-[var(--foreground-muted)]"><PackageOpen />{message}</div>;
}
export function ErrorState({ message = "Не удалось загрузить данные" }: { message?: string }) {
  return <div className="flex items-center gap-3 border border-[var(--error)] p-6 text-red-300"><AlertTriangle />{message}</div>;
}
export function SuccessMessage({ message }: { message: string }) {
  return <div className="flex items-center gap-3 border border-[var(--success)] p-6 text-green-300"><CheckCircle2 />{message}</div>;
}
