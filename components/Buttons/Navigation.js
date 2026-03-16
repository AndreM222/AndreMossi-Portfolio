import { Box, Button } from '@chakra-ui/react'
import { FaChevronRight } from 'react-icons/fa'
import NextLink from 'next/link'
import Content from '../content'
import miscLang from '../../locales/misc.json'

const NavBTN = ({ href, ...props }) => {
    return (
        <Box display="flex" justifyContent="center" my={4}>
            <Button
                as={NextLink}
                bg="orange.fg"
                _hover={{ bg: 'orange.border' }}
                href={href}
                {...props}
            >
                {Content(miscLang, 'moreBTN', 'content')}
                <FaChevronRight />
            </Button>
        </Box>
    )
}

export default NavBTN
