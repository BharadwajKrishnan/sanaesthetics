import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  // Several pictures carry text (posters, diagrams), so every image is served at quality 90
  // rather than the default 75, which blurs lettering. Each <Image> passes quality={90}.
  images: { qualities: [90] },
  // Sent with every response. HSTS is added by Vercel itself.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  // The newsletter section was briefly published as /blog.
  async redirects() {
    return [
      { source: "/blog", destination: "/newsletter", permanent: true },
      { source: "/blog/:slug", destination: "/newsletter/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
