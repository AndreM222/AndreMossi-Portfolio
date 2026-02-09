'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Image } from '@chakra-ui/react'

const AvatarIcon = () => {
    const [loaded, setLoaded] = useState(false)
    const [playing, setPlaying] = useState(false)
    const videoRef = useRef(null)

    useEffect(() => {
        const handleVisibility = () => {
            videoRef.current?.play().catch(() => { })
        }

        document.addEventListener('visibilitychange', handleVisibility)
        return () =>
            document.removeEventListener('visibilitychange', handleVisibility)
    }, [])

    useEffect(() => {
        const resume = () => videoRef.current?.play().catch(() => { })
        window.addEventListener('touchstart', resume, { once: true })
        return () => window.removeEventListener('touchstart', resume)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const video = videoRef.current
            if (!video) return

            setPlaying(!video.paused && !video.ended && video.readyState > 2)
        }, 500)

        return () => clearInterval(interval)
    }, [])

    return (
        <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            borderRadius="full"
            overflow="hidden"
            position="relative"
        >
            <Image
                src="/images/PortfolioPic.png"
                alt="Profile"
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                objectFit="cover"
                opacity={loaded && playing ? 0 : 1}
                transition="opacity 0.4s"
            />

            <video
                ref={videoRef}
                src="/images/HPFX_ProfilePic.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                onCanPlay={() => setLoaded(true)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
        </Box>
    )
}

export default AvatarIcon
