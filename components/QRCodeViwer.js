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
    ModalCloseButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverCloseButton,
    IconButton
} from '@chakra-ui/react'
import { QRCodeCanvas } from 'qrcode.react'
import { motion } from 'framer-motion'

import miscLang from '../locales/misc.json'
import indexLang from '../locales/pages/index.json'
import { IoIosGlobe, IoIosShare, IoLogoGithub } from 'react-icons/io'
import Content from './content'
import { useCallback, useEffect, useState } from 'react'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'

const MotionBox = motion(Box)
const webUrl = 'https://andremossi.vercel.app'
const nfcUrl = webUrl + '/?entry=nfc'
const gitUrl = 'https://github.com/AndreM222'
const phoneNumber = '+18147901591'
const emailAddress = 'mossiroberto0392@gmail.com'

const useShareUrl = () => {
    const canShare = typeof navigator !== 'undefined' && navigator.share

    const share = async () => {
        if (canShare) {
            try {
                await navigator.share({
                    title: 'Andre Mossi · Portfolio',
                    url: nfcUrl
                })
            } catch (err) { }
        }
    }

    return { share, canShare }
}

export const FrontCard = ({ isOpen, ...props }) => {
    const { share: shareUrl, canShare } = useShareUrl()
    const [isFloating, setIsFloating] = useState(true)
    const [showShareMenu, setShowShareMenu] = useState(false)
    const [longPressTimer, setLongPressTimer] = useState(null)
    const [currentQRURL, setCurrentQRURL] = useState(nfcUrl)

    const [nameText, setNameText] = useState('')
    const name = Content(miscLang, 'title', 'name')

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
        if (isOpen) {
            setIsFloating(true)
            setCurrentQRURL(nfcUrl)
        }
    }, [isOpen])

    useEffect(() => {
        return () => {
            if (longPressTimer) clearTimeout(longPressTimer)
        }
    }, [longPressTimer])

    useEffect(() => {
        if (isOpen && nameText.length === 0) {
            let i = 0
            const timer = setInterval(() => {
                if (i < name.length) {
                    setNameText(prev => prev + name[i])
                    i++
                } else {
                    clearInterval(timer)
                }
            }, 80)

            return () => clearInterval(timer)
        }
    }, [isOpen, name])

    const handleQRPress = useCallback(() => {
        const timer = setTimeout(() => {
            setShowShareMenu(true)
        }, 500)

        setLongPressTimer(timer)
    }, [])

    const handleQRRelease = useCallback(() => {
        if (longPressTimer) {
            clearTimeout(longPressTimer)
            setLongPressTimer(null)
        }
    }, [longPressTimer])

    const qrBg = useColorModeValue('whiteAlpha.800', 'whiteAlpha.50')

    return (
        <Flex
            direction={{ base: 'column', md: 'row' }}
            height="100%"
            {...props}
        >
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

                <Heading size="lg" letterSpacing="tight" overflow="hidden">
                    {nameText}
                    <motion.span
                        style={{
                            display: 'inline-block',
                            marginLeft: '0.25rem',
                            width: '2px',
                            height: '1.4em',
                            backgroundColor: '#a98f63',
                            marginTop: '-0.25rem',
                            marginBottom: '-0.25rem'
                        }}
                        animate={{
                            opacity: [1, 0, 1]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                    />
                </Heading>
                {Content(miscLang, 'title', 'subname') && (
                    <Box mt={-2} fontSize="lg" opacity={0.9}>
                        {Content(miscLang, 'title', 'subname')}
                    </Box>
                )}

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
                                _focus={{ boxShadow: 'none' }}
                                _focusVisible={{ boxShadow: 'none' }}
                                aria-label="Share this card"
                            >
                                <IoIosShare />
                            </Button>
                        )}
                    </Box>

                    <Box mt={1} mb={2} h="1px" bg={dividerColor} w="40%" />

                    <Flex direction={'column'}>
                        <Box as="a" href={gitUrl}>
                            github.com/AndreM222
                        </Box>
                        <Box as="a" href={'mailto:' + emailAddress}>
                            {emailAddress}
                        </Box>

                        <Box as="a" href={'tel:' + phoneNumber} opacity={0.7}>
                            {phoneNumber}
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
                    onPointerDown={handleQRPress}
                    onPointerUp={handleQRRelease}
                    onPointerLeave={handleQRRelease}
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
                            value={currentQRURL}
                            size={220}
                            bgColor="transparent"
                            fgColor="#a98f63"
                            level="H"
                        />
                        <Popover
                            isOpen={showShareMenu}
                            placement="top"
                            autoFocus={false}
                            closeOnBlur={true}
                            onClose={() => {
                                setShowShareMenu(false)
                            }}
                        >
                            <PopoverTrigger>
                                <Box
                                    position="absolute"
                                    top={0}
                                    left="50%"
                                    transform="translateX(-50%)"
                                    w="1px"
                                    h="1px"
                                />
                            </PopoverTrigger>
                            <PopoverContent
                                bg={qrBg}
                                backdropFilter="blur(20px)"
                                border="1px solid"
                                borderColor="whiteAlpha.300"
                                shadow="2xl"
                                borderRadius="xl"
                                p={2}
                                minW="0"
                                w="auto"
                                outline="none"
                            >
                                <PopoverCloseButton
                                    position="absolute"
                                    top={-2}
                                    right={-2}
                                    size="sm"
                                    borderRadius="full"
                                    borderWidth={2}
                                    bg={useColorModeValue('white', 'grey')}
                                />
                                <PopoverBody p={1}>
                                    <Flex gap={1}>
                                        <IconButton
                                            icon={<IoIosGlobe />}
                                            size="sm"
                                            title="Website"
                                            aria-label="Website QR"
                                            variant={
                                                currentQRURL === nfcUrl
                                                    ? 'solid'
                                                    : 'ghost'
                                            }
                                            colorScheme="orange"
                                            minW="40px"
                                            h="40px"
                                            onClick={() => {
                                                setShowShareMenu(false)
                                                setCurrentQRURL(nfcUrl)
                                            }}
                                        />
                                        <IconButton
                                            icon={<IoLogoGithub />}
                                            size="sm"
                                            title="GitHub"
                                            aria-label="GitHub QR"
                                            variant={
                                                currentQRURL === gitUrl
                                                    ? 'solid'
                                                    : 'ghost'
                                            }
                                            colorScheme="purple"
                                            minW="40px"
                                            h="40px"
                                            onClick={() => {
                                                setShowShareMenu(false)
                                                setCurrentQRURL(gitUrl)
                                            }}
                                        />

                                        <IconButton
                                            icon={<EmailIcon />}
                                            size="sm"
                                            title="Email"
                                            aria-label="Email QR"
                                            variant={
                                                currentQRURL === emailAddress
                                                    ? 'solid'
                                                    : 'ghost'
                                            }
                                            colorScheme="blue"
                                            minW="40px"
                                            h="40px"
                                            onClick={() => {
                                                setShowShareMenu(false)
                                                setCurrentQRURL(emailAddress)
                                            }}
                                        />
                                        <IconButton
                                            icon={<PhoneIcon />}
                                            size="sm"
                                            title="Phone"
                                            aria-label="Phone QR"
                                            variant={
                                                currentQRURL === phoneNumber
                                                    ? 'solid'
                                                    : 'ghost'
                                            }
                                            colorScheme="green"
                                            minW="40px"
                                            h="40px"
                                            onClick={() => {
                                                setShowShareMenu(false)
                                                setCurrentQRURL(phoneNumber)
                                            }}
                                        />
                                    </Flex>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>
                </motion.div>
            </Flex>
        </Flex>
    )
}

export const BackCard = ({ ...props }) => {
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

    const [binaryGrid, setBinaryGrid] = useState([])

    useEffect(() => {
        const grid = Array(12)
            .fill()
            .map(() =>
                Array(24)
                    .fill()
                    .map(() => (Math.random() > 0.5 ? 1 : 0))
            )
        setBinaryGrid(grid)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setBinaryGrid(prev =>
                prev.map(row =>
                    row.map((cell, colIdx) =>
                        Math.random() > 0.7 ? 1 - cell : cell
                    )
                )
            )
        }, 150)

        return () => clearInterval(interval)
    }, [])

    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    return (
        <Flex
            direction={{ base: 'column', md: 'row' }}
            height="100%"
            position="relative"
            overflow="hidden"
            onMouseMove={e => {
                const rect = e.currentTarget.getBoundingClientRect()
                setPos({
                    x: `${e.clientX - rect.left}px`,
                    y: `${e.clientY - rect.top}px`
                })
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            sx={{
                background: isHovering
                    ? `radial-gradient(circle 400px at ${pos.x} ${pos.y},
                rgba(169,143,99,0.2) 0%, transparent 60%)`
                    : 'transparent',
                '&::after': {
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    color: 'rgba(169,143,99,0.1)',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    lineHeight: '1',
                    opacity: isHovering ? 1 : 0,
                    background: isHovering
                        ? `
                    linear-gradient(180deg, transparent 0%,
                        rgba(0,0,0,0.3) 50%,
                        transparent 100%),
                    radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y),
                        rgba(0,0,0,0.1) 0%, transparent 70%)
                `
                        : 'transparent',
                    backgroundSize: '100% 200%',
                    animation: isHovering
                        ? 'matrixRain 8s linear infinite, matrixGlow 3s ease-in-out infinite'
                        : 'none',
                    WebkitMask: isHovering
                        ? `
                    radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y),
                        transparent 0%, black 30%)
                `
                        : 'none',
                    mask: isHovering
                        ? `
                    radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y),
                        transparent 0%, black 30%)
                `
                        : 'none',
                    transition: 'opacity 0.4s cubic-bezier(0.23, 1, 0.320, 1)'
                },
                '@keyframes matrixRain': {
                    '0%': {
                        backgroundPosition:
                            '0% 0%, var(--mouse-x) var(--mouse-y)'
                    },
                    '100%': {
                        backgroundPosition:
                            '0% 100%, var(--mouse-x) var(--mouse-y)'
                    }
                },
                '@keyframes matrixGlow': {
                    '0%, 100%': { opacity: 0.3 },
                    '50%': { opacity: 0.8 }
                }
            }}
            style={{
                '--mouse-x': pos.x || '50%',
                '--mouse-y': pos.y || '50%'
            }}
            {...props}
        >
            <Box
                position="absolute"
                inset={0}
                height="100%"
                pointerEvents="auto"
                zIndex={10}
                opacity={0.55}
                fontSize="12px"
                lineHeight={1}
                color="rgba(169,143,99,0.9)"
                fontFamily="'Courier New', monospace"
                onMouseMove={e => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    setPos({
                        x: `${e.clientX - rect.left}px`,
                        y: `${e.clientY - rect.top}px`
                    })
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                sx={{
                    background: isHovering
                        ? `radial-gradient(circle 400px at ${pos.x} ${pos.y},
                rgba(169,143,99,0.15) 0%, transparent 60%)`
                        : 'transparent'
                }}
                style={{
                    WebkitMaskImage: isHovering
                        ? `radial-gradient(circle 300px at ${pos.x} ${pos.y}, black 20%, transparent 60%)`
                        : 'none',
                    maskImage: isHovering
                        ? `radial-gradient(circle 300px at ${pos.x} ${pos.y}, black 20%, transparent 60%)`
                        : 'none',
                    '--mouse-x': pos.x || '50%',
                    '--mouse-y': pos.y || '50%'
                }}
            >
                {isHovering &&
                    binaryGrid.map((row, rowIdx) => (
                        <Box key={rowIdx} height="8.9%" display="flex">
                            {row.map((cell, colIdx) => (
                                <Box
                                    key={colIdx}
                                    flex="1"
                                    textAlign="center"
                                    pointerEvents="none"
                                >
                                    {cell}
                                </Box>
                            ))}
                        </Box>
                    ))}
            </Box>
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

            <ModalContent h={{ base: '725px', md: '430px' }} bg="none">
                <ModalBody p={0} h="100%" position="relative">
                    <motion.div
                        drag="x"
                        tabIndex={-1}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(event, info) => {
                            const swipeThreshold = 80
                            const velocityThreshold = 500

                            if (
                                info.offset.x > swipeThreshold ||
                                info.velocity.x > velocityThreshold
                            ) {
                                setIsFlipped(false)
                            } else if (
                                info.offset.x < -swipeThreshold ||
                                info.velocity.x < -velocityThreshold
                            ) {
                                setIsFlipped(true)
                            } else if (
                                Math.abs(info.offset.y) > 120 ||
                                Math.abs(info.velocity.y) > 800
                            ) {
                                onClose()
                            }
                        }}
                        animate={{
                            x: 0,
                            rotateY: isFlipped ? 180 : 0
                        }}
                        transition={{
                            type: 'tween',
                            duration: 0.25,
                            ease: 'easeOut'
                        }}
                        style={{
                            height: '100%',
                            cursor: 'grab',
                            WebkitTapHighlightColor: 'transparent',
                            outline: 'none'
                        }}
                        whileTap={{ cursor: 'grabbing' }}
                        whileDrag={{ scale: 0.98 }}
                    >
                        <Box
                            bg={bgColor}
                            borderRadius="2xl"
                            border="1px solid"
                            borderColor={modalBorderColor}
                            h="full"
                        >
                            {!isFlipped ? (
                                <FrontCard isOpen={isOpen} />
                            ) : (
                                <BackCard transform="rotateY(180deg)" />
                            )}
                        </Box>
                        <Box
                            position="absolute"
                            bottom="0"
                            right="0"
                            width="30px"
                            height="30px"
                            bg="#a98f63"
                            roundedBottomRight="2xl"
                            roundedTopLeft="2xl"
                            boxShadow="0 0 4px rgba(0,0,0,0.25) inset"
                            onClick={flip}
                            cursor="pointer"
                            aria-label="Flip card"
                            _active={{
                                bg: '#967c4a',
                                boxShadow: '0 0 8px rgba(0,0,0,0.5) inset'
                            }}
                        />
                    </motion.div>
                </ModalBody>
                <MotionBox
                    position="absolute"
                    top="16px"
                    right="16px"
                    animate={{
                        scale: isFlipped
                            ? [1, 0.95, 1.1, 1]
                            : [1, 1.05, 0.95, 1]
                    }}
                    transition={{
                        scale: {
                            duration: 0.4,
                            times: [0, 0.3, 0.6, 1],
                            ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn']
                        }
                    }}
                >
                    <ModalCloseButton
                        borderRadius="full"
                        backdropFilter="blur(6px)"
                        bg={closeBg}
                        _hover={{ bg: closeHoverBg, color: '#a98f63' }}
                        position="relative"
                        zIndex={10}
                    />
                </MotionBox>
            </ModalContent>
        </Modal>
    )
}

export const QRCodeButton = ({ children, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('entry') === 'nfc' && !isOpen) {
            urlParams.delete('entry')
            window.history.replaceState(
                {},
                '',
                `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ''}`
            )

            onOpen()
        }
    }, [])

    return (
        <>
            <Button onClick={onOpen} {...props}>
                {children}
            </Button>

            <QRCodeModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}
