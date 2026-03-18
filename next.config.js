const defaultCaching = require('next-pwa/cache')

const runtimeCaching = [
    {
        urlPattern: ({ request }) => request.mode === 'navigate',
        handler: 'NetworkFirst',
        options: {
            cacheName: 'pages',
            networkTimeoutSeconds: 3
        }
    },
    {
        urlPattern: ({ request }) => request.destination === 'image',
        handler: 'StaleWhileRevalidate',
        options: {
            cacheName: 'images'
        }
    },
    ...defaultCaching
]

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',

    runtimeCaching,
    cacheOnFrontEndNav: true,

    cacheStartUrl: true,
    reloadOnOnline: true,
    dynamicStartUrl: false,

    customWorkerDir: 'worker',

    fallbacks: {
        document: '/_offline',
        image: '/images/Error.png'
    },

    buildExcludes: [/middleware-manifest\.json$/, /app-build-manifest\.json$/]
})

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        optimizePackageImports: ['@chakra-ui/react']
    },
    i18n: {
        locales: ['en', 'es', 'ja'],
        defaultLocale: 'en'
    }
}

module.exports = withPWA(nextConfig)
