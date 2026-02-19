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
    MenuItem,
    Divider,
    Icon
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ExternalLinkIcon, DownloadIcon, LockIcon } from '@chakra-ui/icons'
import { IoDocumentText } from 'react-icons/io5'
import Content from './content'

import miscLang from '../locales/misc.json'

export const PdfPreviewModal = ({ isOpen, onClose, title, src }) => {
    const [loaded, setLoaded] = useState(false)
    const isMobile = useBreakpointValue({ base: true, md: false })
    const typeArray = Array.isArray(src)
    const [currPDF, setPDF] = useState(typeArray ? src[0].src : src)

    useEffect(() => {
        setLoaded(false)
        setPDF(typeArray ? src[0].src : src)
    }, [src, typeArray])

    const bgColor = useColorModeValue('#f4f0fc', '#1C1C20')

    return (
        <Modal
            size="6xl"
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            motionPreset="scale"
            blockScrollOnMount
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
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.200"
                >
                    <Flex
                        m={2}
                        mr={{ md: '50px', base: '2' }}
                        direction={{ base: 'column', md: 'row' }}
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
                                leftIcon={<ExternalLinkIcon />}
                                onClick={() => window.open(currPDF, '_blank')}
                            >
                                {Content(miscLang, 'viewPDFBTN', 'content')}
                            </Button>

                            <Button
                                size="sm"
                                leftIcon={<DownloadIcon />}
                                as="a"
                                href={currPDF}
                                download
                            >
                                {Content(miscLang, 'downloadBTN', 'content')}
                            </Button>
                        </Flex>
                    </Flex>
                    <Box display={typeArray ? '' : 'none'}>
                        <Divider />
                        <Flex
                            gap={2}
                            mt={2}
                            direction={{ base: 'column', sm: 'row' }}
                            align="center"
                        >
                            {typeArray ? (
                                src.map(currPDFInfo => (
                                    <Button
                                        disabled={currPDF === currPDFInfo.src}
                                        key={currPDFInfo.name}
                                        size="sm"
                                        w="full"
                                        leftIcon={<IoDocumentText />}
                                        onClick={() => {
                                            setLoaded(false)
                                            setPDF(currPDFInfo.src)
                                        }}
                                    >
                                        {currPDFInfo.name}
                                    </Button>
                                ))
                            ) : (
                                <div />
                            )}
                        </Flex>
                    </Box>
                </ModalHeader>

                <ModalCloseButton top="8px" right="16px" zIndex="10" />

                <ModalBody p={0}>
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
        align="center"
        justify="center"
        height="75vh"
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
            <Icon as={LockIcon} boxSize={8} color="whiteAlpha.900" />

            <Text fontSize="lg" fontWeight="semibold" color="white">
                {Content(miscLang, 'previewPhoneWarn', 'content')}
            </Text>

            <Button
                colorScheme="cyan"
                size="md"
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
