import { Box, Circle, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const TimeBox = ({ children, last = false }) => (
    <Box>
        <Box pl="3.4em" textIndent="-3.4em" textAlign={{ base: "left", md: "center" }}>
            {children}
        </Box>
        <Circle
            display={{ base: "none", md: "flex" }}
            w={last == true ? 3 : 2}
            h={last == true ? 3 : 12}
            bg={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
        />

    </Box>
)

export const TimeYear = styled.span`
    font-weight: bold;
    margin-right: 1em;
`
