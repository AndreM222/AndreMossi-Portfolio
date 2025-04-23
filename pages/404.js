import NextLink from 'next/link'
import {
    Box,
    Heading,
    Container,
    Divider,
    Text,
    Button,
    Image,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Content from '../components/content'
import errorLang from '../locales/pages/404.json'

const NotFound = () => {
    return (
        <Container>
            <Box display={{ md: 'flex' }} justifyContent="space-between">
                <Box>
                    <Heading as="h1">{Content(errorLang, "title", "content")}</Heading>
                    <Text>{Content(errorLang, "description", "content")}</Text>
                </Box>
                <Box
                    align="center"
                >
                    <Image
                        maxH={20}
                        borderRadius={30}
                        src="/images/Error.png"
                        alt='icon'
                    />
                </Box>
            </Box>
            <Divider my={6} />

            <Box my={6} align="center">
                <Button
                    as={NextLink}
                    href="/"
                    colorScheme="orange"
                    rightIcon={<ChevronRightIcon />}
                >
                    {Content(errorLang, "return", "content")}
                </Button>
            </Box>
        </Container>
    )
}

export default NotFound
