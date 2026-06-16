"use client";

import { useState } from "react";
import Link from "next/link";
import { FileUploader } from "@/components/file-uploader";
import { ErrorState, SuccessMessage } from "@/components/ui/states";
import { company, quoteEmailHref } from "@/config/company";

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
      setState({ type: "error", message: "TODO: подключить API/CRM/email. Сейчас заявку можно отправить напрямую на info@kamalit.ru." });
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4" noValidate>
      {state.type === "success" && <SuccessMessage message={state.message ?? "Заявка отправлена. Специалист свяжется с вами для уточнения параметров изделия."} />}
      {state.type === "error" && <ErrorState message={state.message} />}
      <div>
        <h2 className="heading text-4xl">{compact ? "Отправьте чертёж на расчёт" : "Отправьте чертёж на расчёт"}</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
          Инженер изучит задачу, уточнит технические параметры и подготовит предложение по изготовлению.
          Прямой канал: <a href={quoteEmailHref} className="ml-1 text-[var(--accent)] underline underline-offset-4">{company.email.display}</a>
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Имя" required />
        <Field name="company" label="Компания" required />
        <Field name="phone" label="Телефон" required />
        <Field name="email" label="Email" required type="email" />
        <Field name="productType" label="Тип изделия" required defaultValue={productName} />
        <Field name="quantity" label="Количество" required />
        <Field name="material" label="Марка стали / материал" />
        <Field name="dimensions" label="Размеры" />
      </div>
      {!compact && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="temperature" label="Температурный режим" />
          <Field name="environment" label="Среда эксплуатации" />
          <Field name="machining" label="Требования к мехобработке" />
          <Field name="quality" label="Требования к контролю качества" />
          <Field name="deadline" label="Желаемый срок поставки" />
          <Field name="inn" label="ИНН компании" />
        </div>
      )}
      <label className="grid gap-2 text-sm">Комментарий<textarea name="comment" required rows={4} className="field" placeholder="Опишите изделие, условия работы, материал, количество и требования к партии" /></label>
      <FileUploader onChange={setFiles} />
      <label className="hidden">Веб-сайт<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="flex items-start gap-3 text-xs leading-5 text-[var(--foreground-muted)]"><input type="checkbox" name="consent" value="true" required className="mt-1 size-4 accent-[var(--accent)]" /><span>Согласен на обработку персональных данных в соответствии с <Link href="/privacy" className="underline">политикой конфиденциальности</Link>.</span></label>
      <button disabled={state.type === "loading"} className="btn-primary w-full disabled:opacity-60">{state.type === "loading" ? "Проверка данных…" : "Отправить заявку"}</button>
    </form>
  );
}

function Field({ name, label, required = false, defaultValue, type = "text" }: { name: string; label: string; required?: boolean; defaultValue?: string; type?: string }) {
  return <label className="grid gap-2 text-sm">{label}<input name={name} type={type} required={required} defaultValue={defaultValue} className="field" /></label>;
}
