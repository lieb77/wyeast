import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  reactCompiler: true,
  allowedDevOrigins: ['banjo.paullieberman.org', 'bsky.paullieberman.net'],
}

export default nextConfig;
