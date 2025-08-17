/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost']
  },
  experimental: {
    reactCompiler: false,
  },
}

export default nextConfig 
