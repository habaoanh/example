/** @type {import('next').NextConfig} */
const nextConfig = {
  proxyTimeout: 300000, // Set timeout to 5 minutes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Using 127.0.0.1 instead of localhost to avoid potential resolution issues in some environments.
        destination: 'http://127.0.0.1:5001/api/v1/:path*', 
      },
    ];
  },
  devIndicators: {
    allowedDevOrigins: [
      "https://3000-firebase-toanpro-1771050935589.cluster-ikxjzjhlifcwuroomfkjrx437g.cloudworkstations.dev"
    ],
  }
};

export default nextConfig;
