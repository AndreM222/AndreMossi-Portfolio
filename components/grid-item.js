import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Text, LinkBox, LinkOverlay, Skeleton } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { useState } from 'react'

export const GridItem = ({ children, href, title, thumbnail, ...props }) => (
    <Box w="100%" textAlign="center" {...props}>
        <LinkBox cursor="pointer">
            <Image
                src={thumbnail}
                alt={title}
                className="grid-item-thumbnail"
                placeholder="blur"
                loading="lazy"
            />
            <LinkOverlay href={href} target="_blank">
                <Text mt={2}>{title}</Text>
            </LinkOverlay>
            <Text fontSize={14}>{children}</Text>
        </LinkBox>
    </Box>
)

export const ExperienceGridItem = ({ children, id, title, thumbnail }) => {
    const [loaded, setLoaded] = useState(false)
    const WIDTH = 720
    const HEIGHT = 400

    return (
        <Box w="100%" textAlign="center">
            <LinkBox
                as={NextLink}
                href={`/experiences/${id}`}
                scroll={false}
                cursor="pointer"
            >
                <Skeleton
                    isLoaded={loaded}
                    fadeDuration={0.4}
                    borderRadius="12px"
                >
                    <Image
                        src={thumbnail}
                        alt={title}
                        width={WIDTH}
                        height={HEIGHT}
                        className="grid-item-thumbnail"
                        onLoadingComplete={() => setLoaded(true)}
                    />
                </Skeleton>
                <LinkOverlay as="div" href={`/experiences/${id}`}>
                    <Text mt={2} fontSize={20}>
                        {title}
                    </Text>
                </LinkOverlay>
                <Text fontSize={14}>{children}</Text>
            </LinkBox>
        </Box>
    )
}

export const GridItemStyle = () => (
    <Global
        styles={`
            .grid-item-thumbnail{
                border-radius: 12px;
            }
        `}
    />
)
