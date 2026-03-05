import {
    IoLogoGithub,
    IoLogoReddit,
    IoLogoLinkedin,
    IoMail,
    IoCard
} from 'react-icons/io5'
import { FaNewspaper, FaXTwitter } from 'react-icons/fa6'
import {
    Heading,
    Button,
    Icon,
    Link,
    Box,
    SimpleGrid,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react'
import UpToggle from './Buttons/up-toggle'
import Content from './content'
import DateSetup from './dateSetup'
import { QRCodeButton } from './QRCodeViwer'
import { NewsButton } from './newsModule'
import { useEffect, useRef, useState } from 'react'

import miscLang from '../locales/misc.json'
import newsLang from '../locales/pages/news.json'

const LinkButton = ({ target, href, icon, children, ...props }) => {
    return (
        <Link href={href} target={target}>
            <Button
                variant="ghost"
                colorScheme="orange"
                leftIcon={icon}
                {...props}
            >
                {children}
            </Button>
        </Link>
    )
}

const QRButton = ({ icon, children, ...props }) => {
    return (
        <QRCodeButton
            justifyContent="left"
            variant="ghost"
            colorScheme="orange"
            leftIcon={icon}
            {...props}
        >
            {children}
        </QRCodeButton>
    )
}

const today = new Date()

const Footer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isVisible, setIsVisible] = useState(true)
    const footerButtonRef = useRef(null)

    useEffect(() => {
        if (!footerButtonRef.current) return

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 } // triggers when at least 10% visible
        )

        observer.observe(footerButtonRef.current)

        return () => observer.disconnect()
    }, [])

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

                    <QRButton
                        onOpen={onOpen}
                        onClose={onClose}
                        isOpen={isOpen}
                        icon={<Icon as={IoCard} />}
                    >
                        {Content(miscLang, 'qrCodeBTN', 'content')}
                    </QRButton>
                </SimpleGrid>

                <UpToggle />
            </Box>
            <Box ref={footerButtonRef}>
                <NewsButton
                    my={2}
                    leftIcon={isVisible && <FaNewspaper />}
                    position={isVisible ? 'static' : 'fixed'}
                    bottom={!isVisible ? 4 : 'auto'}
                    left={!isVisible ? 4 : 'auto'}
                    zIndex={isVisible ? 'auto' : 999}
                    transform={isVisible ? 'none' : 'translateY(0)'}
                    animation={
                        isVisible ? 'slideDown 0.3s ease' : 'slideUp 0.3s ease'
                    }
                    sx={{
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isVisible
                            ? 'translateY(0) scale(1)'
                            : 'translateY(-20px) scale(0.95)',
                        opacity: isVisible ? 1 : 1,
                        boxShadow: isVisible
                            ? 'none'
                            : '0 10px 30px rgba(249, 115, 22, 0.4)'
                    }}
                >
                    {isVisible ? Content(newsLang, 'news-ui', 'newsButton') : <FaNewspaper />}
                </NewsButton>
            </Box>

            <Box
                color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
                textAlign={{ base: 'center', sm: 'left' }}
            >
                &copy; <DateSetup date={`${today.getFullYear()}`} />{' '}
                {Content(miscLang, 'title', 'name')}
            </Box>
        </Box>
    )
}

export default Footer
