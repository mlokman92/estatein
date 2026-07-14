import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. The parent (home) directory also
  // contains a package-lock.json, which otherwise makes Next infer the wrong root.
  turbopack: {
    root: projectRoot,
  },
  images: {
    // Allow images uploaded through the CMS (Supabase Storage public bucket).
    // Seed rows still use local /images/... paths, which need no config.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bogapwrqbgtqahegrwxy.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
