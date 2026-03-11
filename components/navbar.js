import Logo from './logo'
import NextLink from 'next/link'
import { forwardRef } from 'react'
import LanguageButton from './Buttons/language-switch-button'
import {
    Container,
    Box,
    Link,
    Stack,
    Heading,
    Flex,
    Menu,
    IconButton
} from '@chakra-ui/react'
import { IoMenu } from 'react-icons/io5'
import ThemeToggleButton from './Buttons/theme-toggle-button'
import miscLang from '../locales/misc.json'
import Content from './content'
import { MdDocumentScanner } from 'react-icons/md'
import { PdfPreviewButton, PdfPreviewMenuItem } from './pdfViewer'
import { IoIosApps } from 'react-icons/io'
import { HiBriefcase } from 'react-icons/hi2'
import { FaUser } from 'react-icons/fa6'

const LinkItem = ({ href, path, children, target, ...props }) => {
    const active = path === href
    const inactiveColor = { _light: 'gray.800', _dark: 'whiteAlpha.900' }
    const activeColor = { _light: '#ff79c6', _dark: '#bd93f9' }
    return (
        <Link
            asChild
            href={href}
            p={2}
            outline="none"
            color={active ? activeColor : inactiveColor}
            target={target}
            {...props}
        >
            <NextLink>{children}</NextLink>
        </Link>
    )
}

const MenuLink = forwardRef((props, ref) => (
    <Link ref={ref} as={NextLink} {...props} justifyContent="space-between" />
))

const Navbar = props => {
    const { path } = props

    return (
        <Box
            position="fixed"
            w="100%"
            bg={{ _light: 'grayAlpha.600', _dark: 'grayAlpha.900' }}
            css={{ backdropFilter: 'blur(10px)' }}
            zIndex={10}
            {...props}
        >
            <Container
                display="flex"
                p={2}
                maxW="95%"
                wrap="wrap"
                objectPosition="center"
                justifyContent="space-between"
                alignItems="center"
            >
                <Flex mr={5}>
                    <Heading size="xl" letterSpacing={'tighter'}>
                        <Logo />
                    </Heading>
                </Flex>

                <Box display={{ md: 'flex' }}>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        display={{ base: 'none', md: 'flex' }}
                        width={{ base: 'full', md: 'auto' }}
                        alignItems="center"
                        flexGrow={1}
                        mt={{ base: 4, md: 0 }}
                        justifyContent="right"
                    >
                        <LinkItem href="/" path={path}>
                            {Content(miscLang, 'category', 'about')}
                        </LinkItem>

                        <LinkItem href="/experience" path={path}>
                            {Content(miscLang, 'category', 'experience')}
                        </LinkItem>
                        <LinkItem href="/other" path={path}>
                            {Content(miscLang, 'category', 'others')}
                        </LinkItem>
                    </Stack>

                    <Box
                        display={{
                            base: 'none',
                            md: 'flex'
                        }}
                    >
                        <PdfPreviewButton
                            title={Content(miscLang, 'category', 'resume')}
                            src={Content(miscLang, 'category', 'link-resume')}
                            bg="cyan.border"
                            _hover={{
                                bg: 'cyan.focusRing'
                            }}
                            color="black"
                            fontWeight="bold"
                            objectPosition="right"
                            alignItems="center"
                        >
                            {Content(miscLang, 'category', 'resume')}
                            <MdDocumentScanner />
                        </PdfPreviewButton>
                    </Box>
                    <Box pl={2} objectPosition="right" alignSelf="center">
                        <LanguageButton path={path} />
                        <ThemeToggleButton />
                        <Box
                            ml={2}
                            display={{ base: 'inline-block', md: 'none' }}
                        >
                            <Menu.Root>
                                <Menu.Trigger asChild>
                                    <IconButton
                                        variant="outline"
                                        aria-label="Options"
                                    >
                                        <IoMenu />
                                    </IconButton>
                                </Menu.Trigger>

                                <Menu.Positioner>
                                    <Menu.Content minW={200}>
                                        <Menu.Item asChild>
                                            <MenuLink href="/">
                                                {Content(
                                                    miscLang,
                                                    'category',
                                                    'about'
                                                )}
                                                <FaUser />
                                            </MenuLink>
                                        </Menu.Item>

                                        <Menu.Item asChild>
                                            <MenuLink href="/experience">
                                                {Content(
                                                    miscLang,
                                                    'category',
                                                    'experience'
                                                )}
                                                <HiBriefcase />
                                            </MenuLink>
                                        </Menu.Item>

                                        <Menu.Item asChild>
                                            <MenuLink href="/other">
                                                {Content(
                                                    miscLang,
                                                    'category',
                                                    'others'
                                                )}
                                                <IoIosApps />
                                            </MenuLink>
                                        </Menu.Item>

                                        <PdfPreviewMenuItem
                                            justifyContent="space-between"
                                            title={Content(
                                                miscLang,
                                                'category',
                                                'resume'
                                            )}
                                            src={Content(
                                                miscLang,
                                                'category',
                                                'link-resume'
                                            )}
                                        >
                                            {Content(
                                                miscLang,
                                                'category',
                                                'resume'
                                            )}
                                            <MdDocumentScanner />
                                        </PdfPreviewMenuItem>
                                    </Menu.Content>
                                </Menu.Positioner>
                            </Menu.Root>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Navbar
