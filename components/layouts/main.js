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

const Main = ({ children, router }) => {
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
                {/* 🌑 DARK MODE */}
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/10.2_iPad_landscape_dark_landscape.png"
                    media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/10.2_iPad_portrait_dark_portrait.png"
                    media="screen and (device-width: 1112px) and (device-height: 834px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/10.5_iPad_Air_landscape_dark_landscape.png"
                    media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/10.5_iPad_Air_portrait_dark_portrait.png"
                    media="screen and (device-width: 1112px) and (device-height: 834px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/10.9_iPad_Air_landscape_dark_landscape.png"
                    media="screen and (device-width: 926px) and (device-height: 1231px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/10.9_iPad_Air_portrait_dark_portrait.png"
                    media="screen and (device-width: 1231px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/11_iPad_Pro_10.5_iPad_Pro_landscape_dark_landscape.png"
                    media="screen and (device-width: 926px) and (device-height: 1231px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/11_iPad_Pro_10.5_iPad_Pro_portrait_dark_portrait.png"
                    media="screen and (device-width: 1231px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/11_iPad_Pro_M4_landscape_dark_landscape.png"
                    media="screen and (device-width: 926px) and (device-height: 1231px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/11_iPad_Pro_M4_portrait_dark_portrait.png"
                    media="screen and (device-width: 1231px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/12.9_iPad_Pro_landscape_dark_landscape.png"
                    media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/12.9_iPad_Pro_portrait_dark_portrait.png"
                    media="screen and (device-width: 1366px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/13_iPad_Pro_M4_landscape_dark_landscape.png"
                    media="screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/13_iPad_Pro_M4_portrait_dark_portrait.png"
                    media="screen and (device-width: 1376px) and (device-height: 1032px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_11_iPhone_XR_landscape_dark_landscape.png"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_11_iPhone_XR_portrait_dark_portrait.png"
                    media="screen and (device-width: 896px) and (device-height: 414px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_11_Pro_Max_iPhone_XS_Max_landscape_dark_landscape.png"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_11_Pro_Max_iPhone_XS_Max_portrait_dark_portrait.png"
                    media="screen and (device-width: 896px) and (device-height: 414px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_13_mini_iPhone_12_mini_iPhone_11_Pro_iPhone_XS_iPhone_X_landscape_dark_landscape.png"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_13_mini_iPhone_12_mini_iPhone_11_Pro_iPhone_XS_iPhone_X_portrait_dark_portrait.png"
                    media="screen and (device-width: 896px) and (device-height: 414px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_14_Plus_iPhone_13_Pro_Max_iPhone_12_Pro_Max_landscape_dark_landscape.png"
                    media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_14_Plus_iPhone_13_Pro_Max_iPhone_12_Pro_Max_portrait_dark_portrait.png"
                    media="screen and (device-width: 844px) and (device-height: 390px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_16_iPhone_15_Pro_iPhone_15_iPhone_14_Pro_landscape_dark_landscape.png"
                    media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_16_iPhone_15_Pro_iPhone_15_iPhone_14_Pro_portrait_dark_portrait.png"
                    media="screen and (device-width: 852px) and (device-height: 393px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_16_Plus_iPhone_15_Pro_Max_iPhone_15_Plus_iPhone_14_Pro_Max_landscape_dark_landscape.png"
                    media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_16_Plus_iPhone_15_Pro_Max_iPhone_15_Plus_iPhone_14_Pro_Max_portrait_dark_portrait.png"
                    media="screen and (device-width: 932px) and (device-height: 430px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_16e_iPhone_14_iPhone_13_Pro_iPhone_13_iPhone_12_Pro_iPhone_12_landscape_dark_landscape.png"
                    media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_16e_iPhone_14_iPhone_13_Pro_iPhone_13_iPhone_12_Pro_iPhone_12_portrait_dark_portrait.png"
                    media="screen and (device-width: 844px) and (device-height: 390px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_17_Pro_iPhone_17_iPhone_16_Pro_landscape_dark_landscape.png"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_17_Pro_iPhone_17_iPhone_16_Pro_portrait_dark_portrait.png"
                    media="screen and (device-width: 896px) and (device-height: 414px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_17_Pro_Max_iPhone_16_Pro_Max_landscape_dark_landscape.png"
                    media="screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_17_Pro_Max_iPhone_16_Pro_Max_portrait_dark_portrait.png"
                    media="screen and (device-width: 956px) and (device-height: 440px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_Air_landscape_dark_landscape.png"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/dark/iPhone_Air_portrait_dark_portrait.png"
                    media="screen and (device-width: 896px) and (device-height: 414px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: dark)"
                />

                {/* ☀️ LIGHT MODE */}
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/10.2_iPad_landscape_light_landscape.png"
                    media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/10.2_iPad_portrait_light_portrait.png"
                    media="screen and (device-width: 1112px) and (device-height: 834px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/10.5_iPad_Air_landscape_light_landscape.png"
                    media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/10.5_iPad_Air_portrait_light_portrait.png"
                    media="screen and (device-width: 1112px) and (device-height: 834px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/10.9_iPad_Air_landscape_light_landscape.png"
                    media="screen and (device-width: 926px) and (device-height: 1231px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/10.9_iPad_Air_portrait_light_portrait.png"
                    media="screen and (device-width: 1231px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/11_iPad_Pro_10.5_iPad_Pro_landscape_light_landscape.png"
                    media="screen and (device-width: 926px) and (device-height: 1231px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/11_iPad_Pro_10.5_iPad_Pro_portrait_light_portrait.png"
                    media="screen and (device-width: 1231px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/11_iPad_Pro_M4_landscape_light_landscape.png"
                    media="screen and (device-width: 926px) and (device-height: 1231px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/11_iPad_Pro_M4_portrait_light_portrait.png"
                    media="screen and (device-width: 1231px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/12.9_iPad_Pro_landscape_light_landscape.png"
                    media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/12.9_iPad_Pro_portrait_light_portrait.png"
                    media="screen and (device-width: 1366px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/13_iPad_Pro_M4_landscape_light_landscape.png"
                    media="screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/13_iPad_Pro_M4_portrait_light_portrait.png"
                    media="screen and (device-width: 1376px) and (device-height: 1032px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_11_iPhone_XR_landscape_light_landscape.png"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_11_iPhone_XR_portrait_light_portrait.png"
                    media="screen and (device-width: 896px) and (device-height: 414px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_11_Pro_Max_iPhone_XS_Max_landscape_light_landscape.png"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_11_Pro_Max_iPhone_XS_Max_portrait_light_portrait.png"
                    media="screen and (device-width: 896px) and (device-height: 414px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_13_mini_iPhone_12_mini_iPhone_11_Pro_iPhone_XS_iPhone_X_landscape_light_landscape.png"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_13_mini_iPhone_12_mini_iPhone_11_Pro_iPhone_XS_iPhone_X_portrait_light_portrait.png"
                    media="screen and (device-width: 896px) and (device-height: 414px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_14_Plus_iPhone_13_Pro_Max_iPhone_12_Pro_Max_landscape_light_landscape.png"
                    media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_14_Plus_iPhone_13_Pro_Max_iPhone_12_Pro_Max_portrait_light_portrait.png"
                    media="screen and (device-width: 844px) and (device-height: 390px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_16_iPhone_15_Pro_iPhone_15_iPhone_14_Pro_landscape_light_landscape.png"
                    media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_16_iPhone_15_Pro_iPhone_15_iPhone_14_Pro_portrait_light_portrait.png"
                    media="screen and (device-width: 852px) and (device-height: 393px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_16_Plus_iPhone_15_Pro_Max_iPhone_15_Plus_iPhone_14_Pro_Max_landscape_light_landscape.png"
                    media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_16_Plus_iPhone_15_Pro_Max_iPhone_15_Plus_iPhone_14_Pro_Max_portrait_light_portrait.png"
                    media="screen and (device-width: 932px) and (device-height: 430px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_16e_iPhone_14_iPhone_13_Pro_iPhone_13_iPhone_12_Pro_iPhone_12_landscape_light_landscape.png"
                    media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_16e_iPhone_14_iPhone_13_Pro_iPhone_13_iPhone_12_Pro_iPhone_12_portrait_light_portrait.png"
                    media="screen and (device-width: 844px) and (device-height: 390px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_17_Pro_iPhone_17_iPhone_16_Pro_landscape_light_landscape.png"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_17_Pro_iPhone_17_iPhone_16_Pro_portrait_light_portrait.png"
                    media="screen and (device-width: 896px) and (device-height: 414px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_17_Pro_Max_iPhone_16_Pro_Max_landscape_light_landscape.png"
                    media="screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_17_Pro_Max_iPhone_16_Pro_Max_portrait_light_portrait.png"
                    media="screen and (device-width: 956px) and (device-height: 440px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_Air_landscape_light_landscape.png"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) and (prefers-color-scheme: light)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashScreens/light/iPhone_Air_portrait_light_portrait.png"
                    media="screen and (device-width: 896px) and (device-height: 414px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) and (prefers-color-scheme: light)"
                />
            </Head>

            <Navbar path={router.asPath} />

            <Container
                maxW={{ base: 'container.md', lg: '90%' }}
                height="100%"
                pt={14}
                pb={8}
            >
                <Analytics />
                <CharModel />
                {children}
            </Container>
            <Footer />
        </Box>
    )
}

export default Main
