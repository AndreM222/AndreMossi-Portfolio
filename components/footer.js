import {
    IoLogoInstagram,
    IoLogoGithub,
    IoLogoReddit,
    IoLogoLinkedin,
    IoMail,
} from 'react-icons/io5'
import { FaXTwitter } from 'react-icons/fa6'
import {
    Heading,
    Button,
    Icon,
    Link,
    Box,
    SimpleGrid,
    useColorModeValue,
} from '@chakra-ui/react'
import UpToggle from './up-toggle'
import miscLang from '../pages/assets/misc.json'
import Content from './content'

const Footer = () => {
    return (
        <Box
            bg={useColorModeValue('whiteAlpha.600', 'whiteAlpha.100')}
            p={10}
            py={2}
            marginTop="auto"
        >
            <Heading as="h3" variant="section-title">
                {Content(miscLang, 'footer', 'connect')}
            </Heading>

            <Box display="flex" justifyContent="space-between">
                <SimpleGrid columns={[1, 2, 3, 6]}>
                    <Link href="https://github.com/AndreM222" target="_blank">
                        <Button
                            variant="ghost"
                            colorScheme="orange"
                            leftIcon={<Icon as={IoLogoGithub} />}
                        >
                            @andrem222
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

                    <Link href="https://x.com/AndreMossi" target="_blank">
                        <Button
                            variant="ghost"
                            colorScheme="orange"
                            leftIcon={<Icon as={FaXTwitter} />}
                        >
                            @AndreMossi
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
                </SimpleGrid>
                <UpToggle />
            </Box>
        </Box>
    )
}

export default Footer
