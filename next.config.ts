import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudinaryLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'apdojowhiteboards.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'apdojovideos.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'apdojowhiteboards.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'apdojowhiteboards.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thumbnailslarge.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
  async redirects() {
    const redirects = [
      {
        source: '/cheat-sheets/macro/AP_Dojo_Macro_U1.pdf',
        destination: '/ap-macro-unit-1-cheat-sheet',
        permanent: true,
      },
      {
        source: '/preview/macro-exams/mcq/1',
        destination: '/unitMCQPracticePage?subject=macro',
        permanent: true,
      },
    ];

    // Redirect old /unit/{number} URLs to new cheat sheet pages
    // Default to macro units (since old /unit/{number} typically defaulted to macro)
    const macroUnitSlugs: Record<number, string> = {
      1: '/ap-macro-unit-1-cheat-sheet',
      2: '/ap-macro-unit-2-cheat-sheet',
      3: '/ap-macro-unit-3-cheat-sheet',
      4: '/ap-macro-unit-4-cheat-sheet',
      5: '/ap-macro-unit-5-cheat-sheet',
      6: '/ap-macro-unit-6-cheat-sheet',
    };

    for (let unit = 1; unit <= 6; unit++) {
      redirects.push({
        source: `/unit/${unit}`,
        destination: macroUnitSlugs[unit],
        permanent: true, // 301 Redirect - Critical for SEO
      });
    }

    // Redirect old cheat sheet URLs to new format
    // Old format: /cheat-sheets/macro/unit-1, /cheat-sheets/micro/unit-1, etc.
    for (let unit = 1; unit <= 6; unit++) {
      // Macro unit redirects
      redirects.push({
        source: `/cheat-sheets/macro/unit-${unit}`,
        destination: `/ap-macro-unit-${unit}-cheat-sheet`,
        permanent: true,
      });
      redirects.push({
        source: `/cheat-sheets/macro/AP_Dojo_Macro_U${unit}.pdf`,
        destination: `/ap-macro-unit-${unit}-cheat-sheet`,
        permanent: true,
      });
      
      // Micro unit redirects
      redirects.push({
        source: `/cheat-sheets/micro/unit-${unit}`,
        destination: `/ap-micro-unit-${unit}-cheat-sheet`,
        permanent: true,
      });
      redirects.push({
        source: `/cheat-sheets/micro/AP_Dojo_Micro_U${unit}.pdf`,
        destination: `/ap-micro-unit-${unit}-cheat-sheet`,
        permanent: true,
      });
    }

    // Redirect old study-guides URLs to cheat sheet pages
    for (let unit = 1; unit <= 6; unit++) {
      redirects.push({
        source: `/study-guides/AP-macroeconomics-unit-${unit}`,
        destination: `/ap-macro-unit-${unit}-cheat-sheet`,
        permanent: true,
      });
      redirects.push({
        source: `/study-guides/AP-microeconomics-unit-${unit}`,
        destination: `/ap-micro-unit-${unit}-cheat-sheet`,
        permanent: true,
      });
    }

    return redirects;
  },
} as NextConfig;

export default nextConfig;
