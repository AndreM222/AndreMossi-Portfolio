import NextLink from 'next/link'
import {
    Box,
    Heading,
    Container,
    Separator,
    Text,
    Button,
    Image
} from '@chakra-ui/react'
import { FaChevronRight } from 'react-icons/fa'
import Content from '../components/content'
import errorLang from '../locales/pages/404.json'

const NotFound = () => {
    return (
        <Container>
            <Box display={{ md: 'flex' }} justifyContent="space-between">
                <Box>
                    <Heading as="h1">
                        {Content(errorLang, 'title', 'content')}
                    </Heading>
                    <Text>{Content(errorLang, 'description', 'content')}</Text>
                </Box>
                <Box align="center">
                    <Image
                        maxH={20}
                        borderRadius={30}
                        src="/images/Error.png"
                        alt="icon"
                    />
                </Box>
            </Box>
            <Separator my={6} />

            <Box my={6} align="center">
                <Button
                    as={NextLink}
                    href="/"
                >
                    {Content(errorLang, 'return', 'content')}
                    <FaChevronRight />
                </Button>
            </Box>
        </Container>
    )
}

export default NotFound
