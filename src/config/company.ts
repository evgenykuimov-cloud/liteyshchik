export const company = {
  legalName: "ООО «Камский Литейный Завод»",
  fullLegalName: "Общество с ограниченной ответственностью «Камский Литейный Завод»",
  brandName: "Камский Литейный Завод",
  descriptor: "литьё и механическая обработка металла",
  slogan: "Жаропрочное литьё и механическая обработка металла по чертежам заказчика",
  phone: {
    display: "+7 (8552) 200-164",
    href: "tel:+78552200164",
    label: "Отдел продаж",
  },
  additionalPhones: [
    { display: "+7 (937) 591-14-55", href: "tel:+79375911455" },
    { display: "+7 (927) 470-02-81", href: "tel:+79274700281" },
    { display: "+7 (937) 281-80-85", href: "tel:+79372818085" },
    { display: "+7 (927) 490-68-34", href: "tel:+79274906834" },
  ],
  fax: "+7 (8552) 200-164",
  email: {
    display: "info@kamalit.ru",
    href: "mailto:info@kamalit.ru",
  },
  legalAddress: "423832, РФ, Республика Татарстан, г. Набережные Челны, пр. Раиса Беляева, 90, оф. 99",
  productionAddress: "423832, РФ, Республика Татарстан, г. Набережные Челны, Ремонтный проезд, 7",
  workingHours: "TODO: проверить режим работы",
  requisites: {
    inn: "1650294663",
    kpp: "165001001",
    ogrn: "1141650018542",
    okpo: "70894631",
    okato: "92430000000",
    okved: "27.21; 27.51; 37.10; 28.52",
    settlementAccount: "40702810929140000780",
    correspondentAccount: "30101810200000000824",
    bik: "042202824",
    bank: "АО «АЛЬФА-БАНК» г. Нижний Новгород",
    bankBranch: "Филиал «Нижегородский» АО «АЛЬФА-БАНК» г. Нижний Новгород",
    taxOffice: "ИФНС по г. Набережные Челны Республики Татарстан",
    registrationDate: "10.10.2014",
    director: "Поляков Роман Владимирович",
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kamalit.ru",
} as const;

export const quoteEmailHref = `mailto:${company.email.display}?subject=${encodeURIComponent("Запрос расчёта изделия по чертежу")}`;
export const yandexMapHref = `https://yandex.ru/maps/?text=${encodeURIComponent(company.productionAddress)}`;
export const yandexMapEmbedHref = `https://yandex.ru/map-widget/v1/?mode=search&text=${encodeURIComponent(company.productionAddress)}&z=16`;
