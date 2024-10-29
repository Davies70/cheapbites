/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ss3.4sqi.net',
        port: '',
        pathname: '/img/categories_v2/**',
      },
      {
        protocol: 'https',
        hostname: 'fastly.4sqi.net',
        port: '',
        pathname: '/img/general/**',
      },
    ],
  },
};

export default nextConfig;
