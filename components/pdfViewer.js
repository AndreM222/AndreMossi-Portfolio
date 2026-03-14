import {
    Dialog,
    Button,
    Flex,
    Spinner,
    Text,
    useBreakpointValue,
    Box,
    Separator,
    Icon,
    Portal
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FiDownload, FiExternalLink } from 'react-icons/fi'
import { RiLock2Fill } from 'react-icons/ri'
import Content from './content'

import miscLang from '../locales/misc.json'
import { DialogCloseFlip, DialogContentFlip } from './layouts/dialogBody'

export const PdfPreviewModal = ({ title, src, setOpen }) => {
    const [loaded, setLoaded] = useState(false)
    const isMobile = useBreakpointValue({ base: true, md: false })
    const typeArray = Array.isArray(src)
    const [currPDF, setPDF] = useState(typeArray ? src[0].src : src)

    useEffect(() => {
        setLoaded(false)
        setPDF(typeArray ? src[0].src : src)
    }, [src, typeArray])

    return (
        <Dialog.Positioner>
            <Dialog.Backdrop bg="blackAlpha.700" backdropFilter="blur(6px)" />
            <DialogContentFlip
                setFlippedX={() => setOpen(false)}
                setFlippedY={() => setOpen(false)}
                display="flex"
                flexDirection="column"
                h={{ base: '85vh', md: '90vh' }}
                boxShadow="0 20px 60px rgba(0,0,0,0.5)"
            >
                <Dialog.Header
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.200"
                    flexDirection="column"
                >
                    <Flex
                        m={2}
                        mr={{ md: '50px', base: '2' }}
                        flexDirection={{ base: 'column', md: 'row' }}
                        align="center"
                        justify={{ base: 'center', md: 'space-between' }}
                        gap={3}
                    >
                        <Text
                            fontWeight="bold"
                            textAlign={{ base: 'center', md: 'left' }}
                        >
                            {title}
                        </Text>

                        <Flex
                            gap={2}
                            justify={{ base: 'center', md: 'flex-end' }}
                            width={{ base: '100%', md: 'auto' }}
                            flexWrap="wrap"
                        >
                            <Button
                                size="sm"
                                onClick={() => window.open(currPDF, '_blank')}
                            >
                                <FiExternalLink />
                                {Content(miscLang, 'viewPDFBTN', 'content')}
                            </Button>

                            <Button size="sm" as="a" href={currPDF} download>
                                <FiDownload />
                                {Content(miscLang, 'downloadBTN', 'content')}
                            </Button>
                        </Flex>
                    </Flex>
                    <Box display={!typeArray && 'none'}>
                        <Separator />
                        <Flex
                            gap={2}
                            mt={2}
                            direction={{ base: 'column', sm: 'row' }}
                            alignItems="center"
                        >
                            {typeArray &&
                                src.map(currPDFInfo => (
                                    <Button
                                        disabled={currPDF === currPDFInfo.src}
                                        key={currPDFInfo.name}
                                        size="sm"
                                        flex={1}
                                        minW="0"
                                        w="full"
                                        onClick={() => {
                                            setLoaded(false)
                                            setPDF(currPDFInfo.src)
                                        }}
                                    >
                                        {currPDFInfo.name}
                                    </Button>
                                ))}
                        </Flex>
                    </Box>
                </Dialog.Header>

                <DialogCloseFlip position="static" top="0" right="0" />

                <Dialog.Body p={0} flex="1" overflow="hidden" display="flex">
                    {isMobile ? (
                        <MobileFallback
                            src={currPDF}
                            loaded={loaded}
                            setLoaded={setLoaded}
                        />
                    ) : (
                        <DesktopPreview
                            src={currPDF}
                            loaded={loaded}
                            setLoaded={setLoaded}
                        />
                    )}
                </Dialog.Body>
            </DialogContentFlip>
        </Dialog.Positioner>
    )
}

const DesktopPreview = ({ src, loaded, setLoaded }) => (
    <Box position="relative" h="100%" w="100%">
        {!loaded && (
            <Flex
                position="absolute"
                w="100%"
                h="100%"
                align="center"
                justify="center"
            >
                <Spinner size="xl" />
            </Flex>
        )}

        <iframe
            src={`${src}#toolbar=0&navpanes=0&scrollbar=0`}
            width="100%"
            height="100%"
            style={{
                border: 'none',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.3s'
            }}
            onLoad={() => setLoaded(true)}
        />
    </Box>
)

const MobileFallback = ({ src, loaded, setLoaded }) => (
    <Flex
        position="relative"
        direction="column"
        display="flex"
        align="center"
        w="100%"
        justify="center"
        h="100%"
        overflow="hidden"
    >
        <iframe
            src={`${src}#toolbar=0&navpanes=0&scrollbar=0&page=1`}
            width="100%"
            height="100%"
            style={{
                border: 'none',
                filter: 'blur(4px) brightness(0.75)',
                pointerEvents: 'none',
                transform: 'scale(1.05)',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.4s ease'
            }}
            onLoad={() => setLoaded(true)}
        />

        <Box
            position="absolute"
            inset="0"
            backdropFilter="blur(2px)"
            background="rgba(0, 0, 0, 0.35)"
        />

        <Flex
            position="absolute"
            direction="column"
            align="center"
            gap={4}
            textAlign="center"
            px={6}
            opacity={loaded ? 1 : 0}
            transition="opacity 0.4s ease"
        >
            <Icon as={RiLock2Fill} boxSize={8} color="whiteAlpha.900" />

            <Text fontSize="lg" fontWeight="semibold" color="white">
                {Content(miscLang, 'previewPhoneWarn', 'content')}
            </Text>

            <Button
                bg={{ _light: 'cyan.400', _dark: 'cyan.200' }}
                color="black"
                borderRadius="full"
                px={8}
                onClick={() => window.open(src, '_blank')}
            >
                {Content(miscLang, 'viewPDFBTN', 'content')}
            </Button>
        </Flex>
    </Flex>
)

export const PdfPreviewButton = ({ title, src, children, ...props }) => {
    const [isOpen, setOpen] = useState()
    return (
        <Dialog.Root
            size="xl"
            placement="center"
            open={isOpen}
            onOpenChange={e => setOpen(e.open)}
            motionPreset="scale"
            preventScroll
        >
            <Dialog.Trigger asChild>
                <Button
                    w="full"
                    bg="orange.fg"
                    _hover={{
                        bg: 'orange.border'
                    }}
                    {...props}
                >
                    {children}
                </Button>
            </Dialog.Trigger>

            <Portal>
                <PdfPreviewModal title={title} src={src} setOpen={setOpen} />
            </Portal>
        </Dialog.Root>
    )
}

export const PdfPreviewMenuItem = ({ title, src, children, ...props }) => {
    const [isOpen, setOpen] = useState()
    return (
        <Dialog.Root
            size="xl"
            placement="center"
            open={isOpen}
            onOpenChange={e => setOpen(e.open)}
            motionPreset="scale"
            preventScroll
        >
            <Dialog.Trigger asChild>
                <Button
                    {...props}
                    variant="outline"
                    w="100%"
                    textDecoration="none"
                    justifyContent="space-between"
                    pl={2}
                    pr={1}
                    border="none"
                    _hover={{
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        textDecorationColor: 'currentColor/20',
                        bg: 'menuBg'
                    }}
                >
                    {children}
                </Button>
            </Dialog.Trigger>
            <Portal>
                <PdfPreviewModal title={title} src={src} setOpen={setOpen} />
            </Portal>
        </Dialog.Root>
    )
}
