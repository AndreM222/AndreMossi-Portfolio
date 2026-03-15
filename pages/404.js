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
import { FaChevronRight, FaExclamationTriangle } from 'react-icons/fa'
import Content from '../components/content'
import errorLang from '../locales/pages/404.json'

const NotFound = () => {
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
                        {Content(errorLang, 'title', 'content')}
                    </Heading>

                    <Box display="inline-flex" gap={2} alignItems="center">
                        <FaExclamationTriangle
                            size={12}
                            style={{
                                color: '#fb923c'
                            }}
                        />

                        <Text fontSize="sm" opacity={0.8}>
                            {Content(errorLang, 'description', 'content')}
                        </Text>
                    </Box>
                </Box>

                <Box justifySelf="center" alignSelf="center">
                    <Box
                        position="relative"
                        w={{ base: 24, md: 28 }}
                        h={{ base: 24, md: 28 }}
                    >
                        <Image
                            position="absolute"
                            top={2}
                            left={2}
                            right={2}
                            bottom={2}
                            objectFit="cover"
                            borderRadius="xl"
                            src="/images/Error.png"
                            alt="404 Error"
                            fallback={
                                <Box
                                    w="full"
                                    h="full"
                                    borderRadius="xl"
                                    bg="whiteAlpha.200"
                                    style={{ backdropFilter: 'blur(8px)' }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <FaExclamationTriangle
                                        size={20}
                                        color="white"
                                    />
                                </Box>
                            }
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
                @keyframes shake {
                    0%,
                    100% {
                        transform: translateX(0);
                    }
                    25% {
                        transform: translateX(-2px);
                    }
                    75% {
                        transform: translateX(2px);
                    }
                }
            `}</style>
        </Container>
    )
}

export default NotFound
