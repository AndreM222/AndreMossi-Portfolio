"use client"

import { IconButton } from '@chakra-ui/react'
import { useColorModeValue, useColorMode } from '@/components/ui/color-mode'
import { IoSunnyOutline } from 'react-icons/io5'
import { FaMoon } from 'react-icons/fa6'
import { AnimatePresence, motion } from 'framer-motion'

const ThemeToggleButton = () => {
    const { toggleColorMode } = useColorMode()

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                style={{ display: 'inline-block' }}
                key={useColorModeValue('light', 'dark')}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <IconButton
                    aria-label="Toggle theme"
                    bg={useColorModeValue('purple.500', 'pink')}
                    onClick={toggleColorMode}
                >
                    {useColorModeValue(<FaMoon />, <IoSunnyOutline />)}
                </IconButton>
            </motion.div>
        </AnimatePresence>
    )
}

export default ThemeToggleButton
