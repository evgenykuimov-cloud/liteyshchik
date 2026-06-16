import { NextResponse } from "next/server";
import { leadSchema, allowedExtensions, allowedMimeTypes } from "@/lib/lead-schema";
import { checkRateLimit } from "@/lib/rate-limit";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const seen = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
    if (!checkRateLimit(ip)) return NextResponse.json({ ok: false, message: "Слишком много запросов. Повторите позже." }, { status: 429 });

    const formData = await request.formData();
    const raw = Object.fromEntries([...formData.entries()].filter(([key]) => key !== "files").map(([key, value]) => [key, String(value)]));
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Проверьте обязательные поля.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const files = formData.getAll("files").filter((item): item is File => item instanceof File && item.size > 0);
    for (const file of files) {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (file.size > MAX_FILE_SIZE || !allowedExtensions.includes(extension) || (file.type && !allowedMimeTypes.includes(file.type))) {
        return NextResponse.json({ ok: false, message: `Файл «${file.name}» не прошёл проверку.` }, { status: 400 });
      }
    }

    const fingerprint = `${ip}:${parsed.data.phone}:${parsed.data.email}:${parsed.data.company}`;
    const last = seen.get(fingerprint) ?? 0;
    if (Date.now() - last < 30_000) return NextResponse.json({ ok: false, message: "Повторная отправка заблокирована. Подождите 30 секунд." }, { status: 409 });
    seen.set(fingerprint, Date.now());

    if (process.env.LEAD_DELIVERY_MODE !== "configured") {
      return NextResponse.json({
        ok: false,
        configured: false,
        message: "TODO: подключить отправку заявки в CRM или на email. Данные проверены, но заявка пока не отправлена.",
      }, { status: 503 });
    }

    return NextResponse.json({ ok: true, message: "Запрос принят и передан ответственному специалисту." });
  } catch {
    return NextResponse.json({ ok: false, message: "Не удалось обработать запрос. Повторите позже." }, { status: 500 });
  }
}
