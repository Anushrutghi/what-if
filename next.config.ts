import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve artwork images straight from Wikimedia Commons (Special:FilePath
    // already redirects to a correctly-sized file on their CDN). Routing them
    // through the Next.js optimizer caused bursts of requests from a single
    // server IP, which Wikimedia rate-limits (HTTP 429) and broke cards/heroes.
    unoptimized: true,
  },
};

export default nextConfig;
