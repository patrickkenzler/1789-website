import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — required for GitHub Pages
  output: 'export',

  // GitHub Pages serves the site at /1789-website/ — basePath prefixes all
  // _next/ asset URLs (CSS, JS, fonts) so they load from the correct path.
  basePath: '/1789-website',

  // trailingSlash: true makes Next.js export pages as directory index files
  // (e.g. out/ansatz/index.html instead of out/ansatz.html).
  // GitHub Pages resolves /1789-website/ → index.html correctly with this set.
  trailingSlash: true,

  // Next.js image optimisation runs server-side and is incompatible with
  // static export. All images in this project use CSS background-image,
  // so this flag has no visual effect.
  images: { unoptimized: true },
};

export default nextConfig;
