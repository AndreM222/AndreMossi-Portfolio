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
import { FaNewspaper } from 'react-icons/fa6'
import { FaListAlt } from 'react-icons/fa'
import { motion, useInView } from 'framer-motion'
import {
    IoGitBranchOutline,
    IoNotifications,
    IoNotificationsOff
} from 'react-icons/io5'
import { getDateFormat } from './dateSetup'
import { ExperienceGridItem } from './grid-item'
import Content from './content'

import { DecorateSummary } from './decorateSummary'
import { humanizeSummary } from './humanizeCommits'
import { useRouter } from 'next/router'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import {
    defaultInterestsSettings as defaultInterestSettings,
    interestTypes
} from '../api/newsAPI'

import experienceLang from '../locales/pages/experience.json'
import newsLang from '../locales/pages/news.json'
import NavContent from './translations/navigationContent'
import { useSearchParams } from 'next/navigation'

const MotionBox = motion(Box)

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

const NewsSkeleton = ({ ...props }) => {
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
            mb={8}
            cursor="pointer"
            boxShadow={cardShadow}
            _hover={{
                transform: 'translateY(-2px)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            {...props}
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
                        {Content(newsLang, 'types', news.type)}
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
                <DecorateSummary text={humanizeSummary(news.summary)} />
            </Text>

            <Text opacity={0.8} lineHeight="1.6" mb={3}>
                <DecorateSummary text={humanizeSummary(news.description)} />
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
                            <Heading size="lg">
                                {Content(newsLang, 'news-titles', section.id)}
                            </Heading>
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
                                    <Text minW="100px">
                                        {Content(
                                            newsLang,
                                            'switch-types',
                                            item
                                        )}
                                    </Text>
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

const fetchNewsPage = async ({ pageParam = 1 }) => {
    const res = await fetch(`/api/news?page=${pageParam}&limit=10`)
    if (!res.ok) throw new Error('Failed to fetch news')
    return res.json()
}

const NewsScreen = ({ preference }) => {
    const queryClient = useQueryClient()

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error
    } = useInfiniteQuery({
        queryKey: ['news', preference],
        queryFn: fetchNewsPage,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.length === 10 ? pages.length + 1 : undefined
        },
        select: data => ({
            pages: data.pages.flatMap(page =>
                page.filter(item => {
                    const prefs = preference[item.category]
                    return prefs?.[item.type]
                })
            ),
            pageParams: data.pageParams
        })
    })

    const { ref, inView } = useInView({
        threshold: 0.1
    })

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage])

    const allNews = data?.pages || []

    return (
        <Box flex="1" overflowY="auto" p={{ base: 4, md: 8 }}>
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                {isLoading &&
                    Array.from({ length: 5 }).map((_, i) => (
                        <NewsSkeleton key={`skeleton-${i}`} />
                    ))}

                {error && (
                    <Text color="orange.400" textAlign="center">
                        {Content(newsLang, 'news-ui', 'failed')}
                        <Button
                            variant="link"
                            onClick={() =>
                                queryClient.invalidateQueries({
                                    queryKey: ['news']
                                })
                            }
                            size="sm"
                        >
                            {Content(newsLang, 'news-ui', 'retry')}
                        </Button>
                    </Text>
                )}

                {!isLoading && !error && allNews.length === 0 && (
                    <Text textAlign="center" opacity={0.6}>
                        {Content(newsLang, 'news-ui', 'noResults')}
                    </Text>
                )}

                {!isLoading &&
                    allNews.map((newsItem, idx) => (
                        <NewsItem
                            key={`${newsItem.id}-${idx}`}
                            news={newsItem}
                        />
                    ))}

                {hasNextPage && (
                    <Box ref={ref} textAlign="center">
                        {isFetchingNextPage ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <NewsSkeleton key={`skeleton-${i}`} />
                            ))
                        ) : (
                            <Button
                                variant="ghost"
                                colorScheme="orange"
                                onClick={() => fetchNextPage()}
                            >
                                {Content(newsLang, 'news-ui', 'loadMore')}
                            </Button>
                        )}
                    </Box>
                )}
            </VStack>
        </Box>
    )
}

export const NewsModal = ({ isOpen, onClose }) => {
    const [permission, setPermission] = useState('default')
    const [notificationsEnabled, setNotificationsEnabled] = useState(false)

    const toast = useToast()
    const { locale, defaultLocale } = useRouter()

    const [interestOpen, setInterestOpen] = useState(false)

    const bgColor = useColorModeValue('#f4f0fc', '#1C1C20')

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
                title: NavContent(
                    newsLang,
                    'notifications',
                    'denied',
                    locale,
                    defaultLocale
                ),
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

            const userLocale = navigator.language.split('-')[0]

            await fetch('/api/subscribe', {
                method: 'POST',
                body: JSON.stringify({
                    subscription,
                    locale: userLocale || 'en'
                }),
                headers: { 'Content-Type': 'application/json' }
            })
        }

        const nextEnabled = !notificationsEnabled

        if (nextEnabled) {
            const permission = await Notification.requestPermission()
            if (permission === 'granted') {
                setNotificationsEnabled(true)
                toast({
                    title: NavContent(
                        newsLang,
                        'notifications',
                        'enabled',
                        locale,
                        defaultLocale
                    ),
                    description: NavContent(
                        newsLang,
                        'notifications',
                        'enabledDesc',
                        locale,
                        defaultLocale
                    ),
                    status: 'success',
                    duration: 3000
                })
                await subscribeUser()
            } else {
                toast({
                    title: NavContent(
                        newsLang,
                        'notifications',
                        'denied',
                        locale,
                        defaultLocale
                    ),
                    description: NavContent(
                        newsLang,
                        'notifications',
                        'deniedDesc',
                        locale,
                        defaultLocale
                    ),
                    status: 'warning',
                    duration: 4000
                })
            }
        } else {
            setNotificationsEnabled(false)
            toast({
                title: NavContent(
                    newsLang,
                    'notifications',
                    'disabled',
                    locale,
                    defaultLocale
                ),
                status: 'info',
                duration: 2000
            })
        }
    }, [notificationsEnabled, toast])

    const [preference, setPreferences] = useState(() => {
        if (typeof window === 'undefined') return defaultInterestSettings

        try {
            const saved = localStorage.getItem('andre_news_preferences')
            return saved ? JSON.parse(saved) : defaultInterestSettings
        } catch {
            return defaultInterestSettings
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
                            {interestOpen
                                ? Content(newsLang, 'news-titles', 'interests')
                                : Content(
                                    newsLang,
                                    'news-titles',
                                    'latestUpdates'
                                )}
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

export const NewsButton = ({ children, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [unreadNews, setUnreadNews] = useState(0)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.get('entry') === 'news' && !isOpen) {
            const newUrl = new URL(window.location.href)
            newUrl.searchParams.delete('entry')
            router.replace(newUrl.toString())

            onOpen()
        }
    }, [searchParams, isOpen, router, onOpen])

    useEffect(() => {
        if (!localStorage.getItem('news_unread')) {
            localStorage.setItem('news_unread', 0)
        }

        const update = () =>
            setUnreadNews(Number(localStorage.getItem('news_unread')) || 0)

        update()

        window.addEventListener('news-update', update)
        return () => window.removeEventListener('news-update', update)
    }, [])

    useEffect(() => {
        if (isOpen) {
            localStorage.setItem('news_unread', 0)
            setUnreadNews(0)
            window.dispatchEvent(new Event('news-update'))
        }
    }, [isOpen])

    return (
        <Box position="relative">
            <Button
                colorScheme="orange"
                ring={unreadNews ? 3 : 0}
                ringColor={unreadNews ? 'orange.400' : 'transparent'}
                boxShadow={
                    unreadNews ? '0 0 30px rgba(255, 165, 0, 0.6)' : 'md'
                }
                _hover={{
                    boxShadow: unreadNews
                        ? '0 0 40px rgba(255, 165, 0, 0.8)'
                        : 'md',
                    transform: 'scale(1.05)'
                }}
                transition="all 0.3s ease"
                onClick={onOpen}
                position="relative"
                {...props}
            >
                {children}
                {unreadNews > 0 && (
                    <Box
                        position="absolute"
                        top="-1"
                        right="-1"
                        bg="red.500"
                        color="white"
                        borderRadius="full"
                        w={4}
                        h={4}
                        alignContent="center"
                        justifyContent="center"
                        fontSize="xs"
                        fontWeight="bold"
                        boxShadow="0 0 10px red.500"
                        animation="pulse 1.5s infinite"
                    >
                        {unreadNews}
                    </Box>
                )}
            </Button>

            <NewsModal isOpen={isOpen} onClose={onClose} />
        </Box>
    )
}
