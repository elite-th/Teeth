import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-5038c391-1147-4096-aaf2-99a7f80e2f1b.space.z.ai",
  ],
};

export default nextConfig;
