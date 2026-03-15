import NextLink from 'next/link'
import {
    Box,
    Heading,
    Container,
    Separator,
    Text,
    Button,
    Image,
    SimpleGrid
} from '@chakra-ui/react'
import { FaChevronRight, FaDatabase } from 'react-icons/fa'
import Content from '../components/content'
import errorLang from '../locales/pages/404.json'

const Offline = () => {
    return (
        <Container maxW="container.lg" position="relative" overflow="hidden">
            <Box
                display={{ md: 'flex' }}
                justifyContent="space-between"
                position="relative"
                zIndex={1}
                pt={{ base: 8, md: 0 }}
            >
                <Box flex={1} pr={{ md: 12 }}>
                    <Heading
                        as="h1"
                        mb={2}
                        bgGradient="linear(to-r, orange.400, orange.600)"
                    >
                        {Content(errorLang, 'offline', 'title')}
                    </Heading>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
                        <Box>
                            <Text fontSize="sm" opacity={0.8} mb={2}>
                                {Content(errorLang, 'offline', 'subtitle')}
                                <Box
                                    as="span"
                                    fontWeight="bold"
                                    color="orange.400"
                                >
                                    {Content(errorLang, 'offline', 'cached')}
                                </Box>
                                {Content(errorLang, 'offline', 'usable')}
                            </Text>
                        </Box>
                        <Box>
                            <Text fontSize="sm" opacity={0.6}>
                                <FaDatabase
                                    style={{
                                        display: 'inline',
                                        marginRight: 4,
                                        color: 'orange.400'
                                    }}
                                    size={12}
                                />
                                {Content(errorLang, 'offline', 'liveData')}
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box justifySelf="center" alignSelf="center">
                    <Box
                        position="relative"
                        w={{ base: 24, md: 28 }}
                        h={{ base: 24, md: 28 }}
                    >
                        <Image
                            position="absolute"
                            objectFit="cover"
                            borderRadius="xl"
                            src="/images/Error.png"
                            alt="Offline"
                        />
                    </Box>
                </Box>
            </Box>

            <Separator my={6} />

            <Box my={6} align="center">
                <Button
                    as={NextLink}
                    bg="orange.fg"
                    _hover={{
                        bg: 'orange.border'
                    }}
                    boxShadow="lg"
                    href="/"
                >
                    <Box mr={2}>{Content(errorLang, 'return', 'content')}</Box>
                    <FaChevronRight />
                </Button>
            </Box>

            <style jsx>{`
                @keyframes pulse {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }
            `}</style>
        </Container>
    )
}

export default Offline
