import {
    IoLogoTwitter,
    IoLogoInstagram,
    IoLogoGithub,
    IoLogoReddit,
    IoLogoLinkedin,
    IoMail,
} from 'react-icons/io5'
import {
    Heading,
    Button,
    Icon,
    Link,
    Box,
    useColorModeValue,
} from '@chakra-ui/react'
import Section from './section'
import UpToggle from './up-toggle'

const Footer = () => {
    return (
        <Box
            bg={useColorModeValue('whiteAlpha.600', 'whiteAlpha.100')}
            p={10}
            py={2}
            marginTop="auto"
        >
            <Section delay={0.5} maxW="100%">
                <Heading as="h3" variant="section-title">
                    Connect
                </Heading>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        <Link
                            href="https://github.com/AndreM222"
                            target="_blank"
                        >
                            <Button
                                variant="ghost"
                                colorScheme="orange"
                                leftIcon={<Icon as={IoLogoGithub} />}
                            >
                                @andrem222
                            </Button>
                        </Link>
                        <Link
                            href="https://www.instagram.com/andremoxxi/"
                            target="_blank"
                        >
                            <Button
                                variant="ghost"
                                colorScheme="orange"
                                leftIcon={<Icon as={IoLogoInstagram} />}
                            >
                                @andremoxxi
                            </Button>
                        </Link>
                        <Link
                            href="https://twitter.com/AndreMossi"
                            target="_blank"
                        >
                            <Button
                                variant="ghost"
                                colorScheme="orange"
                                leftIcon={<Icon as={IoLogoTwitter} />}
                            >
                                @AndreMossi
                            </Button>
                        </Link>
                        <Link
                            href="https://www.reddit.com/user/Temix222"
                            target="_blank"
                        >
                            <Button
                                variant="ghost"
                                colorScheme="orange"
                                leftIcon={<Icon as={IoLogoReddit} />}
                            >
                                @Temix222
                            </Button>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/andre-mossi-803765236/"
                            target="_blank"
                        >
                            <Button
                                variant="ghost"
                                colorScheme="orange"
                                leftIcon={<Icon as={IoLogoLinkedin} />}
                            >
                                Andre Mossi
                            </Button>
                        </Link>
                        <Link
                            href="mailto: mossiroberto0392@gmail.com"
                            target="_blank"
                        >
                            <Button
                                variant="ghost"
                                colorScheme="orange"
                                leftIcon={<Icon as={IoMail} />}
                            >
                                Andre Mossi
                            </Button>
                        </Link>
                    </Box>
                    <UpToggle />
                </Box>
            </Section>
        </Box>
    )
}

export default Footer
