import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/catalog/mufeli-pechey",
        destination: "/catalog/retorty",
        permanent: true,
      },
      {
        source: "/catalog/mufeli-pechey/mufeli-pechey-po-chertezham",
        destination: "/catalog/retorty/retorty-dlya-promyshlennyh-pechey",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
