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
import { IoIosShare } from 'react-icons/io'
import Content from './content'
import { useEffect, useState } from 'react'

const MotionBox = motion(Box)
const url = 'https://andremossi.vercel.app'

const useShareUrl = () => {
    const canShare = typeof navigator !== 'undefined' && navigator.share

    const share = async () => {
        if (canShare) {
            try {
                await navigator.share({
                    title: 'Andre Mossi · Portfolio',
                    url
                })
            } catch (err) { }
        }
    }

    return { share, canShare }
}

export const FrontCard = ({ isOpen }) => {
    const { share: shareUrl, canShare } = useShareUrl()
    const [isFloating, setIsFloating] = useState(true)

    const dividerColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')

    const rightGradient = useColorModeValue(
        {
            base: 'radial(circle at center, rgba(169,143,99,0.25), transparent 70%)',
            xs: 'radial(circle at center, rgba(169,143,99,0.25), transparent 50%)',
            md: 'radial(circle at center, rgba(169,143,99,0.25), transparent 70%)'
        },
        {
            base: 'radial(circle at center, rgba(169,143,99,0.15), transparent 70%)',
            xs: 'radial(circle at center, rgba(169,143,99,0.15), transparent 50%)',
            md: 'radial(circle at center, rgba(169,143,99,0.15), transparent 70%)'
        }
    )

    const lightupShadow = useColorModeValue(
        isFloating
            ? '0 0 10px 2px rgba(169,143,99,0.35)'
            : '0 0 40px 12px rgba(169,143,99,0.9)',
        isFloating
            ? '0 0 8px 2px rgba(169,143,99,0.15)'
            : '0 0 40px 12px rgba(169,143,99,0.7)'
    )

    const qrShadow = useColorModeValue(
        isFloating
            ? '0 0 16px 4px rgba(169,143,99,0.5)'
            : '0 0 32px 8px rgba(169,143,99,0.7)',
        isFloating
            ? '0 0 12px 3px rgba(169,143,99,0.4)'
            : '0 0 24px 7px rgba(169,143,99,0.6)'
    )

    useEffect(() => {
        if (isOpen) setIsFloating(true)
    }, [isOpen])

    const qrBg = useColorModeValue('whiteAlpha.800', 'whiteAlpha.50')

    return (
        <Flex direction={{ base: 'column', md: 'row' }} height="100%">
            <Box
                flex="1"
                px={{ base: 6, md: 12 }}
                py={{ base: 8, md: 12 }}
                display="flex"
                flexDirection="column"
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

                <Box mt={2} fontSize="lg" opacity={0.8}>
                    {Content(indexLang, 'card', 'work')}
                </Box>

                <Box fontSize="sm" opacity={0.6}>
                    {Content(indexLang, 'card', 'type')}
                </Box>

                <Box mt={6} fontSize="sm" opacity={0.75}>
                    <Box
                        mt={6}
                        fontSize="sm"
                        opacity={0.75}
                        display="flex"
                        alignItems="center"
                        gap={2}
                    >
                        <Box letterSpacing="wide">andremossi.vercel.app</Box>

                        {canShare && (
                            <Button
                                size="xs"
                                variant="ghost"
                                colorScheme="orange"
                                borderRadius="full"
                                onClick={() => shareUrl()}
                                aria-label="Share this card"
                            >
                                <IoIosShare />
                            </Button>
                        )}
                    </Box>

                    <Box mt={1} mb={2} h="1px" bg={dividerColor} w="40%" />

                    <Flex direction={'column'}>
                        <Box as="a" href="mailto:mossiroberto0392@gmail.com">
                            mossiroberto0392@gmail.com
                        </Box>

                        <Box as="a" href="tel:+18147901591" opacity={0.7}>
                            +1 (814) 790-1591
                        </Box>
                    </Flex>
                </Box>
            </Box>

            <Flex
                flex="1"
                align="center"
                justify="center"
                p={{ base: 6, lg: 12 }}
                bgGradient={rightGradient}
            >
                <motion.div
                    onClick={() => setIsFloating(prev => !prev)}
                    animate={isFloating ? { y: [0, -8, 0] } : { y: 0 }}
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
                        boxShadow={qrShadow}
                        transition="all 0.6s ease-in-out"
                        _hover={{
                            '@media (hover: hover)': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 0 100px rgba(169,143,99,0.7)'
                            }
                        }}
                    >
                        <QRCodeCanvas
                            value={url}
                            size={220}
                            bgColor="transparent"
                            fgColor="#a98f63"
                            level="H"
                        />
                    </Box>
                </motion.div>
            </Flex>
        </Flex>
    )
}

export const BackCard = () => {
    const lightupShadow = useColorModeValue(
        '0 0 40px 12px rgba(169,143,99,0.9)',
        '0 0 40px 12px rgba(169,143,99,0.7)'
    )

    const name = Content(miscLang, 'title', 'name')
    const nameLetters = name.split('')

    const abilities = Content(indexLang, 'card', 'work')
    const abilitiesLetters = abilities.split('')

    const profession = Content(indexLang, 'card', 'type')
    const professionLetters = profession.split('')

    return (
        <Flex direction={{ base: 'column', md: 'row' }} height="100%">
            <Box
                flex="1"
                px={{ base: 6, md: 12 }}
                py={{ base: 8, md: 12 }}
                display="flex"
                flexDirection="column"
                position="relative"
            >
                <MotionBox
                    position="absolute"
                    right="0"
                    top="20%"
                    bottom="20%"
                    width="4px"
                    borderRadius="full"
                    background="linear-gradient(180deg, transparent, #a98f63, transparent)"
                    backgroundSize="100% 200%"
                    animate={{
                        backgroundPosition: ['0% 0%', '0% 200%'],
                        boxShadow: [
                            '0 0 12px 2px rgba(169,143,99,0.3)',
                            lightupShadow,
                            '0 0 12px 2px rgba(169,143,99,0.3)'
                        ]
                    }}
                    transition={{
                        backgroundPosition: {
                            duration: 6,
                            ease: 'linear',
                            repeat: Infinity
                        },
                        boxShadow: {
                            duration: 3,
                            ease: 'easeInOut',
                            repeat: Infinity
                        }
                    }}
                />
                <Flex
                    flex={1}
                    flexDirection="column"
                    align="center"
                    justify={{ base: 'space-between', md: 'center' }}
                    p={{ base: 6, md: 12 }}
                    width="full"
                    minW="40px"
                >
                    <Flex
                        direction="row"
                        align="flex-start"
                        justify="center"
                        gap={4}
                    >
                        <motion.div
                            animate={{
                                textShadow: [
                                    '0 0 6px rgba(169,143,99,0.4)',
                                    '0 0 20px rgba(169,143,99,0.8)',
                                    '0 0 6px rgba(169,143,99,0.4)'
                                ]
                            }}
                            transition={{
                                duration: 3,
                                ease: 'easeInOut',
                                repeat: Infinity
                            }}
                        >
                            <Heading
                                mt={4}
                                size="xl"
                                letterSpacing="tight"
                                color="#a98f63"
                                display={{ base: 'none', md: 'flex' }}
                            >
                                {name}
                            </Heading>

                            <Flex
                                direction="column"
                                gap={3}
                                display={{ base: 'flex', md: 'none' }}
                                align="center"
                            >
                                {nameLetters.map((letter, index) => (
                                    <Box
                                        key={index}
                                        fontSize="2xl"
                                        fontWeight="bold"
                                        color="#a98f63"
                                    >
                                        {letter === ' '
                                            ? '\u00A0'
                                            : letter.toUpperCase()}
                                    </Box>
                                ))}
                            </Flex>
                        </motion.div>
                        <Flex
                            direction="column"
                            display={{ base: 'flex', md: 'none' }}
                            align="center"
                        >
                            {abilitiesLetters.map((letter, index) => (
                                <Box key={index} fontSize="sm" opacity={0.8}>
                                    {letter === ' ' ? (
                                        ''
                                    ) : letter === '｜' || letter === '|' ? (
                                        <Box
                                            h="1px"
                                            bg="linear-gradient(90deg, transparent, #a98f63, transparent)"
                                            w="20px"
                                            my={2}
                                        />
                                    ) : (
                                        letter.toUpperCase()
                                    )}
                                </Box>
                            ))}
                        </Flex>
                        <Flex
                            direction="column"
                            display={{ base: 'flex', md: 'none' }}
                            align="center"
                        >
                            {professionLetters.map((letter, index) => (
                                <Box key={index} fontSize="sm" opacity={0.6}>
                                    {letter === ' '
                                        ? '\u00A0'
                                        : letter.toUpperCase()}
                                </Box>
                            ))}
                        </Flex>
                    </Flex>

                    <Flex
                        direction="column"
                        align="center"
                        display={{ base: 'none', md: 'flex' }}
                        mt={2}
                    >
                        <Box
                            h="1px"
                            bg="linear-gradient(90deg, transparent, #a98f63, transparent)"
                            w="40%"
                            mb={3}
                        />

                        <Box fontSize="md" opacity={0.8}>
                            {Content(indexLang, 'card', 'work')}
                        </Box>

                        <Box fontSize="md" opacity={0.6}>
                            {Content(indexLang, 'card', 'type')}
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}

export const QRCodeModal = ({ isOpen, onClose }) => {
    const bgColor = useColorModeValue('#f4f0fc', '#1C1C20')
    const [isFlipped, setIsFlipped] = useState(false)

    const flip = () => setIsFlipped(prev => !prev)

    const modalBorderColor = useColorModeValue(
        'blackAlpha.200',
        'whiteAlpha.200'
    )

    const closeBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
    const closeHoverBg = useColorModeValue('blackAlpha.200', 'whiteAlpha.300')

    useEffect(() => {
        if (isOpen) {
            setIsFlipped(false)
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
                h={{ base: '770px', sm: '725px', md: '430px' }}
                bg={bgColor}
                borderRadius="2xl"
                border="1px solid"
                borderColor={modalBorderColor}
            >
                <ModalBody p={0} h="100%" position="relative">
                    <motion.div
                        key={isFlipped ? 'back' : 'front'}
                        initial={{ opacity: 0.8, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {!isFlipped ? (
                            <FrontCard isOpen={isOpen} />
                        ) : (
                            <BackCard />
                        )}
                    </motion.div>
                    <Box
                        position="absolute"
                        bottom="0"
                        right={!isFlipped && '0'}
                        width="30px"
                        height="30px"
                        bg="#a98f63"
                        roundedBottomLeft={isFlipped && '2xl'}
                        roundedTopRight={isFlipped && '2xl'}
                        roundedBottomRight={!isFlipped && '2xl'}
                        roundedTopLeft={!isFlipped && '2xl'}
                        boxShadow="0 0 4px rgba(0,0,0,0.25) inset"
                        onClick={flip}
                        cursor="pointer"
                        aria-label="Flip card"
                        _active={{
                            bg: '#967c4a',
                            boxShadow: '0 0 8px rgba(0,0,0,0.5) inset'
                        }}
                    />
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
