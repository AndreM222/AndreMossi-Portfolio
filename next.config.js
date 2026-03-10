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

module.exports = nextConfig
