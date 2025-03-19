import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: 'https://5fc9346b2af77700165ae514.mockapi.io/products',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  eslint: {
    dirs: ['src'],
  },
};

export default nextConfig;
