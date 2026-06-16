import { z } from "zod";

export const allowedExtensions = ["pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png", "zip", "dwg", "dxf", "step", "stp"];
export const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "application/zip",
  "application/x-zip-compressed",
  "application/acad",
  "application/dxf",
  "model/step",
  "application/step",
  "application/step+xml",
  "application/octet-stream",
];

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(100),
  company: z.string().trim().min(2, "Укажите компанию").max(200),
  phone: z.string().trim().min(5, "Укажите телефон").max(80),
  email: z.string().trim().email("Укажите корректный email").max(150),
  productType: z.string().trim().min(2, "Укажите тип изделия").max(100),
  quantity: z.string().trim().min(1, "Укажите количество").max(100),
  material: z.string().trim().max(150).optional(),
  comment: z.string().trim().min(5, "Добавьте комментарий").max(3000),
  inn: z.string().trim().max(20).optional(),
  temperature: z.string().trim().max(120).optional(),
  environment: z.string().trim().max(200).optional(),
  machining: z.string().trim().max(200).optional(),
  quality: z.string().trim().max(200).optional(),
  deadline: z.string().trim().max(80).optional(),
  dimensions: z.string().trim().max(200).optional(),
  productName: z.string().trim().max(200).optional(),
  consent: z.literal("true", { errorMap: () => ({ message: "Необходимо согласие с политикой" }) }),
  website: z.string().max(0, "Запрос отклонён"),
});

export type LeadInput = z.infer<typeof leadSchema>;
