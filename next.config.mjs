/** @type {import('next').NextConfig} */
const nextConfig = {
    api: {
        bodyParser: false,
        externalResolver: true,
      },
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        return config;
      },
    transpilePackages: ['three'],

    async headers() {
    return [
        {
        source: '/(.*)',
        headers: [
            {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
            },
            {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
            },
            {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
            },
            {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
            },
        ]
        }
    ]
    }

};

export default nextConfig;
