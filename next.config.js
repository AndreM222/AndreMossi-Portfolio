const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [/app-build-manifest\.json$/]
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
