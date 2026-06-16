import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "ООО «Камский Литейный Завод»", short_name: "Камалит", description: "Жаропрочное литьё и механическая обработка металла", start_url: "/", display: "standalone", background_color: "#101315", theme_color: "#101315", lang: "ru" };
}
