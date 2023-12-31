/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  images: {
    domains: ['cdn.dribbble.com' ,'github.com', 'cryptologos.cc'], // Add your domain here
  },
};

module.exports = nextConfig;
