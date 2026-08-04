import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cloudflare / ngrok tunnels so the app can hydrate over the public URL
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "*.cfargotunnel.com",
    "*.ngrok-free.app",
    "*.ngrok.app",
    "*.ngrok.io",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
