import {
    Dialog,
    Button,
    Heading,
    Flex,
    Box,
    Popover,
    IconButton,
    Portal
} from '@chakra-ui/react'
import { QRCodeCanvas } from 'qrcode.react'
import { motion } from 'framer-motion'

import miscLang from '../locales/misc.json'
import indexLang from '../locales/pages/index.json'
import { IoIosGlobe, IoIosShare, IoLogoGithub } from 'react-icons/io'
import Content from './content'
import { useCallback, useEffect, useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { FaPhone } from 'react-icons/fa6'
import { DialogBodyFlip, DialogCloseFlip } from './layouts/dialogBody'
import { useWebHaptics } from 'web-haptics/react'

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

const SetCurrentCharacter = ({ character }) => (
    <Box as="span">
        {character === ' ' ? (
            '\u00A0'
        ) : character === 'ー' ? (
            '｜'
        ) : character === '-' ? (
            <Box
                h="15px"
                bg="linear-gradient(180deg, transparent, #a98f63, transparent)"
                w="1px"
                my={2}
            />
        ) : character === '｜' || character === '|' ? (
            <Box
                h="1px"
                bg="linear-gradient(90deg, transparent, #a98f63, transparent)"
                w="20px"
                my={2}
            />
        ) : (
            character.toUpperCase()
        )}
    </Box>
)

export const FrontCard = ({ isOpen, ...props }) => {
    const { share: shareUrl, canShare } = useShareUrl()
    const [isFloating, setIsFloating] = useState(true)
    const [showShareMenu, setShowShareMenu] = useState(false)
    const [longPressTimer, setLongPressTimer] = useState(null)
    const [currentQRURL, setCurrentQRURL] = useState(nfcUrl)
    const { trigger } = useWebHaptics()

    const triggerHaptic = () => {
        trigger([{ duration: 30 }, { delay: 60, duration: 40, intensity: 1 }])
    }

    const [nameText, setNameText] = useState('')
    const name = Content(miscLang, 'title', 'name')

    const dividerColor = { _light: 'blackAlpha.200', _dark: 'whiteAlpha.200' }

    const rightGradient = {
        base: {
            _light: 'radial(circle at center, rgba(169,143,99,0.25), transparent 70%)',
            _dark: 'radial(circle at center, rgba(169,143,99,0.15), transparent 70%)'
        },
        xs: {
            _light: 'radial(circle at center, rgba(169,143,99,0.25), transparent 50%)',
            _dark: 'radial(circle at center, rgba(169,143,99,0.15), transparent 50%)'
        },
        md: {
            _light: 'radial(circle at center, rgba(169,143,99,0.25), transparent 70%)',
            _dark: 'radial(circle at center, rgba(169,143,99,0.15), transparent 70%)'
        }
    }

    const lightupShadow = {
        _light: isFloating
            ? '0 0 10px 2px rgba(169,143,99,0.35)'
            : '0 0 40px 12px rgba(169,143,99,0.9)',
        _dark: isFloating
            ? '0 0 8px 2px rgba(169,143,99,0.15)'
            : '0 0 40px 12px rgba(169,143,99,0.7)'
    }

    const qrShadow = {
        _light: isFloating
            ? '0 0 16px 4px rgba(169,143,99,0.5)'
            : '0 0 32px 8px rgba(169,143,99,0.7)',
        _dark: isFloating
            ? '0 0 12px 3px rgba(169,143,99,0.4)'
            : '0 0 24px 7px rgba(169,143,99,0.6)'
    }

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
        if (isOpen) {
            setNameText('')
            let i = 0
            const timer = setInterval(() => {
                if (i < name.length) {
                    const char = name[i]
                    if (char) {
                        setNameText(prev => prev + char)
                    }
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
            triggerHaptic()
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

    const qrBg = { _light: 'whiteAlpha.800', _dark: 'whiteAlpha.50' }

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
                        }
                    }}
                />

                <Heading size="3xl" letterSpacing="tight" overflow="hidden">
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
                    <Box mt={-1} fontSize="lg" opacity={0.9}>
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
                                size="2xs"
                                variant="ghost"
                                borderRadius="full"
                                colorPalette="orange"
                                outline="none"
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
                        <Popover.Root
                            open={showShareMenu}
                            placement="top"
                            autoFocus={false}
                            closeOnInteractOutside
                            onOpenChange={() => {
                                triggerHaptic()
                                setShowShareMenu(false)
                            }}
                        >
                            <Popover.Trigger asChild>
                                <Box
                                    position="absolute"
                                    top={0}
                                    left="50%"
                                    transform="translateX(-50%)"
                                    w="1px"
                                    h="1px"
                                />
                            </Popover.Trigger>

                            <Portal>
                                <Popover.Positioner>
                                    <Popover.Content
                                        bg={qrBg}
                                        backdropFilter="blur(20px)"
                                        border="1px solid"
                                        borderColor="whiteAlpha.300"
                                        shadow="2xl"
                                        borderRadius="xl"
                                        p={2}
                                        w="auto"
                                    >
                                        <Popover.Body p={1}>
                                            <Flex gap={1}>
                                                <IconButton
                                                    size="sm"
                                                    title="Website"
                                                    aria-label="Website QR"
                                                    variant={
                                                        currentQRURL === nfcUrl
                                                            ? 'solid'
                                                            : 'ghost'
                                                    }
                                                    minW="40px"
                                                    h="40px"
                                                    color={
                                                        currentQRURL === nfcUrl
                                                            ? 'AccentColorText'
                                                            : 'orange.fg'
                                                    }
                                                    bg={
                                                        currentQRURL === nfcUrl
                                                            ? 'orange.fg'
                                                            : 'none'
                                                    }
                                                    onClick={() => {
                                                        setShowShareMenu(false)
                                                        setCurrentQRURL(nfcUrl)
                                                    }}
                                                >
                                                    <IoIosGlobe />
                                                </IconButton>
                                                <IconButton
                                                    size="sm"
                                                    title="GitHub"
                                                    aria-label="GitHub QR"
                                                    variant={
                                                        currentQRURL === gitUrl
                                                            ? 'solid'
                                                            : 'ghost'
                                                    }
                                                    color={
                                                        currentQRURL === gitUrl
                                                            ? 'AccentColorText'
                                                            : 'purple.fg'
                                                    }
                                                    bg={
                                                        currentQRURL === gitUrl
                                                            ? 'purple.fg'
                                                            : 'none'
                                                    }
                                                    minW="40px"
                                                    h="40px"
                                                    onClick={() => {
                                                        setShowShareMenu(false)
                                                        setCurrentQRURL(gitUrl)
                                                    }}
                                                >
                                                    <IoLogoGithub />
                                                </IconButton>

                                                <IconButton
                                                    size="sm"
                                                    title="Email"
                                                    aria-label="Email QR"
                                                    variant={
                                                        currentQRURL ===
                                                            emailAddress
                                                            ? 'solid'
                                                            : 'ghost'
                                                    }
                                                    color={
                                                        currentQRURL ===
                                                            emailAddress
                                                            ? 'AccentColorText'
                                                            : 'blue.fg'
                                                    }
                                                    bg={
                                                        currentQRURL ===
                                                            emailAddress
                                                            ? 'blue.fg'
                                                            : 'none'
                                                    }
                                                    minW="40px"
                                                    h="40px"
                                                    onClick={() => {
                                                        setShowShareMenu(false)
                                                        setCurrentQRURL(
                                                            emailAddress
                                                        )
                                                    }}
                                                >
                                                    <MdEmail />
                                                </IconButton>
                                                <IconButton
                                                    size="sm"
                                                    title="Phone"
                                                    aria-label="Phone QR"
                                                    variant={
                                                        currentQRURL ===
                                                            phoneNumber
                                                            ? 'solid'
                                                            : 'ghost'
                                                    }
                                                    color={
                                                        currentQRURL ===
                                                            phoneNumber
                                                            ? 'AccentColorText'
                                                            : 'green.fg'
                                                    }
                                                    bg={
                                                        currentQRURL ===
                                                            phoneNumber
                                                            ? 'green.fg'
                                                            : 'none'
                                                    }
                                                    minW="40px"
                                                    h="40px"
                                                    onClick={() => {
                                                        setShowShareMenu(false)
                                                        setCurrentQRURL(
                                                            phoneNumber
                                                        )
                                                    }}
                                                >
                                                    <FaPhone />
                                                </IconButton>
                                            </Flex>
                                        </Popover.Body>
                                    </Popover.Content>
                                </Popover.Positioner>
                            </Portal>
                        </Popover.Root>
                    </Box>
                </motion.div>
            </Flex>
        </Flex>
    )
}

export const BackCard = ({ ...props }) => {
    const lightupShadow = {
        _light: '0 0 40px 12px rgba(169,143,99,0.9)',
        _dark: '0 0 40px 12px rgba(169,143,99,0.7)'
    }

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
                Array(21)
                    .fill()
                    .map(() => (Math.random() > 0.5 ? 1 : 0))
            )
        setBinaryGrid(grid)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setBinaryGrid(prev =>
                prev.map(row =>
                    row.map(cell => (Math.random() > 0.7 ? 1 - cell : cell))
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
            css={{
                borderRadius: '2xl',
                overflow: 'hidden',
                background: isHovering
                    ? `radial-gradient(circle 400px at ${pos.x} ${pos.y},
                rgba(169,143,99,0.2) 0%, transparent 60%)`
                    : 'transparent',

                '&::after': {
                    content: '""',
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
                        ? `radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y),
        black 0%, black 20%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 45%, transparent 65%)`
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
                css={{
                    '& background': isHovering
                        ? `radial-gradient(circle 400px at ${pos.x} ${pos.y},
                rgba(169,143,99,0.15) 0%, transparent 60%)`
                        : 'transparent'
                }}
                style={{
                    WebkitMaskImage: isHovering
                        ? `radial-gradient(circle 300px at ${pos.x} ${pos.y},
            black 0%, black 15%, rgba(0,0,0,0.8) 30%,
            rgba(0,0,0,0.3) 50%, transparent 70%)`
                        : 'none',
                    maskImage: isHovering
                        ? `radial-gradient(circle 300px at ${pos.x} ${pos.y},
            black 0%, black 15%, rgba(0,0,0,0.8) 30%,
            rgba(0,0,0,0.3) 50%, transparent 70%)`
                        : 'none',
                    WebkitMaskClip: 'border-box',
                    maskClip: 'border-box',
                    borderRadius: '2xl',
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
                                size="4xl"
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
                                        <SetCurrentCharacter
                                            character={letter}
                                        />
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
                                    <SetCurrentCharacter character={letter} />
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
                                    <SetCurrentCharacter character={letter} />
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

export const QRCodeModal = ({ isOpen, setOpen }) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const flip = () => setIsFlipped(prev => !prev)

    useEffect(() => {
        if (isOpen) {
            setIsFlipped(false)
        }
    }, [isOpen])

    return (
        <Dialog.Positioner>
            <Dialog.Content h={{ base: '725px', md: '430px' }} bg="none">
                <DialogBodyFlip
                    setFlippedX={setIsFlipped}
                    isFlippedX={isFlipped}
                    setFlippedY={setOpen}
                    isFlippedY={isOpen}
                    shouldRotateX={true}
                >
                    {!isFlipped ? (
                        <FrontCard isOpen={isOpen} />
                    ) : (
                        <BackCard transform="rotateY(180deg)" />
                    )}
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
                </DialogBodyFlip>

                <DialogCloseFlip isFlipped={isFlipped} />
            </Dialog.Content>
        </Dialog.Positioner>
    )
}

export const QRCodeButton = ({ isOpen, setOpen, children, ...props }) => {
    return (
        <>
            <Button onClick={setOpen} {...props}>
                {children}
            </Button>
            <Dialog.Root
                size="xl"
                open={isOpen}
                onOpenChange={e => setOpen(e.open)}
                placement="center"
                motionPreset="scale"
                preventScroll
            >
                <Dialog.Backdrop
                    bg="blackAlpha.700"
                    backdropFilter="blur(6px)"
                />

                <Portal>
                    <QRCodeModal isOpen={isOpen} setOpen={setOpen} />
                </Portal>
            </Dialog.Root>
        </>
    )
}
