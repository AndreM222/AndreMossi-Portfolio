import { IconButton } from '@chakra-ui/react'
import { ArrowUpIcon } from '@chakra-ui/icons'
import { AnimatePresence, motion } from 'framer-motion'

const toggleUp = () => { window.scrollTo({ top: "100%", behavior: 'smooth' }) }

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
                    colorScheme="orange"
                    icon={<ArrowUpIcon />}
                    onClick={toggleUp}
                />
            </motion.div>
        </AnimatePresence>
    )
}

export default UpToggle
