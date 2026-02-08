'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Image } from '@chakra-ui/react'

const AvatarIcon = () => {
    const [loaded, setLoaded] = useState(false)
    const videoRef = useRef(null)

    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                videoRef.current?.play().catch(() => { })
            }
        }

        document.addEventListener('visibilitychange', handleVisibility)
        return () =>
            document.removeEventListener('visibilitychange', handleVisibility)
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
                opacity={loaded ? 0 : 1}
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
