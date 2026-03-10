import { IconButton } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { RiArrowUpLine } from 'react-icons/ri'

const toggleUp = () => {
    window.scrollTo({ top: '100%', behavior: 'smooth' })
}

const UpToggle = () => {
    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                style={{ display: 'inline-block' }}
                whileHover={{ y: -5, opacity: 1 }}
                transition={{ duration: 0.2 }}
            >
                <IconButton
                    aria-label="Toggle Up"
                    bg="orange.fg"
                    _hover={{
                        bg: 'orange.border'
                    }}
                    onClick={toggleUp}
                >
                    <RiArrowUpLine />
                </IconButton>
            </motion.div>
        </AnimatePresence>
    )
}

export default UpToggle
