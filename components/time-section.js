import { isValidMotionProp, motion } from 'framer-motion'
import { chakra, Box, ScrollArea, Flex, Heading } from '@chakra-ui/react'
import isPropValid from '@emotion/is-prop-valid'
import { useRef, useState, useEffect } from 'react'
import indexLang from '../locales/pages/index.json'
import Content from './content'

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: prop => isValidMotionProp(prop) || isPropValid(prop)
})

const TimeSection = ({ children, delay = 0 }) => {
    const scrollRef = useRef(null)

    const [isAtStart, setIsAtStart] = useState(true)
    const [isAtEnd, setIsAtEnd] = useState(false)

    const checkScroll = () => {
        const el = scrollRef.current
        if (!el) return

        const { scrollLeft, scrollWidth, clientWidth } = el

        setIsAtStart(scrollLeft <= 5)
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5)
    }

    useEffect(() => {
        checkScroll()
        const el = scrollRef.current
        if (!el) return

        el.addEventListener('scroll', checkScroll)
        window.addEventListener('resize', checkScroll)

        return () => {
            el.removeEventListener('scroll', checkScroll)
            window.removeEventListener('resize', checkScroll)
        }
    }, [])

    return (
        <StyledDiv
            position="relative"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay }}
            mb={6}
            fontSize={20}
        >
            <Heading
                fontSize="2xl"
                variant="section-title"
                justifySelf="center"
                mt={10}
            >
                {Content(indexLang, 'timeline', 'title')}
            </Heading>

            <Box position="relative" display={{ base: 'none', lg: 'block' }}>
                <Box
                    display={{ base: 'none', lg: 'block' }}
                    position="absolute"
                    top="50%"
                    left="0"
                    right="0"
                    height="2px"
                    bg={{ _light: 'blackAlpha.500', _dark: 'whiteAlpha.500' }}
                    zIndex={0}
                />

                <Box position="relative">
                    {!isAtStart && (
                        <Box
                            display={{ base: 'none', lg: 'block' }}
                            pointerEvents="none"
                            position="absolute"
                            top="0"
                            left="0"
                            h="100%"
                            borderLeftRadius="xl"
                            w="60px"
                            zIndex={2}
                            bgGradient="to-r"
                            gradientFrom={{
                                _light: 'white',
                                _dark: 'gray.900'
                            }}
                            gradientTo="transparent"
                        />
                    )}

                    <ScrollArea.Root>
                        <ScrollArea.Viewport ref={scrollRef}>
                            <ScrollArea.Content py="4">
                                <Flex gap="4" flexWrap="nowrap" p={4}>
                                    <Box
                                        display={{ base: 'block', lg: 'grid' }}
                                        gridAutoFlow="column"
                                        gridAutoColumns={{ lg: '220px' }}
                                        minW={{ lg: 'max-content' }}
                                        gap={10}
                                        position="relative"
                                        zIndex={1}
                                    >
                                        {children}
                                    </Box>
                                </Flex>
                            </ScrollArea.Content>
                        </ScrollArea.Viewport>

                        <ScrollArea.Scrollbar orientation="horizontal" />
                        <ScrollArea.Corner />
                    </ScrollArea.Root>
                    {!isAtEnd && (
                        <Box
                            display={{ base: 'none', lg: 'block' }}
                            pointerEvents="none"
                            borderRightRadius="xl"
                            position="absolute"
                            top="0"
                            right="0"
                            h="100%"
                            w="60px"
                            zIndex={2}
                            bgGradient="to-l"
                            gradientFrom={{
                                _light: 'white',
                                _dark: 'gray.900'
                            }}
                            gradientTo="transparent"
                        />
                    )}
                </Box>
            </Box>
            <Box display={{ lg: 'none' }}>
                <Box>{children}</Box>
            </Box>
        </StyledDiv>
    )
}

export default TimeSection
