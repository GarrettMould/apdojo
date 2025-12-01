import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
