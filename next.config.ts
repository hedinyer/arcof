import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["three"],
  experimental: {
    // Avoids "Access is denied" on .next/dev/lock when something else holds the file (e.g. stale process).
    // Only one `next dev` should run at a time.
    lockDistDir: false,
  },
};

export default nextConfig;
