import { motion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: (prop) => {
        return shouldForwardProp(prop) || prop === 'transition'
    },
})

const Section = ({
    children,
    delay = 0,
    align = 'left',
    maxW = 'container.sm'
}) => (
    <StyledDiv
        align={align}
        ml={align == 'left' ? 0 : 'auto'}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={({ duration: 0.8 }, delay)}
        mb={6}
        maxW={{ lg: maxW }}
    >
        {children}
    </StyledDiv>
)

export default Section
