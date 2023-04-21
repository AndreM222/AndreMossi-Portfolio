import Logo from './logo'
import NextLink from 'next/link'
import { forwardRef } from 'react'
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
    Button,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { MdDocumentScanner } from 'react-icons/md'
import ThemeToggleButton from './theme-toggle-button'

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

const Navbar = (props) => {
    const { path } = props

    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            bg={useColorModeValue('#ffffff40', '#32324780')}
            style={{ backdropFilter: 'blur(10px)' }}
            zIndex={1}
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
                            About
                        </LinkItem>

                        <LinkItem href="/practice" path={path}>
                            Practice
                        </LinkItem>
                        <LinkItem href="/other" path={path}>
                            Others
                        </LinkItem>
                    </Stack>

                    <Link
                        style={{ textDecoration: 'none' }}
                        target="_blank"
                        href="AndreCV.pdf"
                        >
                        <Button
                            colorScheme="cyan"
                            align="right"
                            display="flex"
                            alignItems="center"
                            rightIcon={<MdDocumentScanner />}
                        >
                            Curriculum
                        </Button>

                    </Link>
                    <Box pl={2} align="right">
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
                                        About
                                    </MenuItem>
                                    <MenuItem as={MenuLink} href="/practice">
                                        Practice
                                    </MenuItem>
                                    <MenuItem as={MenuLink} href="/other">
                                        Others
                                    </MenuItem>
                                    <MenuItem
                                        as={MenuLink}
                                        href="AndreCV.pdf"
                                        target="_blank"
                                    >
                                        Curriculum
                                    </MenuItem>
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
