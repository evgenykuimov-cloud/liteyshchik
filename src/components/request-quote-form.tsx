"use client";

import { useState } from "react";
import Link from "next/link";
import { FileUploader } from "@/components/file-uploader";
import { ErrorState, SuccessMessage } from "@/components/ui/states";

type State = { type: "idle" | "loading" | "success" | "error"; message?: string };

export function RequestQuoteForm({ compact = false, productName }: { compact?: boolean; productName?: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<State>({ type: "idle" });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ type: "loading" });
    const data = new FormData(event.currentTarget);
    files.forEach((file) => data.append("files", file));
    try {
      const response = await fetch("/api/leads", { method: "POST", body: data });
      const result = (await response.json()) as { ok: boolean; message: string };
      setState({ type: result.ok ? "success" : "error", message: result.message });
      if (result.ok) event.currentTarget.reset();
    } catch {
      setState({ type: "error", message: "Сервис временно недоступен. Данные не были отправлены." });
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4" noValidate>
      {state.type === "success" && <SuccessMessage message={state.message ?? "Запрос отправлен"} />}
      {state.type === "error" && <ErrorState message={state.message} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Имя" required />
        <Field name="company" label="Компания" required />
        <Field name="contact" label="Телефон или email" required />
        <label className="grid gap-2 text-sm">Тип продукции<select name="productType" required className="field" defaultValue={productName ?? ""}><option value="" disabled>Выберите</option><option>Чугунный люк</option><option>Дождеприёмник</option><option>Обойма</option><option>Крышка</option><option>Решётка</option><option>Комплект</option><option>Изделие по чертежу</option></select></label>
        <Field name="quantity" label="Количество" required />
        <label className="grid gap-2 text-sm">Комплектность<select name="completeness" required className="field" defaultValue=""><option value="" disabled>Выберите</option><option>Крышка или решётка + обойма</option><option>Крышка или решётка отдельно</option><option>Обойма отдельно</option></select></label>
        <Field name="delivery" label="Регион или адрес доставки" required />
        <Field name="inn" label="ИНН" />
      </div>
      {!compact && <div className="grid gap-4 sm:grid-cols-2"><Field name="requiredDate" label="Требуемая дата поставки" /><Field name="project" label="Проект" /><Field name="loadClass" label="Класс нагрузки" /><Field name="dimensions" label="Размеры" /><Field name="productName" label="Изделие" defaultValue={productName} /></div>}
      <label className="grid gap-2 text-sm">Комментарий<textarea name="comment" required rows={4} className="field" placeholder="Опишите задачу и технические требования" /></label>
      {!compact && <FileUploader onChange={setFiles} />}
      <label className="hidden">Веб-сайт<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="flex items-start gap-3 text-xs leading-5 text-[var(--foreground-muted)]"><input type="checkbox" name="consent" value="true" required className="mt-1 size-4 accent-[var(--accent)]" /><span>Согласен на обработку персональных данных в соответствии с <Link href="/privacy" className="underline">политикой конфиденциальности</Link>.</span></label>
      <button disabled={state.type === "loading"} className="btn-primary w-full disabled:opacity-60">{state.type === "loading" ? "Проверка данных…" : "Отправить запрос"}</button>
    </form>
  );
}

function Field({ name, label, required = false, defaultValue }: { name: string; label: string; required?: boolean; defaultValue?: string }) {
  return <label className="grid gap-2 text-sm">{label}<input name={name} required={required} defaultValue={defaultValue} className="field" /></label>;
}
