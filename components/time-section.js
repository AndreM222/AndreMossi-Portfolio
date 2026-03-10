import { isValidMotionProp, motion } from 'framer-motion'
import { chakra } from '@chakra-ui/react'
import isPropValid from '@emotion/is-prop-valid'

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: prop =>
    isValidMotionProp(prop) || isPropValid(prop)
})

const TimeSection = ({ children, delay = 0 }) => (
    <StyledDiv
        align="center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: delay}}
        mb={6}
        fontSize={20}
    >
        {children}
    </StyledDiv>
)

export default TimeSection
