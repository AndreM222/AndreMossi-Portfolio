import { Box, Circle, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const TimeBox = ({ children, last = false }) => (
    <Box>
        <Box pl="3.4em" textIndent="-3.4em" textAlign={{ base: "left", sm: "center" }}>
            {children}
        </Box>
        <Circle
            display={{ base: "none", sm: "flex" }}
            w={last == true ? 2 : 1}
            h={last == true ? 2 : 7}
            bg={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
        />

    </Box>
)

export const TimeYear = styled.span`
    font-weight: bold;
    margin-right: 1em;
`
