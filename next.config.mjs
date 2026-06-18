/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ['images.pexels.com', 'images.unsplash.com', 'source.unsplash.com', 'goglanco-admin.test', 'admin.goglanco.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default config;
