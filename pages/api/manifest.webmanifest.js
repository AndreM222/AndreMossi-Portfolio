import NavContent from '../../components/translations/navigationContent'
import newsLang from '../../locales/pages/news.json'
import miscLang from '../../locales/misc.json'
import indexLang from '../../locales/pages/index.json'

function manifest() {
    const name = NavContent(miscLang, 'title', 'name')
    const shortName = name.split(' ')[0]

    return {
        name: name,
        short_name: shortName,

        description: NavContent(indexLang, 'card', 'work'),

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
                name: NavContent(miscLang, 'category', 'about'),
                url: '/about',
                icons: [{ src: '/icons/about.png', sizes: '192x192' }]
            },
            {
                name: NavContent(miscLang, 'category', 'experience'),
                url: '/experience',
                icons: [{ src: '/icons/experience.png', sizes: '192x192' }]
            },
            {
                name: NavContent(miscLang, 'category', 'others'),
                url: '/others',
                icons: [{ src: '/icons/other.png', sizes: '192x192' }]
            },
            {
                name: NavContent(newsLang, 'news-ui', 'news'),
                url: '/news',
                icons: [{ src: '/icons/news.png', sizes: '192x192' }]
            }
        ]
    }
}

export default function handler(req, res) {
    res.setHeader('Content-Type', 'application/manifest+json')
    res.status(200).json(manifest())
}
