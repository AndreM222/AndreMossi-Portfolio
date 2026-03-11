'use client'

import { ClientOnly, IconButton } from '@chakra-ui/react'
import { useColorMode } from '@/components/ui/color-mode'
import { IoSunnyOutline } from 'react-icons/io5'
import { FaMoon } from 'react-icons/fa6'
import { AnimatePresence, motion } from 'framer-motion'

const ThemeToggleButton = () => {
    const { toggleColorMode, colorMode } = useColorMode()

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                style={{ display: 'inline-block' }}
                key={colorMode === 'light' ? 'light' : 'dark'}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <IconButton
                    aria-label="Toggle theme"
                    bg={{ _light: 'purple.500', _dark: 'pink' }}
                    onClick={toggleColorMode}
                >
                    <ClientOnly>
                        {colorMode === 'light' ? (
                            <FaMoon />
                        ) : (
                            <IoSunnyOutline />
                        )}
                    </ClientOnly>
                </IconButton>
            </motion.div>
        </AnimatePresence>
    )
}

export default ThemeToggleButton
