import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/layouts/main'
import theme from '../lib/theme'
import Fonts from '../components/fonts'
import { AnimatePresence } from 'framer-motion'
import '../lib/sweeper.css'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false
        }
    }
})

function Website({ Component, pageProps, router }) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
        }
    }, [])

    useEffect(() => {
        navigator.serviceWorker.onmessage = e => {
            if (e.data?.type === 'news-unread') {
                const next =
                    (Number(localStorage.getItem('news_unread')) || 0) + 1
                localStorage.setItem('news_unread', next)
                window.dispatchEvent(new Event('news-update'))
            }
        }
    }, [])

    return (
        <ChakraProvider theme={theme}>
            <Fonts />
            <QueryClientProvider client={queryClient}>
                <Layout router={router}>
                    <AnimatePresence mode="wait" initial={true}>
                        <Component {...pageProps} key={router.route} />
                    </AnimatePresence>
                </Layout>
            </QueryClientProvider>
        </ChakraProvider>
    )
}

export default Website
