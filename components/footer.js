import {
    IoLogoGithub,
    IoLogoReddit,
    IoLogoLinkedin,
    IoMail
} from 'react-icons/io5'
import { FaXTwitter } from 'react-icons/fa6'
import {
    Heading,
    Button,
    Icon,
    Link,
    Box,
    SimpleGrid,
    useColorModeValue
} from '@chakra-ui/react'
import UpToggle from './Buttons/up-toggle'
import miscLang from '../locales/misc.json'
import Content from './content'
import DateSetup from './dateSetup'

const LinkButton = ({ target, href, icon, children, ...props }) => {
    return (
        <Link href={href} target={target}>
            <Button variant="ghost" colorScheme="orange" leftIcon={icon} {...props}>
                {children}
            </Button>
        </Link>
    )
}

const today = new Date()

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
                    <LinkButton
                        href="https://github.com/AndreM222"
                        target="_blank"
                        icon={<Icon as={IoLogoGithub} />}
                    >
                        @andrem222
                    </LinkButton>

                    <LinkButton
                        href="https://www.reddit.com/user/Temix222"
                        target="_blank"
                        icon={<Icon as={IoLogoReddit} />}
                    >
                        @Temix222
                    </LinkButton>

                    <LinkButton
                        href="https://www.linkedin.com/in/andre-mossi-803765236/"
                        target="_blank"
                        icon={<Icon as={IoLogoLinkedin} />}
                    >
                        Andre Mossi
                    </LinkButton>

                    <LinkButton
                        href="https://x.com/AndreMossi"
                        target="_blank"
                        icon={<Icon as={FaXTwitter} />}
                    >
                        @AndreMossi
                    </LinkButton>

                    <LinkButton
                        href="mailto: mossiroberto0392@gmail.com"
                        target="_blank"
                        icon={<Icon as={IoMail} />}
                    >
                        Andre Mossi
                    </LinkButton>
                </SimpleGrid>
                <UpToggle />
            </Box>

            <Box
                color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
                textAlign={{base: 'center', sm: 'left'}}
            >
                &copy; <DateSetup date={`${today.getFullYear()}`} />{' '}
                {Content(miscLang, 'title', 'name')}
            </Box>
        </Box>
    )
}

export default Footer
