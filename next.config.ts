import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://ferf1mheo22r9ira.public.blob.vercel-storage.com/**"),
      new URL("https://img.clerk.com/**"),
    ],
  },
};

export default nextConfig;
