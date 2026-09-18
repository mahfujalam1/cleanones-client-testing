import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

const backendUrl = (process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
const targetUrl = (() => {
  try {
    return backendUrl ? new URL(backendUrl) : null;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  turbopack: {},
  skipTrailingSlashRedirect: true,
  
  
  allowedDevOrigins: ["10.10.28.194", "10.10.28.195", "cleanones-client-portal.vercel.app"],
  images: {
    remotePatterns: [
      ...(targetUrl
        ? [
          {
            protocol: (targetUrl.protocol.replace(":", "") || "http") as "http" | "https",
            hostname: targetUrl.hostname,
            port: targetUrl.port || undefined,
            pathname: "/**",
          },
        ]
        : []),
      
      { protocol: "https", hostname: "cleanones-bucket.s3.eu-central-1.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "*.s3.eu-central-1.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "*.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "*.cloudfront.net", pathname: "/**" },
    ],
  },
  async rewrites() {
    if (!backendUrl) return [];
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default withPWA(nextConfig);
