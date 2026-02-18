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
    MenuItem,
    MenuList,
    MenuButton,
    IconButton,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './Buttons/theme-toggle-button'
import miscLang from '../locales/misc.json'
import Content from './content'
import { MdDocumentScanner } from 'react-icons/md'
import { PdfPreviewButton, PdfPreviewMenuItem } from './pdfViewer'

const LinkItem = ({ href, path, children, target, ...props }) => {
    const active = path === href
    const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')
    const activeColor = useColorModeValue('#ff79c6', '#bd93f9')
    return (
        <Link
            as={NextLink}
            href={href}
            p={2}
            color={active ? activeColor : inactiveColor}
            target={target}
            {...props}
        >
            {children}
        </Link>
    )
}

const MenuLink = forwardRef((props, ref) => (
    <Link ref={ref} as={NextLink} {...props} />
))

const Navbar = props => {
    const { path } = props

    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            bg={useColorModeValue('grayAlpha.600', 'grayAlpha.900')}
            css={{ backdropFilter: 'blur(10px)' }}
            zIndex={10}
            {...props}
        >
            <Container
                display="flex"
                p={2}
                maxW="95%"
                wrap="wrap"
                align="center"
                justify="space-between"
            >
                <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                        <Logo />
                    </Heading>
                </Flex>

                <Box flex={1} display={{ md: 'flex' }}>
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

                    <PdfPreviewButton
                        title={Content(miscLang, 'category', 'resume')}
                        src={Content(miscLang, 'category', 'link-resume')}
                        colorScheme="cyan"
                        rightIcon={<MdDocumentScanner />}
                        align="right"
                        alignItems="center"
                        display={{
                            base: 'none',
                            md: 'flex'
                        }}
                    >
                        {Content(miscLang, 'category', 'resume')}
                    </PdfPreviewButton>
                    <Box pl={2} align="right">
                        <LanguageButton path={path} />
                        <ThemeToggleButton />
                        <Box
                            ml={2}
                            display={{ base: 'inline-block', md: 'none' }}
                        >
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    icon={<HamburgerIcon />}
                                    variant="outline"
                                    aria-label="Options"
                                />
                                <MenuList>
                                    <MenuItem as={MenuLink} href="/">
                                        {Content(miscLang, 'category', 'about')}
                                    </MenuItem>
                                    <MenuItem as={MenuLink} href="/experience">
                                        {Content(
                                            miscLang,
                                            'category',
                                            'experience'
                                        )}
                                    </MenuItem>
                                    <MenuItem as={MenuLink} href="/other">
                                        {Content(
                                            miscLang,
                                            'category',
                                            'others'
                                        )}
                                    </MenuItem>

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
                                </MenuList>
                            </Menu>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Navbar
