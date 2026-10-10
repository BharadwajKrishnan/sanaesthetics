import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  // The newsletter section was briefly published as /blog.
  async redirects() {
    return [
      { source: "/blog", destination: "/newsletter", permanent: true },
      { source: "/blog/:slug", destination: "/newsletter/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
