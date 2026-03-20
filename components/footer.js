import {
    IoLogoGithub,
    IoLogoReddit,
    IoLogoLinkedin,
    IoMail,
    IoCard
} from 'react-icons/io5'
import { FaXTwitter } from 'react-icons/fa6'
import { BiSolidNews } from 'react-icons/bi'
import { Heading, Button, Icon, Link, Box, SimpleGrid } from '@chakra-ui/react'
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
            <Button variant="ghost" colorPalette="orange" {...props}>
                {icon}
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
            colorPalette="orange"
            {...props}
        >
            {icon}
            {children}
        </QRCodeButton>
    )
}

const today = new Date()

const Footer = ({ ...props }) => {
    const [isOpen, setOpen] = useState(false)

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
        <Box bg="cardBase.bg" p={10} py={2} marginTop="auto" {...props}>
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
                        setOpen={setOpen}
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
                    position={isVisible ? 'static' : 'fixed'}
                    bottom={!isVisible ? 4 : 'auto'}
                    left={!isVisible ? 4 : 'auto'}
                    zIndex={isVisible ? 'auto' : 999}
                    bg="orange.fg"
                    _hover={{
                        transform: 'translateY(-10px)',
                        bg: 'orange.border'
                    }}
                    animation={
                        isVisible ? 'slideDown 0.3s ease' : 'slideUp 0.3s ease'
                    }
                    css={{
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isVisible
                            ? 'translateY(0) scale(1)'
                            : 'translateY(-20px) scale(0.95)',
                        opacity: isVisible ? 1 : 1
                    }}
                    p={3}
                >
                    <BiSolidNews />
                    {isVisible && Content(newsLang, 'news-ui', 'newsButton')}
                </NewsButton>
            </Box>

            <Box
                color={{ _light: 'blackAlpha.500', _dark: 'whiteAlpha.500' }}
                textAlign={{ base: 'center', sm: 'left' }}
            >
                &copy; <DateSetup date={`${today.getFullYear()}`} />{' '}
                {Content(miscLang, 'title', 'name')}
            </Box>
        </Box>
    )
}

export default Footer
