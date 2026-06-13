export const company = {
  legalName: "ООО «Литейщик»",
  fullLegalName: "Общество с ограниченной ответственностью «Литейщик»",
  brandName: "ЛИТЕЙЩИК",
  descriptor: "Промышленное чугунное литьё",
  phone: {
    display: "+7 (918) 456-59-94",
    href: "tel:+79184565994",
    label: "Директор",
  },
  officePhone: {
    display: "+7 (86169) 7-36-65",
    href: "tel:+78616973665",
    label: "Телефон/факс",
  },
  email: {
    display: "gimatdinowa.olga@yandex.ru",
    href: "mailto:gimatdinowa.olga@yandex.ru",
  },
  address: "352500, Краснодарский край, г. Лабинск, ул. Делегатская, 40/2",
  requisites: {
    inn: "2314013269",
    kpp: "231401001",
    ogrn: "1022302349190",
    okpo: "48436221",
    okonh: "12180",
    okved: "37.10.1, 51.70",
    settlementAccount: "40702810430290100665",
    correspondentAccount: "30101810100000000602",
    bik: "040349602",
    bank: "Сбербанк России, Краснодарское отделение 8619, г. Краснодар",
    bankBranch: "Лабинское отделение (на правах отдела), г. Лабинск",
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://manhole-ruddy.vercel.app",
} as const;

export const quoteEmailHref = `mailto:${company.email.display}?subject=${encodeURIComponent("Запрос цены / коммерческого предложения")}`;
const mapCoordinates = "40.720246,44.647470";
export const yandexMapHref = `https://yandex.ru/maps/?ll=${mapCoordinates}&mode=whatshere&whatshere[point]=${mapCoordinates}&whatshere[zoom]=17&z=17`;
export const yandexMapEmbedHref = `https://yandex.ru/map-widget/v1/?ll=${mapCoordinates}&mode=whatshere&whatshere[point]=${mapCoordinates}&whatshere[zoom]=17&z=17`;
