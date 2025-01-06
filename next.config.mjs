/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "arreglofloral.mx",
      "bloomshy.s3.amazonaws.com",
      "cdn03.lolaflora.com",
    ],
  },
};

export default nextConfig;
