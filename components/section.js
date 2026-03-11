import { isValidMotionProp, motion } from 'framer-motion'
import { chakra } from '@chakra-ui/react'
import isPropValid from '@emotion/is-prop-valid'

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: prop => isValidMotionProp(prop) || isPropValid(prop)
})

const Section = ({
    children,
    delay = 0,
    align = 'left',
    maxW = '2xl'
}) => (
    <StyledDiv
        bg={{_light: 'whiteAlpha.500', _dark: 'whiteAlpha.200'}}
        boxShadow="lg"
        p={3}
        borderRadius="lg"
        align={align}
        ml={align == 'left' ? 0 : 'auto'}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: delay }}
        mb={6}
        maxW={{ lg: maxW }}
        css={{ backdropFilter: 'blur(10px)' }}
    >
        {children}
    </StyledDiv>
)

export default Section
