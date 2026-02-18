import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    Button,
    Flex,
    Spinner,
    Text,
    useColorModeValue,
    useBreakpointValue,
    Box,
    useDisclosure,
    MenuItem
} from '@chakra-ui/react'
import { useState } from 'react'
import { ExternalLinkIcon, DownloadIcon } from '@chakra-ui/icons'
import Content from './content'

import miscLang from '../locales/misc.json'

export const PdfPreviewModal = ({ isOpen, onClose, title, src }) => {
    const [loaded, setLoaded] = useState(false)
    const isMobile = useBreakpointValue({ base: true, md: false })

    const bgColor = useColorModeValue('#f4f0fc', '#1C1C20')

    return (
        <Modal
            size="6xl"
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            motionPreset="scale"
        >
            <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(6px)" />

            <ModalContent
                h={{ base: 'auto', md: '90vh' }}
                bg={bgColor}
                borderRadius="xl"
                border="1px solid"
                borderColor="whiteAlpha.200"
                boxShadow="0 20px 60px rgba(0,0,0,0.5)"
            >
                <ModalHeader
                    pr={{sm: "60px", base: "0"}}
                    pb={2}
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.200"
                >
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        align={{ base: 'center', md: 'center' }}
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
                                leftIcon={<ExternalLinkIcon />}
                                onClick={() => window.open(src, '_blank')}
                            >
                                {Content(miscLang, 'viewPDFBTN', 'content')}
                            </Button>

                            <Button
                                size="sm"
                                leftIcon={<DownloadIcon />}
                                as="a"
                                href={src}
                                download
                            >
                                {Content(miscLang, 'downloadBTN', 'content')}
                            </Button>
                        </Flex>
                    </Flex>
                </ModalHeader>

                <ModalCloseButton />

                <ModalBody p={0}>
                    {isMobile ? (
                        <MobileFallback src={src} />
                    ) : (
                        <DesktopPreview
                            src={src}
                            loaded={loaded}
                            setLoaded={setLoaded}
                        />
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

const DesktopPreview = ({ src, loaded, setLoaded }) => (
    <Box position="relative" h="100%">
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
            src={src}
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

const MobileFallback = ({ src }) => (
    <Flex
        direction="column"
        align="center"
        justify="center"
        p={8}
        textAlign="center"
        gap={4}
    >
        <Text fontSize="lg" fontWeight="semibold">
            Preview is limited on mobile
        </Text>

        <Button colorScheme="cyan" onClick={() => window.open(src, '_blank')}>
            {Content(miscLang, 'viewPDFBTN', 'content')}
        </Button>
    </Flex>
)

export const PdfPreviewButton = ({ title, src, children, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen} {...props}>
                {children}
            </Button>

            <PdfPreviewModal
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                src={src}
            />
        </>
    )
}

export const PdfPreviewMenuItem = ({ title, src, children, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <MenuItem onClick={onOpen} {...props}>
                {children}
            </MenuItem>

            <PdfPreviewModal
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                src={src}
            />
        </>
    )
}
