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
import { Analytics } from '@vercel/analytics/react'
import { useEffect, useState } from 'react'
import AppLoader from '../AppLoader'

const Main = ({ children, router }) => {
    const [loading, setLoading] = useState(true)
    const [isPWA, setIsPWA] = useState(false)

    useEffect(() => {
        const isPWA =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone

        if (!isPWA) {
            setLoading(false)
            return
        }

        setIsPWA(true)

        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <Box as="main" display="flex" minH="100vh" flexDir="column">
            <Head>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
                <link rel="manifest" href="/api/manifest.webmanifest" />
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
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="darkreader-lock" />
                <link
                    rel="shortcut icon"
                    href="/favicon-web.ico"
                    type="image/x-icon"
                />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                <title>{Content(miscLang, 'title', 'name')}</title>
                {/* DARK MODE */}
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_17_Pro_Max__iPhone_16_Pro_Max_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_17_Pro__iPhone_17__iPhone_16_Pro_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 420px) and (device-height: 912px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_Air_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_16e__iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_11__iPhone_XR_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/13__iPad_Pro_M4_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/12.9__iPad_Pro_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/11__iPad_Pro_M4_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/11__iPad_Pro__10.5__iPad_Pro_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/10.9__iPad_Air_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/10.5__iPad_Air_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/10.2__iPad_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/8.3__iPad_Mini_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_17_Pro_Max__iPhone_16_Pro_Max_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_17_Pro__iPhone_17__iPhone_16_Pro_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 420px) and (device-height: 912px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_Air_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_16e__iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_11__iPhone_XR_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/13__iPad_Pro_M4_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/12.9__iPad_Pro_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/11__iPad_Pro_M4_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/11__iPad_Pro__10.5__iPad_Pro_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/10.9__iPad_Air_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/10.5__iPad_Air_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/10.2__iPad_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: dark)"
                    href="/splashScreens/dark/8.3__iPad_Mini_portrait.png"
                />

                {/* LIGHT MODE */}
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_17_Pro_Max__iPhone_16_Pro_Max_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_17_Pro__iPhone_17__iPhone_16_Pro_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 420px) and (device-height: 912px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_Air_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_16e__iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_11__iPhone_XR_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/13__iPad_Pro_M4_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/12.9__iPad_Pro_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/11__iPad_Pro_M4_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/11__iPad_Pro__10.5__iPad_Pro_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/10.9__iPad_Air_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/10.5__iPad_Air_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/10.2__iPad_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/8.3__iPad_Mini_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_17_Pro_Max__iPhone_16_Pro_Max_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_17_Pro__iPhone_17__iPhone_16_Pro_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 420px) and (device-height: 912px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_Air_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_16e__iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_11__iPhone_XR_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/13__iPad_Pro_M4_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/12.9__iPad_Pro_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/11__iPad_Pro_M4_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/11__iPad_Pro__10.5__iPad_Pro_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/10.9__iPad_Air_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/10.5__iPad_Air_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/10.2__iPad_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) and (prefers-color-scheme: light)"
                    href="/splashScreens/light/8.3__iPad_Mini_portrait.png"
                />
            </Head>
            {<AppLoader isLoading={loading} isPWA={isPWA} />}

            <Navbar path={router.asPath} opacity={loading && '0'} />

            <Container
                maxW={{ base: 'container.md', lg: '90%' }}
                height="100%"
                pt={14}
                pb={8}
                opac
                opacity={loading && '0'}
            >
                <Analytics />
                <CharModel />
                {children}
            </Container>
            <Footer opacity={loading && '0'} />
        </Box>
    )
}

export default Main
