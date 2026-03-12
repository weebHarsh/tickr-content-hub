/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile recharts for proper SSR compatibility
  transpilePackages: ["recharts", "react-smooth"],
}

module.exports = nextConfig
