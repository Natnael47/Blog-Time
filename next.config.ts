import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "encrypted-tbn0.gstatic.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "static1.howtogeekimages.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "www.logogenie.com",
        protocol: "https",
        port: "",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com", // ✅ added correctly
      },
    ],
  },
};

export default nextConfig;
