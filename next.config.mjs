import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'richardwhite.allwestern.com',
        port: '',
        pathname: '/files/**',
      },
    ],
    domains: ['localhost']
  },
  experimental: {
    reactCompiler: false,
  },
}

// Make sure you wrap your `nextConfig` with the `withPayload` plugin
export default withPayload(nextConfig) 
