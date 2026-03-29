import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run", // ✅ FIX ADDED
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com", // ✅ RECOMMENDED
      },
    ],
    unoptimized:true,
  },
};

export default nextConfig;