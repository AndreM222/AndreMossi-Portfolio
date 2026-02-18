import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    Button,
    useDisclosure,
    useColorModeValue,
    MenuItem
} from '@chakra-ui/react'
import { useState } from 'react'

export const PdfPreviewModal = ({ isOpen, onClose, title, src }) => {
    const [loaded, setLoaded] = useState(false)

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
                h="90vh"
                bg={useColorModeValue('#f4f0fc', '#1C1C20')}
                borderRadius="xl"
                border="1px solid"
                borderColor="whiteAlpha.200"
            >
                <ModalHeader>{title}</ModalHeader>

                <ModalCloseButton />

                <ModalBody p={0}>
                    <iframe
                        src={src}
                        width="100%"
                        height="100%"
                        style={{ border: 'none', opacity: loaded ? 1 : 0 }}
                        onLoad={() => setLoaded(true)}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

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
