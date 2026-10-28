import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [{ source: "/demo/okul", destination: "/demo/okul/index.html" }];
  },
  // Exact paths only: /denizli-e-ticaret/* still serves files from /public.
  async redirects() {
    return [
      { source: "/denizli-web-sitesi", destination: "/web-sitesi", permanent: true },
      { source: "/denizli-e-ticaret", destination: "/e-ticaret", permanent: true },
    ];
  },
};

export default nextConfig;
