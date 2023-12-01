/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    // config.resolve.alias.canvas = false;
    return config
  },
  images: {
    domains: []
  },
  reactStrictMode: false
}

module.exports = nextConfig
