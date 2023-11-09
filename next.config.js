/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  images: {
    domains: [
      'twopaws.io',
      'twopaws.app',
      'arbiscan.io',
      's2.coinmarketcap.com',
    ],
  },
}

module.exports = nextConfig
