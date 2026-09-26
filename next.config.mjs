/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/capabilities",
        permanent: true,
      },
      {
        source: "/services/:slug*",
        destination: "/capabilities/:slug*",
        permanent: true,
      },
      {
        source: "/products/off-highway-rigid-truck-777",
        destination: "/products/fiza-rt100-haul-truck",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
