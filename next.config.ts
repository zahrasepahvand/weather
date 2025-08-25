import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true }, // Required if you're using <Image />
  basePath: '/weather',        // Replace with your repo name
  trailingSlash: true  
  /* config options here */
};

export default nextConfig;
