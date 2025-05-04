import { Box, Circle, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useInView, motion, useAnimationControls } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: prop => {
        return shouldForwardProp(prop) || prop === 'transition'
    }
})
const variants = {
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

export const TimeBox = ({ children, last = false }) => {
    const ref = useRef(null)
    const isInView = useInView(ref)

    const controls = useAnimationControls()

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isInView && !isVisible) {
            setIsVisible(true)
            controls.start('visible')
        } else if (isVisible) {
            setIsVisible(false)
            controls.start('hidden')
        }
    }, [isInView])

    return (
        <Box ref={ref} mb={{ base: 2, md: 0 }}>
            <StyledDiv
                variants={variants}
                initial={{ y: 10, opacity: 0 }}
                animate={controls}
                exit="exit"
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <Box
                    pl="3.4em"
                    textIndent="-3.4em"
                    display="row"
                    textAlign={{ base: 'left', md: 'center' }}
                    fontSize="20px"
                >
                    {children}
                </Box>
                <Circle
                    display={{ base: 'none', md: 'flex' }}
                    w={last == true ? 3 : 2}
                    h={last == true ? 3 : 12}
                    bg={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
                />
            </StyledDiv>
        </Box>
    )
}

export const TimeYear = styled.span`
font-weight: bold;
margin-right: 1em;
`
