'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Image } from '@chakra-ui/react'

const AvatarIcon = () => {
    const [playing, setPlaying] = useState(false)
    const videoRef = useRef(null)

    useEffect(() => {
        const resume = () => {
            videoRef.current?.play().catch(() => { })
        }

        document.addEventListener('visibilitychange', resume)
        window.addEventListener('focus', resume)
        window.addEventListener('touchstart', resume)

        return () => {
            document.removeEventListener('visibilitychange', resume)
            window.removeEventListener('focus', resume)
            window.removeEventListener('touchstart', resume)
        }
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
                opacity={playing ? 0 : 1}
                transition="opacity 0.3s"
            />

            <video
                ref={videoRef}
                src="/images/HPFX_ProfilePic.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
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
