import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Container } from '@chakra-ui/react'
import Navbar from '../navbar'
const CharModel = dynamic(() => import('../character'), {
    ssr: false
})
import Footer from '../footer'
import Content from '../content'
import miscLang from '../../locales/misc.json'
import { useRouter } from 'next/router'
import AlertNotification from '../alert'
import { Analytics } from '@vercel/analytics/react'

const Main = ({ children, router }) => {
    const { locale } = useRouter()

    function getTotalMonths(startDate, endDate) {
        return (
            (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                (endDate.getMonth() - startDate.getMonth())
        )
    }

    const today = new Date()
    const firstDay = new Date(2024, 5, 17)

    return (
        <Box as="main" display="flex" minH="100vh" flexDir="column">
            <Head>
                <meta name="author" content="André Mossi" />
                <meta property="og:title" content="André Mossi" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content="https://andremossi.vercel.app/Banner.png"
                />
                <meta
                    property="og:description"
                    content="Full-Stack developer, designer, and artist"
                />
                <meta name="twitter:title" content="André Mossi" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@AndreMossi" />
                <meta name="twitter:creator" content="@AndreMossi" />
                <meta
                    name="twitter:image"
                    content="https://andremossi.vercel.app/Banner.png"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="darkreader-lock" />
                <link rel="shortcut icon" href="/favicon-web.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                <title>{Content(miscLang, 'title', 'name')}</title>
            </Head>

            <Navbar path={router.asPath} />

            <Container
                maxW={{ base: 'container.md', lg: '90%' }}
                height="100%"
                pt={14}
                pb={8}
            >
                <AlertNotification
                    statement={locale === 'ja'}
                    type="warning"
                    title="翻訳"
                    delay={0.6}
                >
                    このWebサイトは一人で翻訳しました。日本語を
                    {getTotalMonths(firstDay, today) - 4}
                    ヶ月位一人で勉強しています、なので翻訳がちょっと変かもしれません。でも日本で働く事が私の夢なので、毎日勉強しています。
                </AlertNotification>
                <Analytics />
                <CharModel />
                {children}
            </Container>
            <Footer />
        </Box>
    )
}

export default Main
