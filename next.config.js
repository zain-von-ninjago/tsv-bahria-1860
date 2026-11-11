/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['motion', '@phosphor-icons/react', 'three'],
};

module.exports = nextConfig;