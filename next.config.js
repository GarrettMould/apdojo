/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // For Sanity images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apdojovideos.s3.ap-southeast-2.amazonaws.com',
        port: '', // Leave empty for default port (443 for https)
        pathname: '/**', // Allow any path within this hostname
      },
      {
        protocol: 'https',
        hostname: 'apdojowhiteboards.s3.ap-southeast-2.amazonaws.com',
        port: '', 
        pathname: '/**', 
      },
      // Add other domains here if needed
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
}

module.exports = nextConfig 