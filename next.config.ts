import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — required for GitHub Pages
  output: 'export',

  // Next.js image optimisation runs server-side and is incompatible with
  // static export. All images in this project use CSS background-image,
  // so this flag has no visual effect.
  images: { unoptimized: true },
};

export default nextConfig;
