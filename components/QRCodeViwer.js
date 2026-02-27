import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
    useColorModeValue,
    useDisclosure,
    Heading,
    Flex,
    Box,
    ModalCloseButton
} from '@chakra-ui/react'
import { QRCodeCanvas } from 'qrcode.react'
import { motion } from 'framer-motion'

import miscLang from '../locales/misc.json'
import indexLang from '../locales/pages/index.json'
import AvatarIcon from './avatarIcon'
import Content from './content'

export const QRCodeModal = ({ isOpen, onClose }) => {
    const bgColor = useColorModeValue('#f4f0fc', '#1C1C20')

    return (
        <Modal
            size="4xl"
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            motionPreset="scale"
            blockScrollOnMount
        >
            <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(6px)" />

            <ModalContent
                bg={bgColor}
                borderRadius="2xl"
                border="1px solid"
                borderColor="whiteAlpha.200"
            >
                <ModalBody p={0}>
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        minH="400px"
                    >
                        <Box
                            flex="1"
                            p={12}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            position="relative"
                        >
                            <Box
                                position="absolute"
                                left="0"
                                top="20%"
                                bottom="20%"
                                width="4px"
                                bgGradient="linear(to-b, #a98f63, transparent)"
                                borderRadius="full"
                            />

                            <AvatarIcon />

                            <Heading mt={4} size="lg" letterSpacing="tight">
                                {Content(miscLang, 'title', 'name')}
                            </Heading>

                            <Box mt={2} fontSize="lg" opacity={0.8}>
                                {Content(indexLang, 'card', 'work')}
                            </Box>

                            <Box fontSize="sm" opacity={0.6}>
                                {Content(indexLang, 'card', 'type')}
                            </Box>

                            <Box mt={6} fontSize="sm" opacity={0.5}>
                                andremossi.vercel.app
                            </Box>
                        </Box>

                        <Flex
                            flex="1"
                            align="center"
                            justify="center"
                            p={12}
                            bgGradient="radial(circle at center, rgba(169,143,99,0.15), transparent 70%)"
                        >
                            <Box
                                p={8}
                                borderRadius="2xl"
                                backdropFilter="blur(10px)"
                                bg="whiteAlpha.50"
                                boxShadow="0 0 40px rgba(169,143,99,0.25)"
                                transition="all 0.3s ease"
                                _hover={{
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 0 60px rgba(169,143,99,0.5)'
                                }}
                            >
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 4
                                    }}
                                >
                                    <QRCodeCanvas
                                        value="https://andremossi.vercel.app"
                                        size={220}
                                        bgColor="transparent"
                                        fgColor="#a98f63"
                                        level="H"
                                    />
                                </motion.div>
                            </Box>
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalCloseButton
                    top="16px"
                    right="16px"
                    borderRadius="full"
                    backdropFilter="blur(6px)"
                    bg="whiteAlpha.100"
                    _hover={{
                        bg: 'whiteAlpha.300',
                        color: '#a98f63'
                    }}
                />
            </ModalContent>
        </Modal>
    )
}

export const QRCodeButton = ({ title, src, children, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen} {...props}>
                {children}
            </Button>

            <QRCodeModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}
