import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: 'https://5fc9346b2af77700165ae514.mockapi.io/products',
  },
  images: {
    domains: ['loremflickr.com'],
  },
  eslint: {
    dirs: ['src'],
  },
};

export default nextConfig;
