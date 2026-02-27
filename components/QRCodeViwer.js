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
import { useEffect, useState } from 'react'

const MotionBox = motion(Box)

export const QRCodeModal = ({ isOpen, onClose }) => {
    const bgColor = useColorModeValue('#f4f0fc', '#1C1C20')
    const [isFloating, setIsFloating] = useState(true)

    useEffect(() => {
        if (isOpen) {
            setIsFloating(true)
        }
    }, [isOpen])

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
                            <MotionBox
                                position="absolute"
                                left="0"
                                top="20%"
                                bottom="20%"
                                width="4px"
                                borderRadius="full"
                                background="linear-gradient(180deg, transparent, #a98f63, transparent)"
                                backgroundSize="100% 200%"
                                initial={false}
                                animate={{
                                    backgroundPosition: ['0% 0%', '0% 200%'],
                                    boxShadow: isFloating
                                        ? '0 0 8px 2px rgba(169,143,99,0.15)'
                                        : '0 0 40px 12px rgba(169,143,99,0.7)'
                                }}
                                transition={{
                                    backgroundPosition: {
                                        duration: 6,
                                        ease: 'linear',
                                        repeat: Infinity
                                    },
                                    boxShadow: {
                                        duration: 0.6,
                                        ease: 'easeInOut'
                                    }
                                }}
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
                            <motion.div
                                onClick={() => setIsFloating(prev => !prev)}
                                animate={
                                    isFloating ? { y: [0, -8, 0] } : { y: 0 } // no forced snap because animation will complete cycle
                                }
                                transition={
                                    isFloating
                                        ? {
                                            repeat: Infinity,
                                            duration: 4,
                                            ease: 'easeInOut'
                                        }
                                        : {
                                            duration: 0.4,
                                            ease: 'easeOut'
                                        }
                                }
                                style={{ cursor: 'pointer' }}
                            >
                                <Box
                                    p={8}
                                    borderRadius="2xl"
                                    backdropFilter="blur(10px)"
                                    bg="whiteAlpha.50"
                                    boxShadow={
                                        isFloating
                                            ? '0 0 40px rgba(169,143,99,0.25)'
                                            : '0 0 80px rgba(169,143,99,0.6)'
                                    }
                                    transition="all 0.6s ease-in-out"
                                    _hover={{
                                        '@media (hover: hover)': {
                                            transform: 'scale(1.05)',
                                            boxShadow:
                                                '0 0 100px rgba(169,143,99,0.7)'
                                        }
                                    }}
                                >
                                    <QRCodeCanvas
                                        value="https://andremossi.vercel.app"
                                        size={220}
                                        bgColor="transparent"
                                        fgColor="#a98f63"
                                        level="H"
                                    />
                                </Box>
                            </motion.div>
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

export const QRCodeButton = ({ children, ...props }) => {
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
