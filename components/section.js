import { motion } from 'framer-motion'
import { useColorModeValue, chakra, shouldForwardProp } from '@chakra-ui/react'

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: (prop) => {
        return shouldForwardProp(prop) || prop === 'transition'
    },
})

const Section = ({
    children,
    delay = 0,
    align = 'left',
    maxW = 'container.sm',
}) => (
    <StyledDiv
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
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
