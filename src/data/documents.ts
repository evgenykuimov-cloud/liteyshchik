import type { DocumentItem } from "@/types/catalog";

export const documents: DocumentItem[] = [
  { id: "requisites", title: "Реквизиты ООО «Камский Литейный Завод»", type: "Реквизиты", category: "Компания" },
  { id: "technical-descriptions", title: "PDF-технические описания изделий", type: "Техническое описание", category: "Продукция" },
  { id: "drawings", title: "Чертежи для проектировщиков", type: "Чертёж", category: "Проектирование" },
  { id: "cad", title: "STEP/DWG/DXF-файлы", type: "CAD", category: "Проектирование" },
  { id: "certificates", title: "Сертификаты и лицензии", type: "Сертификат", category: "Качество" },
  { id: "letters", title: "Благодарственные письма", type: "Письмо", category: "Качество" },
  { id: "survey", title: "Опросный лист на изготовление по чертежу", type: "Форма запроса", category: "Заказ" },
];
