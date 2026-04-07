/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'store.modalniy.ru' },
    ],
  },
};

module.exports = nextConfig;
