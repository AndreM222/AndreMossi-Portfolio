import { Dialog, Box, IconButton } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { FiX } from 'react-icons/fi'

const MotionBox = motion(Box)

export const DialogCloseFlip = ({ isFlipped, ...props }) => {
    const closeBg = { _light: 'blackAlpha.100', _dark: 'whiteAlpha.100' }
    const closeHoverBg = { _light: 'blackAlpha.200', _dark: 'whiteAlpha.300' }

    return (
        <MotionBox
            position="absolute"
            top="16px"
            right="16px"
            animate={{
                scale: isFlipped ? [1, 0.95, 1.1, 1] : [1, 1.05, 0.95, 1]
            }}
            transition={{
                scale: {
                    duration: 0.4,
                    times: [0, 0.3, 0.6, 1],
                    ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn']
                }
            }}
        >
            <Dialog.CloseTrigger asChild position="relative" {...props}>
                <IconButton
                    size="xs"
                    borderRadius="full"
                    color="CaptionText"
                    backdropFilter="blur(6px)"
                    bg={closeBg}
                    _hover={{ bg: closeHoverBg, color: '#a98f63' }}
                    zIndex={10}
                >
                    <FiX />
                </IconButton>
            </Dialog.CloseTrigger>
        </MotionBox>
    )
}

export const DialogBodyFlip = ({
    children,
    isFlippedX,
    setFlippedX,
    shouldRotateX,
    disableFlipX = false,
    isFlippedY,
    setFlippedY,
    disableFlipY = false,
    ...props
}) => {
    const bgColor = { _light: '#f4f0fc', _dark: '#1C1C20' }

    const modalBorderColor = {
        _light: 'blackAlpha.200',
        _dark: 'whiteAlpha.200'
    }

    return (
        <Dialog.Body p={0} h="100%" position="relative">
            <motion.div
                {...props}
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
                        if (!disableFlipX)
                            setFlippedX(shouldRotateX ? false : !isFlippedX)
                    } else if (
                        info.offset.x < -swipeThreshold ||
                        info.velocity.x < -velocityThreshold
                    ) {
                        if (!disableFlipX)
                            setFlippedX(shouldRotateX ? true : !isFlippedX)
                    } else if (
                        Math.abs(info.offset.y) > 120 ||
                        Math.abs(info.velocity.y) > 800
                    ) {
                        if (!disableFlipY) setFlippedY(!isFlippedY)
                    }
                }}
                animate={{
                    x: 0,
                    rotateY: shouldRotateX && isFlippedX ? 180 : 0
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
                {...props}
            >
                <Box
                    bg={bgColor}
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor={modalBorderColor}
                    h="full"
                >
                    {children}
                </Box>
            </motion.div>
        </Dialog.Body>
    )
}

export const DialogContentFlip = ({
    children,
    isFlippedX,
    setFlippedX,
    shouldRotateX,
    disableFlipX,
    isFlippedY,
    setFlippedY,
    disableFlipY,
    ...props
}) => {
    const bgColor = { _light: '#f4f0fc', _dark: '#1C1C20' }

    const modalBorderColor = {
        _light: 'blackAlpha.200',
        _dark: 'whiteAlpha.200'
    }

    return (
        <Dialog.Content
            bg="none"
            {...props}
        >
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
                        if (!disableFlipX)
                            setFlippedX(shouldRotateX ? false : !isFlippedX)
                    } else if (
                        info.offset.x < -swipeThreshold ||
                        info.velocity.x < -velocityThreshold
                    ) {
                        if (!disableFlipX)
                            setFlippedX(shouldRotateX ? true : !isFlippedX)
                    } else if (
                        Math.abs(info.offset.y) > 120 ||
                        Math.abs(info.velocity.y) > 800
                    ) {
                        if (!disableFlipY) setFlippedY(!isFlippedY)
                    }
                }}
                animate={{
                    x: 0,
                    rotateY: shouldRotateX && isFlippedX ? 180 : 0
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
                    outline: 'none',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                whileTap={{ cursor: 'grabbing' }}
                whileDrag={{ scale: 0.98 }}
            >
                <Box
                    bg={bgColor}
                    overflow="hidden"
                    borderRadius="2xl"
                    border="1px solid"
                    h="100%"
                    borderColor={modalBorderColor}
                    display="flex"
                    flexDirection="column"
                >
                    {children}
                </Box>
            </motion.div>
        </Dialog.Content>
    )
}
