import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Container } from '@chakra-ui/react'
import Navbar from '../navbar'
const CharModel = dynamic(() => import('../character'), {
    ssr: false,
})
import Footer from '../footer'
import Content from '../content'
import miscLang from '../../pages/assets/misc.json'

const Main = ({ children, router }) => {
    return (
        <Box as="main" display="flex" minH="100vh" flexDir="column">
            <Head>
                <meta name="author" content="André Mossi" />
                <meta property="og:title" content="André Mossi" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://andremossi.vercel.app/Banner.png" />
                <meta property="og:description" content="Full-Stack developer, designer, and artist" />
                <meta name="twitter:title" content="André Mossi" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@AndreMossi" />
                <meta name="twitter:creator" content="@AndreMossi" />
                <meta name="twitter:image" content="https://andremossi.vercel.app/Banner.png" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="shortcut icon" href="/favicon-web.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                <title>{Content(miscLang, 'title', 'name')}</title>
            </Head>

            <Navbar path={router.asPath} />

            <Container maxW={{ base: "container.md", lg: "90%" }} height="100%" pt={14} pb={8}>
                <CharModel />
                {children}
            </Container>
            <Footer />
        </Box>
    )
}

export default Main
