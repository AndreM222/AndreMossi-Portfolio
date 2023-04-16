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

const NotFound = () => {
    return (
        <Container>
            <Box display={{ md: 'flex' }} justifyContent="space-between">
                <Box>
                    <Heading as="h1">Not Found </Heading>
                    <Text>The page you&apos;re looking for was not found.</Text>
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
                    Return Home
                </Button>
            </Box>
        </Container>
    )
}

export default NotFound
