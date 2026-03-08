import NavContent from '../../components/translations/navigationContent'
import newsLang from '../../locales/pages/news.json'
import miscLang from '../../locales/misc.json'
import indexLang from '../../locales/pages/index.json'

export default function handler(req, res) {
    const locale =
        req.headers['accept-language']?.split(',')[0]?.split('-')[0] || 'en'

    const name = NavContent(miscLang, 'title', 'name', locale)
    const shortName = name.split(' ')[0]

    const manifest = {
        name: name,
        short_name: shortName,

        description: NavContent(indexLang, 'card', 'work', locale),

        start_url: '/',
        display: 'standalone',

        theme_color: '#000000',
        background_color: '#000000',
        display_override: ['window-controls-overlay'],

        screenshots: [
            {
                src: '/splashScreens/dark/iPhone_17_Pro_Max__iPhone_16_Pro_Max_portrait.png',
                sizes: '1320x2868',
                type: 'image/png',
                form_factor: 'narrow'
            },
            {
                src: '/splashScreens/dark/13__iPad_Pro_M4_landscape.png',
                sizes: '2752x2064',
                type: 'image/png',
                form_factor: 'wide'
            }
        ],

        icons: [
            {
                src: '/app-icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any maskable'
            },
            {
                src: '/app-icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
            },
            {
                src: '/app-icon.svg',
                sizes: 'any',
                type: 'image/svg',
                type: "image/svg+xml",
                purpose: 'any maskable'
            }
        ],

        shortcuts: [
            {
                name: NavContent(miscLang, 'category', 'about', locale),
                url: '/',
                icons: [
                    {
                        src: '/icons/about.png',
                        sizes: '96x96',
                        type: 'image/png'
                    }
                ]
            },
            {
                name: NavContent(miscLang, 'category', 'experience', locale),
                url: '/experience',
                icons: [
                    {
                        src: '/icons/experience.png',
                        sizes: '96x96',
                        type: 'image/png'
                    }
                ]
            },
            {
                name: NavContent(miscLang, 'category', 'others', locale),
                url: '/other',
                icons: [
                    {
                        src: '/icons/other.png',
                        sizes: '96x96',
                        type: 'image/png'
                    }
                ]
            },
            {
                name: NavContent(newsLang, 'news-ui', 'newsButton', locale),
                url: '/?entry=news',
                icons: [
                    {
                        src: '/icons/news.png',
                        sizes: '96x96',
                        type: 'image/png'
                    }
                ]
            },
            {
                name:
                    NavContent(miscLang, 'qrCodeBTN', 'content', locale) +
                    'yay',
                url: '/?entry=nfc',
                icons: [
                    {
                        src: '/icons/qrcode.png',
                        sizes: '96x96',
                        type: 'image/png'
                    }
                ]
            }
        ]
    }

    res.setHeader('Content-Type', 'application/manifest+json')
    res.status(200).json(manifest)
}
