import type { DocumentItem } from "@/types/catalog";

export const documents: DocumentItem[] = [
  { id: "technical", title: "Технические листы", type: "Технический лист", category: "Продукция" },
  { id: "drawings", title: "Габаритные чертежи", type: "Чертёж", category: "Проектирование" },
  { id: "passports", title: "Паспорта продукции", type: "Паспорт", category: "Продукция" },
  { id: "certificates", title: "Сертификаты и декларации", type: "Сертификат", category: "Качество" },
  { id: "tests", title: "Протоколы испытаний", type: "Протокол", category: "Качество" },
  { id: "details", title: "Реквизиты компании", type: "Реквизиты", category: "Компания" },
];
