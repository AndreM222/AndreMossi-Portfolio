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

        icons: [
            {
                src: '/apple-touch-icon.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: '/apple-touch-icon.png',
                sizes: '512x512',
                type: 'image/png'
            },
            {
                src: '/apple-touch-icon.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],

        shortcuts: [
            {
                name: NavContent(miscLang, 'category', 'about', locale),
                url: '/',
                icons: [{ src: '/icons/about.svg', sizes: '192x192' }]
            },
            {
                name: NavContent(miscLang, 'category', 'experience', locale),
                url: '/experience',
                icons: [{ src: '/icons/experience.svg', sizes: '192x192' }]
            },
            {
                name: NavContent(miscLang, 'category', 'others', locale),
                url: '/other',
                icons: [{ src: '/icons/other.svg', sizes: '192x192' }]
            },
            {
                name: NavContent(newsLang, 'news-ui', 'newsButton', locale),
                url: '/?entry=news',
                icons: [{ src: '/icons/news.svg', sizes: '192x192' }]
            },
            {
                name: NavContent(miscLang, 'qrCodeBTN', 'content', locale),
                url: '/?entry=nfc',
                icons: [{ src: '/icons/qrcode.svg', sizes: '192x192' }]
            }
        ]
    }

    res.setHeader('Content-Type', 'application/manifest+json')
    res.status(200).json(manifest)
}
