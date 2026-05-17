import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: path.resolve()
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "three"]
  }
};

export default nextConfig;
