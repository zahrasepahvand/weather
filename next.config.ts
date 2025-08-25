import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true }, // Required if you're using <Image />
  basePath: isProd ? '/weather' : '',     // Replace with your repo name
  trailingSlash: true  
  /* config options here */
};

export default nextConfig;
