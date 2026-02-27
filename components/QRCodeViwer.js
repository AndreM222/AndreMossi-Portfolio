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

    const modalBorderColor = useColorModeValue(
        'blackAlpha.200',
        'whiteAlpha.200'
    )
    const dividerColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')

    const closeBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
    const closeHoverBg = useColorModeValue('blackAlpha.200', 'whiteAlpha.300')

    const rightGradient = useColorModeValue(
        'radial(circle at center, rgba(169,143,99,0.25), transparent 70%)',
        'radial(circle at center, rgba(169,143,99,0.15), transparent 70%)'
    )

    const [isFloating, setIsFloating] = useState(true)

    const lightupShadow = useColorModeValue(
        isFloating
            ? '0 0 10px 2px rgba(169,143,99,0.35)'
            : '0 0 40px 12px rgba(169,143,99,0.9)',
        isFloating
            ? '0 0 8px 2px rgba(169,143,99,0.15)'
            : '0 0 40px 12px rgba(169,143,99,0.7)'
    )

    const qrBg = useColorModeValue('whiteAlpha.800', 'whiteAlpha.50')

    useEffect(() => {
        if (isOpen) {
            setIsFloating(true)
        } else {
            setIsFloating(false)
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
                borderColor={modalBorderColor}
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
                                    boxShadow: lightupShadow
                                }}
                                transition={{
                                    backgroundPosition: {
                                        duration: 6,
                                        ease: 'linear',
                                        repeat: Infinity
                                    }
                                }}
                            />

                            <AvatarIcon />

                            <Heading mt={4} size="lg" letterSpacing="tight">
                                {Content(miscLang, 'title', 'name')}
                            </Heading>

                            <Box
                                mt={2}
                                fontSize={{ base: 'md', sm: 'lg' }}
                                opacity={0.8}
                            >
                                {Content(indexLang, 'card', 'work')}
                            </Box>

                            <Box fontSize="sm" opacity={0.6}>
                                {Content(indexLang, 'card', 'type')}
                            </Box>

                            <Box mt={6} fontSize="sm" opacity={0.75}>
                                <Box letterSpacing="wide">
                                    andremossi.vercel.app
                                </Box>

                                <Box
                                    mt={1}
                                    mb={2}
                                    h="1px"
                                    bg={dividerColor}
                                    w="40%"
                                />

                                <Flex direction="column">
                                    <Box
                                        as="a"
                                        href="mailto:mossiroberto0392@gmail.com"
                                    >
                                        mossiroberto0392@gmail.com
                                    </Box>

                                    <Box
                                        as="a"
                                        href="tel:+18147901591"
                                        opacity={0.7}
                                    >
                                        +1 (814) 790-1591
                                    </Box>
                                </Flex>
                            </Box>
                        </Box>

                        <Flex
                            flex="1"
                            align="center"
                            justify="center"
                            p={12}
                            bgGradient={rightGradient}
                        >
                            <motion.div
                                onClick={() => setIsFloating(prev => !prev)}
                                animate={
                                    isFloating ? { y: [0, -8, 0] } : { y: 0 }
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
                                    bg={qrBg}
                                    boxShadow={lightupShadow}
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
                    bg={closeBg}
                    _hover={{
                        bg: closeHoverBg,
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
