import { z } from "zod";

export const allowedExtensions = ["pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png", "zip", "dwg", "dxf"];
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
  "application/octet-stream",
];

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(100),
  company: z.string().trim().min(2, "Укажите компанию").max(200),
  contact: z.string().trim().min(5, "Укажите телефон или email").max(150),
  productType: z.string().trim().min(2, "Выберите тип продукции").max(100),
  quantity: z.string().trim().min(1, "Укажите количество").max(100),
  completeness: z.string().trim().min(2, "Выберите комплектность").max(100),
  delivery: z.string().trim().min(2, "Укажите регион или адрес доставки").max(300),
  comment: z.string().trim().min(5, "Добавьте комментарий").max(3000),
  inn: z.string().trim().max(20).optional(),
  requiredDate: z.string().trim().max(50).optional(),
  project: z.string().trim().max(200).optional(),
  loadClass: z.string().trim().max(20).optional(),
  dimensions: z.string().trim().max(200).optional(),
  productName: z.string().trim().max(200).optional(),
  consent: z.literal("true", { errorMap: () => ({ message: "Необходимо согласие с политикой" }) }),
  website: z.string().max(0, "Запрос отклонён"),
});

export type LeadInput = z.infer<typeof leadSchema>;
