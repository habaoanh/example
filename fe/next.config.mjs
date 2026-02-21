      /** @type {import('next').NextConfig} */
      const nextConfig = {
        async rewrites() {
          return [
            {
              source: '/api/:path*',
              // The destination is the full URL of the backend API
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
