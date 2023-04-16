import { motion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: (prop) => {
        return shouldForwardProp(prop) || prop === 'transition'
    },
})

const TimeSection = ({ children, delay = 0 }) => (
    <StyledDiv
        m="auto"
        align="center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={({ duration: 0.8 }, delay)}
        mb={6}
        maxW="container.sm"
    >
        {children}
    </StyledDiv>
)

export default TimeSection
