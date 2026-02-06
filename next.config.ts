import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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

    // Redirect old practice tests URL to new subject-specific URLs
    // Default to macro for backward compatibility
    redirects.push({
      source: '/unit-final-practice-tests',
      destination: '/ap-macro-practice-tests',
      permanent: true,
    });

    // Redirect old /graph-gym to first scenario with new URL format
    // First scenario is ID 1: "Long Run Equilibrium in a Pure Monopoly" (micro)
    redirects.push({
      source: '/graph-gym',
      destination: '/graph-gym/ap-micro-monopoly-graphing-practice', // First scenario in new format
      permanent: true, // 301 redirect for SEO
    });

    // Redirect old unit-1 deep dive pages to new dynamic URLs (when you enable deep dives)
    redirects.push({
      source: '/unit-1/ppc-deep-dive',
      destination: '/ap-macro/unit-1/production-possibilities-curve',
      permanent: true,
    });
    redirects.push({
      source: '/unit-1/comparative-advantage-deep-dive',
      destination: '/ap-macro/unit-1/comparative-advantage',
      permanent: true,
    });

    // Redirect old graph gym URLs (monopoly-graphing-practice) to new format
    // This is handled dynamically in the [slug]/page.tsx for better flexibility

    // Redirect old unitMCQPracticePage URLs to new practice route structure
    // Note: Next.js redirects don't support query parameters directly, so redirects
    // for URLs with query params (like ?subject=macro&mode=singleUnit&unit=1) are handled
    // client-side in the unitMCQPracticePage component itself.
    // The component will automatically redirect single-unit mode to the new route structure.

    return redirects;
  },
  async rewrites() {
    const rewrites = [];

    // Rewrite descriptive URLs for unit MCQ tests to internal route structure
    // Macro unit MCQ tests: /ap-macro-unit-{1-6}-mcq-test → /unit-mcq-test/{1-6}?subject=macro
    for (let unit = 1; unit <= 6; unit++) {
      rewrites.push({
        source: `/ap-macro-unit-${unit}-mcq-test`,
        destination: `/unit-mcq-test/${unit}?subject=macro`,
      });
    }

    // Micro unit MCQ tests: /ap-micro-unit-{1-6}-mcq-test → /unit-mcq-test/{1-6}?subject=micro
    for (let unit = 1; unit <= 6; unit++) {
      rewrites.push({
        source: `/ap-micro-unit-${unit}-mcq-test`,
        destination: `/unit-mcq-test/${unit}?subject=micro`,
      });
    }

    // Full MCQ practice tests
    // Macro: /ap-macro-mcq-practice-test-1 → /preview/macro/mcq/1
    rewrites.push({
      source: '/ap-macro-mcq-practice-test-1',
      destination: '/preview/macro/mcq/1',
    });

    // Micro: /ap-micro-mcq-practice-test-1 → /preview/micro/mcq/1
    rewrites.push({
      source: '/ap-micro-mcq-practice-test-1',
      destination: '/preview/micro/mcq/1',
    });

    // Full FRQ practice tests
    // Macro: /ap-macro-frq-practice-test-1 → /preview/macro/frq/1
    rewrites.push({
      source: '/ap-macro-frq-practice-test-1',
      destination: '/preview/macro/frq/1',
    });

    // Micro: /ap-micro-frq-practice-test-2 → /preview/micro/frq/1 (mapping test-2 URL to test-1 page)
    rewrites.push({
      source: '/ap-micro-frq-practice-test-2',
      destination: '/preview/micro/frq/1',
    });

    // Also support test-1 for micro FRQ if needed
    rewrites.push({
      source: '/ap-micro-frq-practice-test-1',
      destination: '/preview/micro/frq/1',
    });

    // Practice tests page rewrites
    rewrites.push({
      source: '/ap-macro-practice-tests',
      destination: '/unit-final-practice-tests?subject=macro',
    });
    rewrites.push({
      source: '/ap-micro-practice-tests',
      destination: '/unit-final-practice-tests?subject=micro',
    });

    return rewrites;
  },
} as NextConfig;

export default nextConfig;
