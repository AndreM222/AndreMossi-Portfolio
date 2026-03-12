import { Box, Flex, Image } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useEffect, useState } from 'react'

const morph = keyframes`
0% {
  width: 190px;
  height: 190px;
  border-radius: 24px;
}
40% {
  width: 90px;
  height: 40px;
  border-radius: 20px;
}
70% {
  width: 160px;
  height: 10px;
  border-radius: 10px;
}
100% {
  width: 220px;
  height: 10px;
  border-radius: 10px;
}
`

const bgShift = keyframes`
0% { background: transparent; }
60% { background: var(--bar-bg); }
100% { background: var(--bar-bg); }
`

const pngFade = keyframes`
0% { opacity: 1; }
60% { opacity: 1; }
100% { opacity: 0; }
`

const svgAppear = keyframes`
0% {
  opacity: 0;
  transform: translateX(-10px);
}
70% {
  opacity: 0;
}
100% {
  opacity: 1;
  transform: translateX(0);
}
`

const fill = keyframes`
0% { width: 0%; }
100% { width: 100%; }
`

const fadeOut = keyframes`
0% { opacity: 1; }
100% { opacity: 0; }
`

export default function AppLoader({ isLoading, isPWA }) {
    const [mounted, setMounted] = useState(false)
    const [dark, setDark] = useState(false)

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        setDark(media.matches)
        setMounted(true)

        const update = () => setDark(media.matches)
        media.addEventListener('change', update)

        return () => media.removeEventListener('change', update)
    }, [])

    const bg = dark ? '#101015' : '#f1ece8'
    const barBg = dark ? '#ffffff' : '#000000'
    const barFg = dark ? 'orange.300' : 'orange.600'
    const [done, setDone] = useState(!isLoading)

    if (!mounted) return null

    return (
        !done && (
            <Box
                position="fixed"
                inset="0"
                bg={bg}
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex="9999"
                onAnimationEndCapture={() => {
                    if (!isLoading) setDone(true)
                }}
                animation={
                    !isLoading ? `${fadeOut} 400ms ease forwards` : undefined
                }
            >
                {isPWA && (
                    <Flex alignItems="center">
                        <Image
                            opacity="0"
                            h="18px"
                            transform="translateY(-50%)"
                            mr={3}
                            src="/images/LogoNav.svg"
                            animation={`${svgAppear} 900ms ease forwards`}
                        />

                        <Box
                            position="relative"
                            overflow="hidden"
                            animation={`${morph} 900ms cubic-bezier(.6,.05,.28,.91) forwards, ${bgShift} 900ms ease forwards`}
                            css={{ '--bar-bg': barBg }}
                        >
                            <Image
                                src="/icons/icon-bg.png"
                                position="absolute"
                                inset="0"
                                objectFit="contain"
                                animation={`${pngFade} 900ms ease forwards`}
                            />

                            <Box
                                position="absolute"
                                left="0"
                                top="0"
                                bottom="0"
                                bg={barFg}
                                animation={`${fill} 1.6s ease forwards`}
                                animationDelay="900ms"
                            />
                        </Box>
                    </Flex>
                )}
            </Box>
        )
    )
}
