import { Box, Circle, Flex } from '@chakra-ui/react'
import styled from '@emotion/styled'
import {
    useInView,
    motion,
    useAnimationControls,
    isValidMotionProp
} from 'framer-motion'
import { useEffect, useRef } from 'react'
import { chakra } from '@chakra-ui/react'
import isPropValid from '@emotion/is-prop-valid'

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: prop => {
        return isValidMotionProp(prop) || isPropValid(prop)
    }
})

const getVariants = isTop => ({
    hidden: {
        y: isTop ? -40 : 40,
        opacity: 0,
        scale: 0.96,
        filter: 'blur(4px)'
    },
    visible: {
        y: 150,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)'
    },
    exit: {
        y: isTop ? 40 : -40,
        opacity: 0,
        scale: 0.96,
        filter: 'blur(4px)'
    }
})

const phoneVariant = {
    hidden: {
        y: 10,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 100
    },
    exit: {
        y: 10,
        opacity: 0
    }
}

export const TimeBox = ({ children, index }) => {
    const ref = useRef(null)
    const isInView = useInView(ref)
    const controls = useAnimationControls()

    useEffect(() => {
        if (isInView) {
            controls.start('visible')
        } else {
            controls.start('exit')
        }
    }, [isInView])

    const isTop = index % 2 === 0
    const variants = getVariants(isTop)

    return (
        <Box ref={ref}>
            <Box display={{ base: 'block', lg: 'none' }} mb={2}>
                <StyledDiv
                    variants={phoneVariant}
                    initial="hidden"
                    animate={controls}
                    exit="exit"
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <Flex
                        textAlign="left"
                        fontSize="20px"
                    >
                        <Box color="orange.400" textWrap="nowrap">{children[0]}</Box>
                        {children[1]}
                    </Flex>
                </StyledDiv>
            </Box>

            <Box
                display={{ base: 'none', lg: 'flex' }}
                position="relative"
                flexDirection="column"
                alignItems="center"
                minH="300px"
            >
                {isTop && (
                    <StyledDiv
                        variants={variants}
                        initial="hidden"
                        animate={controls}
                        transition={{
                            duration: 0.6,
                            delay: 0.2,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >
                        <Box
                            position="absolute"
                            left="50%"
                            top="50%"
                            transform="translate(-50%, calc(-100% - 20px))"
                            textAlign="center"
                            fontSize="20px"
                            w="full"
                            minW="300px"
                        >
                            {children[1]}
                            <Box color="orange.400">{children[0]}</Box>
                        </Box>
                    </StyledDiv>
                )}

                <Circle
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    size="12px"
                    bg={{ _light: 'blackAlpha.600', _dark: 'whiteAlpha.600' }}
                    zIndex={2}
                />

                {!isTop && (
                    <StyledDiv
                        variants={variants}
                        initial="hidden"
                        animate={controls}
                        transition={{
                            duration: 0.6,
                            delay: 0.2,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >
                        <Box
                            position="absolute"
                            left="50%"
                            top="50%"
                            transform="translate(-50%, 20px)"
                            textAlign="center"
                            fontSize="20px"
                            w="full"
                            minW="300px"
                        >
                            <Box color="orange.400">{children[0]}</Box>
                            {children[1]}
                        </Box>
                    </StyledDiv>
                )}
            </Box>
        </Box>
    )
}

export const TimeYear = styled.span`
    font-weight: bold;
    margin-right: 1em;
`
