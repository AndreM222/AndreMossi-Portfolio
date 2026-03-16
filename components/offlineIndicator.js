import { useEffect, useState } from 'react'
import { Box, Text, Popover, IconButton } from '@chakra-ui/react'
import { FiWifiOff } from 'react-icons/fi'
import Content from '../components/content'
import errorLang from '../locales/pages/404.json'

const OfflineIndicator = () => {
    const [online, setOnline] = useState(true)
    const [showTooltip, setShowTooltip] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        setOnline(navigator.onLine)

        const goOnline = () => setOnline(true)
        const goOffline = () => setOnline(false)

        window.addEventListener('online', goOnline)
        window.addEventListener('offline', goOffline)

        return () => {
            window.removeEventListener('online', goOnline)
            window.removeEventListener('offline', goOffline)
        }
    }, [])

    if (!mounted || online) return null

    return (
        <Box
            position="fixed"
            bottom={10}
            right={4}
            zIndex="9999"
            p={1}
            borderRadius="lg"
            backdropFilter="blur(12px)"
            bg="rgba(239, 68, 68, 0.25)"
            bgGradient="linear(to-r, rgba(248,113,113,0.35), rgba(239,68,68,0.15))"
            border="1px solid rgba(239, 68, 68, 0.6)"
            display="flex"
            alignItems="center"
            gap={2}
            boxShadow="lg"
            color="white"
            opacity={0.95}
            cursor="pointer"
            transition="opacity 0.3s ease, transform 0.2s"
            transform={online ? 'scale(0.8)' : 'scale(1)'}
            style={{
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
                animation: 'pulse 2s infinite'
            }}
            onClick={() => setShowTooltip(true)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setTimeout(() => setShowTooltip(false), 100)}
        >
            <Popover.Root
                isOpen={showTooltip}
                placement="top-end"
                closeOnBlur={true}
                onClose={() => setShowTooltip(false)}
            >
                <Popover.Content
                    backdropFilter="blur(38px)"
                    bg="rgba(0,0,0,0.88)"
                    bgGradient="linear(to-r, rgba(0,0,0,0.5), rgba(30,30,30,0.2))"
                    sx={{
                        backdropFilter: 'blur(14px)',
                        WebkitBackdropFilter: 'blur(14px)'
                    }}
                    border="1px solid"
                    borderColor="red.500"
                    borderRadius="xl"
                    boxShadow="2xl"
                    minW="200px"
                >
                    <Popover.Body p={2} fontSize="sm">
                        <Text fontWeight="medium" mb={1}>
                            {Content(errorLang, 'offline', 'title')}
                        </Text>
                        <Text opacity={0.8} fontSize="xs">
                            {Content(errorLang, 'offline', 'subtitle')}
                            <Box as="span" fontWeight="bold" color="orange.400">
                                {Content(errorLang, 'offline', 'cached')}
                            </Box>
                            {Content(errorLang, 'offline', 'usable')}
                        </Text>
                    </Popover.Body>
                </Popover.Content>
                <Popover.Trigger asChild>
                    <IconButton variant="ghost">
                        <FiWifiOff size={16} />
                    </IconButton>
                </Popover.Trigger>
            </Popover.Root>
        </Box>
    )
}

export default OfflineIndicator
