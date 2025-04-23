import { Box, Button } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import Content from '../content'
import miscLang from '../../locales/misc.json'

const NavBTN = ({ href, ...props }) => {
    return (
        <Box align="center" my={4}>
            <Button
                as={NextLink}
                href={href}
                rightIcon={<ChevronRightIcon />}
                colorScheme="orange"
                {...props}
            >
                {Content(miscLang, 'button', 'content')}
            </Button>
        </Box>
    )
}

export default NavBTN
