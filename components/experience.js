import NextLink from 'next/link'
import { Heading, Box, Image, Link, Badge } from '@chakra-ui/react'
import { FaChevronRight } from 'react-icons/fa'
import { AiFillFolderOpen } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'
import miscLang from '../locales/misc.json'
import Content from './content'

export const Title = ({ children }) => (
    <Box
        display="inline-flex"
        alignItems="center"
        gap={2}
        justifyItems="center"
    >
        <Link as={NextLink} href="/experience">
            <Icon as={AiFillFolderOpen} />
            &nbsp;
            {Content(miscLang, 'category', 'experience')}
        </Link>
        <FaChevronRight size={10} />
        <Heading display="inline-block" as="h3" fontSize={20}>
            {children}
        </Heading>
    </Box>
)

export const ThumbImage = ({ src, alt }) => (
    <Image borderRadius="lg" w="full" src={src} alt={alt} mb={4} />
)

export const Meta = ({ children }) => (
    <Badge
        bg={{ _light: 'cyan.100', _dark: '#26333a' }}
        color={{ _light: 'cyan.800', _dark: '#9decf9' }}
        mr={2}
    >
        {children}
    </Badge>
)
