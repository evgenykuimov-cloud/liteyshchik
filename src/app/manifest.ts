import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "ООО «Литейщик»", short_name: "Литейщик", description: "Промышленное чугунное литьё", start_url: "/", display: "standalone", background_color: "#101315", theme_color: "#101315", lang: "ru" };
}
