import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudinaryLoader.ts',
  },
  async redirects() {
    return [
      {
        source: '/cheat-sheets/macro/AP_Dojo_Macro_U1.pdf',
        destination: '/cheat-sheets',
        permanent: true,
      },
      {
        source: '/preview/macro-exams/mcq/1',
        destination: '/unitMCQPracticePage?subject=macro',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
