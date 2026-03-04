import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    Button,
    useColorModeValue,
    useDisclosure,
    Heading,
    Box,
    Divider,
    Flex,
    Text,
    Switch,
    VStack,
    HStack,
    Badge,
    Skeleton,
    SkeletonText,
    useToast
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { FaCode, FaNewspaper, FaSuitcase } from 'react-icons/fa6'
import { FaCog, FaFileAlt, FaListAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import {
    IoGitBranchOutline,
    IoNotifications,
    IoNotificationsOff
} from 'react-icons/io5'
import { getDateFormat } from './dateSetup'
import { ExperienceGridItem } from './grid-item'
import Content from './content'

import experienceLang from '../locales/pages/experience.json'

const MotionBox = motion(Box)

const interestTypes = [
    {
        id: 'general',
        title: 'General',
        color: 'teal',
        icon: <FaCog />,
        types: ['Timeline', 'About', 'GitStars', 'New Repositories']
    },
    {
        id: 'experience',
        title: 'Experience',
        color: 'cyan',
        icon: <FaSuitcase />,
        types: ['Intern', 'Research', 'Awards', 'Projects', 'Certifications']
    },
    {
        id: 'resume',
        title: 'Resume',
        color: 'orange',
        icon: <FaFileAlt />,
        types: ['English', 'Spanish', 'Japanese']
    },
    {
        id: 'developer',
        title: 'Development',
        color: 'purple',
        icon: <FaCode />,
        types: ['feat', 'fix', 'perf', 'refactor', 'docs', 'style', 'chore']
    }
]

const InterestButton = ({ isInterestsOpen, setInterestsOpen, ...props }) => {
    return (
        <Button
            colorScheme="orange"
            title="Interests"
            onClick={() => setInterestsOpen(!isInterestsOpen)}
            {...props}
        >
            {isInterestsOpen ? <FaNewspaper /> : <FaListAlt />}
        </Button>
    )
}

const NotificationsButton = ({
    notificationsEnabled,
    onToggle,
    permission
}) => {
    return (
        <Button
            colorScheme={notificationsEnabled ? 'cyan' : 'orange'}
            title={
                notificationsEnabled ? 'Notifications ON' : 'Notifications OFF'
            }
            onClick={onToggle}
            size="sm"
            disabled={permission === 'denied'}
        >
            {notificationsEnabled ? (
                <IoNotifications />
            ) : (
                <IoNotificationsOff />
            )}
        </Button>
    )
}

const getCategoryMeta = category =>
    interestTypes.find(t => t.id === category) ?? interestTypes[0]

const NewsSkeleton = () => {
    const cardShadow = useColorModeValue(
        '0 10px 30px rgba(0,0,0,0.12)',
        '0 10px 30px rgba(0,0,0,0.6)'
    )

    return (
        <MotionBox
            p={6}
            borderRadius="2xl"
            bg={useColorModeValue('whiteAlpha.900', 'whiteAlpha.50')}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            mb={4}
            cursor="pointer"
            boxShadow={cardShadow}
            _hover={{
                transform: 'translateY(-2px)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
        >
            <Flex justify="space-between" align="center" mb={3}>
                <HStack>
                    <Skeleton h={5} w={5} borderRadius={5} />
                    <Skeleton h={5} w={20} borderRadius={5} />
                </HStack>
                <Text fontSize="sm" opacity={0.7}>
                    <Skeleton h={5} w={20} borderRadius={5} />
                </Text>
            </Flex>

            <Heading size="md" mb={2}>
                <Skeleton h={8} w={200} borderRadius={5} />
            </Heading>

            <Text fontSize="lg" mb={3} fontWeight="medium">
                <Skeleton h={6} w={300} borderRadius={5} />
            </Text>

            <Text opacity={0.8} lineHeight="1.6" mb={3}>
                <SkeletonText noOfLines={2} spacing="2" skeletonHeight="4" />
            </Text>

            <Divider borderColor="whiteAlpha.300" mb={3} />

            <Flex gap={4} fontSize="sm" opacity={0.6}>
                <Flex gap={1}>
                    <IoGitBranchOutline />
                    <Skeleton h={4} w={200} borderRadius={5} />
                </Flex>
                <Flex gap={1}>
                    <Skeleton h={4} w={90} borderRadius={5} />
                </Flex>
            </Flex>
        </MotionBox>
    )
}

const NewsItem = ({ news }) => {
    const categoryMeta = getCategoryMeta(news.category)
    const cardShadow = useColorModeValue(
        '0 10px 30px rgba(0,0,0,0.12)',
        '0 10px 30px rgba(0,0,0,0.6)'
    )

    return (
        <MotionBox
            p={6}
            borderRadius="2xl"
            bg={useColorModeValue('whiteAlpha.900', 'whiteAlpha.50')}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            mb={4}
            cursor="pointer"
            boxShadow={cardShadow}
            _hover={{
                boxShadow: `0 0 24px ${categoryMeta.color}.400`,
                transform: 'translateY(-2px)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
        >
            <Flex justify="space-between" align="center" mb={3}>
                <HStack>
                    {categoryMeta.icon}
                    <Badge colorScheme={categoryMeta.color}>
                        {news.type.toUpperCase()}
                    </Badge>
                </HStack>
                <Text fontSize="sm" opacity={0.7}>
                    {getDateFormat(news.date, 'slash')}
                </Text>
            </Flex>

            <Heading size="md" mb={2} color="#a98f63">
                {news.title.toUpperCase()}
            </Heading>

            <Text fontSize="lg" mb={3} fontWeight="medium">
                {news.summary}
            </Text>

            <Text opacity={0.8} lineHeight="1.6" mb={3}>
                {news.description}
            </Text>

            <Box justifySelf="center" mt={2}>
                {news.type.includes([
                    'experience',
                    'intern',
                    'research',
                    'awards',
                    'projects'
                ]) && (
                        <ExperienceGridItem
                            id={news.title}
                            title={Content(experienceLang, news.title, 'title')}
                            thumbnail={Content(
                                experienceLang,
                                news.title,
                                'img-url'
                            )}
                        />
                    )}
            </Box>

            <Divider borderColor="whiteAlpha.300" mb={3} />

            <Flex gap={4} fontSize="sm" opacity={0.6}>
                <Flex gap={1}>
                    <IoGitBranchOutline />
                    <Text>{news.branch}</Text>
                </Flex>
                <Flex gap={1}>
                    <Text>#{news.commit.slice(-7)}</Text>
                </Flex>
            </Flex>
        </MotionBox>
    )
}

const InterestSettings = ({ preference, setPreferences }) => {
    return (
        <Box flex="1" overflowY="auto" p={{ base: 4, md: 8 }}>
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                {interestTypes.map(section => (
                    <Box key={section.id}>
                        <Flex align="center" gap={3} mb={4}>
                            {section.icon}
                            <Heading size="lg">{section.title}</Heading>
                        </Flex>
                        <Divider mb={4} />
                        <Flex
                            direction={{ base: 'column', md: 'row' }}
                            gap={4}
                            flexWrap="wrap"
                        >
                            {section.types.map(item => (
                                <Flex
                                    key={item}
                                    align="center"
                                    gap={2}
                                    p={3}
                                    borderRadius="lg"
                                    bg="whiteAlpha.100"
                                    border="1px solid"
                                    borderColor="whiteAlpha.200"
                                >
                                    <Text minW="100px">{item}</Text>
                                    <Switch
                                        id={`${section.id}-${item}`}
                                        colorScheme={section.color}
                                        isChecked={preference[section.id][item]}
                                        onChange={e =>
                                            setPreferences(prev => ({
                                                ...prev,
                                                [section.id]: {
                                                    ...prev[section.id],
                                                    [item]: e.target.checked
                                                }
                                            }))
                                        }
                                    />
                                </Flex>
                            ))}
                        </Flex>
                    </Box>
                ))}
            </VStack>
        </Box>
    )
}

const NewsScreen = ({ preference }) => {
    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true)
                const res = await fetch('/api/news')
                const data = await res.json()
                setNews(data)
            } catch (error) {
                console.error('Failed to fetch news:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchNews()
    }, [])

    const filteredNews = news.filter(item => {
        const prefs = preference[item.category]
        return prefs?.[item.type]
    })

    return (
        <Box flex="1" overflowY="auto" p={{ base: 4, md: 8 }}>
            {isLoading ? (
                <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <NewsSkeleton key={i} />
                    ))}
                </VStack>
            ) : (
                <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                    {filteredNews.length ? (
                        filteredNews.map(item => (
                            <NewsItem key={item.id} news={item} />
                        ))
                    ) : (
                        <Text textAlign="center" opacity={0.6}>
                            No news matching your interests yet
                        </Text>
                    )}
                </VStack>
            )}
        </Box>
    )
}

export const NewsModal = ({ isOpen, onClose }) => {
    const [permission, setPermission] = useState('default')
    const [notificationsEnabled, setNotificationsEnabled] = useState(false)

    const toast = useToast()
    const [interestOpen, setInterestOpen] = useState(false)

    const bgColor = useColorModeValue('#f4f0fc', '#1C1C20')

    const defaultSettings = {
        general: {
            Timeline: true,
            About: true,
            GitStars: true,
            NewRepositories: true
        },
        experience: {
            Intern: true,
            Research: true,
            Awards: true,
            Projects: true,
            Certifications: true
        },
        resume: { English: true, Spanish: true, Japanese: true },
        developer: {
            feat: true,
            fix: true,
            perf: true,
            refactor: true,
            docs: true,
            style: true,
            chore: true
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission)

            const savedEnabled =
                localStorage.getItem('andre_notifications_enabled') === 'true'
            setNotificationsEnabled(savedEnabled)
        }
    }, [])

    const handleNotificationsToggle = useCallback(async () => {
        if (!('Notification' in window)) {
            toast({
                title: 'Notifications not supported',
                status: 'warning',
                duration: 3000
            })
            return
        }

        function urlBase64ToUint8Array(base64String) {
            const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
            const base64 = (base64String + padding)
                .replace(/-/g, '+')
                .replace(/_/g, '/')

            const rawData = window.atob(base64)
            return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)))
        }

        const subscribeUser = async () => {
            const registration = await navigator.serviceWorker.ready

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
                )
            })

            await fetch('/api/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: { 'Content-Type': 'application/json' }
            })
        }

        const nextEnabled = !notificationsEnabled

        if (nextEnabled) {
            // Request permission
            const permission = await Notification.requestPermission()
            if (permission === 'granted') {
                setNotificationsEnabled(true)
                toast({
                    title: 'Notifications enabled!',
                    description: 'Thanks for showing interest.',
                    status: 'success',
                    duration: 3000
                })
                await subscribeUser()
            } else {
                toast({
                    title: 'Permission denied',
                    description: 'Notifications require browser permission.',
                    status: 'warning',
                    duration: 4000
                })
            }
        } else {
            // Disable (no permission needed)
            setNotificationsEnabled(false)
            toast({
                title: 'Notifications disabled',
                status: 'info',
                duration: 2000
            })
        }
    }, [notificationsEnabled, toast])

    const [preference, setPreferences] = useState(() => {
        if (typeof window === 'undefined') return defaultSettings

        try {
            const saved = localStorage.getItem('andre_news_preferences')
            return saved ? JSON.parse(saved) : defaultSettings
        } catch {
            return defaultSettings
        }
    })

    useEffect(() => {
        if (typeof window === 'undefined') return

        try {
            localStorage.setItem(
                'andre_news_preferences',
                JSON.stringify(preference)
            )
        } catch (e) {
            console.error('Failed to save preferences:', e)
        }
    }, [preference])

    return (
        <Modal
            size="6xl"
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            motionPreset="scale"
        >
            <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(6px)" />
            <ModalContent
                display="flex"
                flexDirection="column"
                h={{ base: '85vh', md: '90vh' }}
                bg={bgColor}
                borderRadius="xl"
                border="1px solid"
                borderColor="whiteAlpha.200"
                boxShadow="0 20px 60px rgba(0,0,0,0.5)"
            >
                <ModalHeader
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.200"
                    position="relative"
                >
                    <Flex
                        position="absolute"
                        left={4}
                        top={4}
                        gap={2}
                        zIndex={20}
                    >
                        <InterestButton
                            isInterestsOpen={interestOpen}
                            setInterestsOpen={setInterestOpen}
                            size="sm"
                        />
                        <NotificationsButton
                            notificationsEnabled={notificationsEnabled}
                            onToggle={handleNotificationsToggle}
                            permission={permission}
                        />
                    </Flex>

                    <Flex direction="column" align="center" pt={12}>
                        <Heading zIndex={10}>
                            {interestOpen ? 'Interests' : 'Latest Updates'}
                        </Heading>
                    </Flex>
                </ModalHeader>

                <ModalCloseButton size="lg" borderRadius="full" />

                <ModalBody p={0} flex="1" overflow="hidden" display="flex">
                    {interestOpen ? (
                        <InterestSettings
                            preference={preference}
                            setPreferences={setPreferences}
                        />
                    ) : (
                        <NewsScreen preference={preference} />
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export const NewsButton = ({ title, src, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button
                colorScheme="orange"
                leftIcon={<FaNewspaper />}
                align="right"
                alignItems="center"
                onClick={onOpen}
                {...props}
            >
                News
            </Button>

            <NewsModal
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                src={src}
            />
        </>
    )
}
