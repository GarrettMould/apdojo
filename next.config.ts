import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudinaryLoader.ts',
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
};

export default nextConfig;
