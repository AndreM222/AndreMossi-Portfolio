import NextLink from 'next/link'
import { Heading, Box, Image, Link, Badge } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { AiFillFolderOpen } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'

export const Title = ({ children }) => (
    <Box>
        <Link as={NextLink} href="/practice">
            <Icon as={AiFillFolderOpen}/>
            &nbsp;
            Practices
        </Link>
        <span>
            &nbsp;
            <ChevronRightIcon />
            &nbsp;
        </span>
        <Heading display="inline-block" as="h3" fontSize={20} mb={4}>
            {children}
        </Heading>
    </Box>
)

export const ThumbImage = ({ src, alt }) => (
    <Image borderRadius="lg" w="full" src={src} alt={alt} mb={4} />
)

export const Meta = ({ children }) => (
    <Badge colorScheme="cyan" mr={2}>
        {children}
    </Badge>
)
