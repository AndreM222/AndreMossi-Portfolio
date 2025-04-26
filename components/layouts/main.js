import Head from 'next/head'
import dynamic from 'next/dynamic'
import {
    AlertIcon,
    Box,
    Container,
    AlertTitle,
    AlertDescription,
    Alert,
    CloseButton,
    useDisclosure
} from '@chakra-ui/react'
import Navbar from '../navbar'
const CharModel = dynamic(() => import('../character'), {
    ssr: false
})
import Footer from '../footer'
import Content from '../content'
import miscLang from '../../locales/misc.json'
import { useRouter } from 'next/router'

const Main = ({ children, router }) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })

    const { locale } = useRouter()

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
                {isOpen && locale === "ja" ? (
                    <Alert
                        status="warning"
                        variant="left-accent"
                        position="fixed"
                        w={{ base: 'full', sm: 'fit-content' }}
                        rounded="lg"
                        top="1/2"
                        zIndex="50"
                        right={{ base: '0', lg: '50%' }}
                        m={3}
                        opacity="100%"
                    >
                        <AlertIcon />
                        <Box>
                            <AlertTitle>翻訳</AlertTitle>
                            <AlertDescription>
                                このWebサイトは一人で翻訳しました。日本語を10ヶ月位一人で勉強しています、なので翻訳がちょっと変かもしれません。でも日本で働く事が私の夢なので、毎日勉強しています。
                            </AlertDescription>
                        </Box>
                        <CloseButton
                            alignSelf="flex-start"
                            position="relative"
                            right={-1}
                            top={-1}
                            onClick={onClose}
                        />
                    </Alert>
                ) : (
                    <div />
                )}
                <CharModel />
                {children}
            </Container>
            <Footer />
        </Box>
    )
}

export default Main
