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
};

export default nextConfig;
