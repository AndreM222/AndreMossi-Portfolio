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
        if (!('serviceWorker' in navigator)) return

        const handler = event => {
            if (event.data?.type === 'UNREAD_NOTIFICATION') {
                const current = Number(localStorage.getItem('news_unread')) || 0

                const next = current + event.data.count

                localStorage.setItem('news_unread', next)

                window.dispatchEvent(new Event('news-update'))
            }
        }

        navigator.serviceWorker.addEventListener('message', handler)

        return () =>
            navigator.serviceWorker.removeEventListener('message', handler)
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
