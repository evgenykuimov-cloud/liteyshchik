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
      {
        source: "/catalog/valki-i-roliki/valki-i-roliki",
        destination: "/catalog/valki-i-roliki/valki-po-chertezham",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
