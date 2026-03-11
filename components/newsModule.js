import {
    Dialog,
    Button,
    Heading,
    Box,
    Separator,
    Flex,
    Text,
    Switch,
    VStack,
    HStack,
    Badge,
    Skeleton,
    IconButton
} from '@chakra-ui/react'
import { useColorModeValue } from '@/components/ui/color-mode'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FaNewspaper } from 'react-icons/fa6'
import { FaListAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import {
    IoGitBranchOutline,
    IoNotifications,
    IoNotificationsOff
} from 'react-icons/io5'
import { getDateFormat } from './dateSetup'
import { ExperienceGridItem } from './grid-item'
import Content, { ContentWithVars } from './content'

import { DecorateSummary, humanizeSummary } from './decorateSummary'
import { useRouter } from 'next/router'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { defaultInterestsSettings, interestTypes } from '../api/newsAPI'

import experienceLang from '../locales/pages/experience.json'
import newsLang from '../locales/pages/news.json'
import NavContent from './translations/navigationContent'
import { useSearchParams } from 'next/navigation'
import { toaster } from './ui/toaster'
import { FiX } from 'react-icons/fi'

const MotionBox = motion(Box)

const InterestButton = ({ isInterestsOpen, setInterestsOpen, ...props }) => {
    return (
        <Button
            bg="orange.fg"
            _hover={{
                bg: 'orange.border'
            }}
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
            bg={notificationsEnabled ? 'cyan.fg' : 'orange.fg'}
            _hover={{
                bg: notificationsEnabled ? 'cyan.border' : 'orange.border'
            }}
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
                    <Skeleton variant="shine" h={5} w={5} borderRadius={5} />
                    <Skeleton variant="shine" h={5} w={20} borderRadius={5} />
                </HStack>
                <Text fontSize="sm" opacity={0.7}>
                    <Skeleton variant="shine" h={5} w={20} borderRadius={5} />
                </Text>
            </Flex>

            <Heading size="md" mb={2}>
                <Skeleton variant="shine" h={8} w={200} borderRadius={5} />
            </Heading>

            <Text fontSize="lg" mb={3} fontWeight="medium">
                <Skeleton variant="shine" h={6} w={300} borderRadius={5} />
            </Text>

            <Text opacity={0.8} lineHeight="1.6" mb={3}>
                <Skeleton
                    variant="shine"
                    Text
                    lineClamp={2}
                    gap="2"
                    skeletonHeight="4"
                />
            </Text>

            <Separator borderColor="whiteAlpha.300" mb={3} />

            <Flex gap={4} fontSize="sm" opacity={0.6}>
                <Flex gap={1}>
                    <IoGitBranchOutline />
                    <Skeleton variant="shine" h={4} w={200} borderRadius={5} />
                </Flex>
                <Flex gap={1}>
                    <Skeleton variant="shine" h={4} w={90} borderRadius={5} />
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
                    <Badge colorPalette={categoryMeta.color}>
                        {Content(newsLang, 'types', news.type)}
                    </Badge>
                </HStack>
                <Text fontSize="sm" opacity={0.7}>
                    {getDateFormat(news.date, 'slash')}
                </Text>
            </Flex>

            <Heading size="md" mb={2} color="#a98f63">
                {news.type === 'stars' || news.type === 'repository'
                    ? Content(newsLang, 'news-titles', news.type)
                    : news.title?.toUpperCase()}
            </Heading>

            <DecorateSummary
                fontSize="lg"
                mb={3}
                fontWeight="medium"
                text={humanizeSummary(
                    news.type === 'stars'
                        ? ContentWithVars(
                            newsLang,
                            'starNotification',
                            'summary',
                            { repo: news.title }
                        )
                        : news.type === 'repository'
                            ? ContentWithVars(
                                newsLang,
                                'newRepoNotification',
                                'summary',
                                { repo: news.title }
                            )
                            : news.summary
                )}
            />

            <DecorateSummary
                opacity={0.8}
                lineHeight="1.6"
                mb={3}
                text={humanizeSummary(
                    news.type === 'stars'
                        ? ContentWithVars(
                            newsLang,
                            'starNotification',
                            'description',
                            { repo: news.title }
                        )
                        : news.type === 'repository'
                            ? ContentWithVars(
                                newsLang,
                                'newRepoNotification',
                                'description',
                                { repo: news.title }
                            )
                            : news.description?.toUpperCase()
                )}
            />

            <Box justifySelf="center" mt={2}>
                {news.type?.includes([
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

            <Separator borderColor="whiteAlpha.300" mb={3} />

            <Flex gap={4} fontSize="sm" opacity={0.6}>
                <Flex gap={1}>
                    <IoGitBranchOutline />
                    <Text>{news.branch}</Text>
                </Flex>
                <Flex gap={1}>
                    {news.commit && <Text>#{news.commit.slice(-7)}</Text>}
                </Flex>
            </Flex>
        </MotionBox>
    )
}

const InterestSettings = ({ preference, setPreferences }) => {
    return (
        <Box flex="1" overflowY="auto" p={{ base: 4, md: 8 }}>
            <VStack gap={{ base: 4, md: 6 }} align="stretch">
                {interestTypes.map(section => (
                    <Box key={section.id}>
                        <Flex align="center" gap={3} mb={2}>
                            {section.icon}
                            <Heading size="xl">
                                {Content(newsLang, 'news-titles', section.id)}
                            </Heading>
                        </Flex>
                        <Separator mb={4} />
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
                                    <Switch.Root
                                        checked={preference[section.id][item]}
                                        onCheckedChange={({ checked }) =>
                                            setPreferences(prev => ({
                                                ...prev,
                                                [section.id]: {
                                                    ...prev[section.id],
                                                    [item]: checked
                                                }
                                            }))
                                        }
                                        colorPalette={section.color}
                                    >
                                        <Switch.HiddenInput />

                                        <Switch.Control>
                                            <Switch.Thumb />
                                        </Switch.Control>
                                    </Switch.Root>
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
        getNextPageParam: (lastPage, pages) =>
            lastPage.length === 10 ? pages.length + 1 : undefined,
        select: data => ({
            pages: data.pages.map(page =>
                page.filter(item => {
                    const prefs = preference[item.category]
                    return prefs?.[item.type]
                })
            ),
            pageParams: data.pageParams
        })
    })

    const containerRef = useRef(null)

    const fetchMoreOnBottomReached = useCallback(
        container => {
            if (!container) return

            const { scrollHeight, scrollTop, clientHeight } = container

            if (
                scrollHeight - scrollTop - clientHeight < 300 &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage()
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    )

    useEffect(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [hasNextPage, fetchNextPage, isFetchingNextPage])

    const allNews = useMemo(() => data?.pages.flat() ?? [], [data])

    return (
        <Box
            ref={containerRef}
            flex="1"
            overflowY="auto"
            p={{ base: 4, md: 8 }}
            onScroll={e => fetchMoreOnBottomReached(e.currentTarget)}
        >
            <VStack gap={{ base: 4, md: 6 }} align="stretch">
                {isLoading &&
                    Array.from({ length: 5 }).map((_, i) => (
                        <NewsSkeleton key={`skeleton-${i}`} />
                    ))}

                {error && (
                    <Text color="orange.400" textAlign="center">
                        {Content(newsLang, 'news-ui', 'failed')}
                        <Button
                            variant="plain"
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
                    <Box textAlign="center">
                        {isFetchingNextPage ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <NewsSkeleton key={`skeleton-${i}`} />
                            ))
                        ) : (
                            <Button
                                variant="ghost"
                                colorPalette="orange"
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

export const NewsModal = ({ isOpen, setOpen }) => {
    const [permission, setPermission] = useState('default')
    const [notificationsEnabled, setNotificationsEnabled] = useState(false)

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
            toaster.create({
                title: NavContent(
                    newsLang,
                    'notifications',
                    'denied',
                    locale,
                    defaultLocale
                ),
                type: 'warning',
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
                toaster.create({
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
                    type: 'success',
                    duration: 3000
                })
                await subscribeUser()
            } else {
                toaster.create({
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
                    type: 'warning',
                    duration: 4000
                })
            }
        } else {
            setNotificationsEnabled(false)
            toaster.create({
                title: NavContent(
                    newsLang,
                    'notifications',
                    'disabled',
                    locale,
                    defaultLocale
                ),
                type: 'info',
                duration: 2000
            })
        }
    }, [notificationsEnabled, toaster])

    const [preference, setPreferences] = useState(() => {
        if (typeof window === 'undefined') return defaultInterestsSettings

        try {
            const saved = localStorage.getItem('andre_news_preferences')
            return saved ? JSON.parse(saved) : defaultInterestsSettings
        } catch {
            return defaultInterestsSettings
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
        <Dialog.Root
            size="xl"
            open={isOpen}
            onOpenChange={e => setOpen(e.open)}
            placement="center"
            motionPreset="scale"
        >
            <Dialog.Backdrop bg="blackAlpha.700" backdropFilter="blur(6px)" />
            <Dialog.Positioner>
                <Dialog.Content
                    display="flex"
                    flexDirection="column"
                    h={{ base: '85vh', md: '90vh' }}
                    bg={bgColor}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    boxShadow="0 20px 60px rgba(0,0,0,0.5)"
                >
                    <Dialog.Header
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

                        <Flex pt={12} m="auto">
                            <Heading zIndex={10} size="3xl">
                                {interestOpen
                                    ? Content(
                                        newsLang,
                                        'news-titles',
                                        'interests'
                                    )
                                    : Content(
                                        newsLang,
                                        'news-titles',
                                        'latestUpdates'
                                    )}
                            </Heading>
                        </Flex>
                    </Dialog.Header>

                    <Dialog.CloseTrigger asChild>
                        <IconButton
                            aria-label="Close"
                            size="sm"
                            position="absolute"
                            top="8px"
                            right="16px"
                            zIndex="10"
                            variant="ghost"
                        >
                            <FiX />
                        </IconButton>
                    </Dialog.CloseTrigger>

                    <Dialog.Body
                        p={0}
                        flex="1"
                        overflow="hidden"
                        display="flex"
                    >
                        {interestOpen ? (
                            <InterestSettings
                                preference={preference}
                                setPreferences={setPreferences}
                            />
                        ) : (
                            <NewsScreen preference={preference} />
                        )}
                    </Dialog.Body>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}

export const NewsButton = ({ children, ...props }) => {
    const [isOpen, setOpen] = useState(false)
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
    }, [searchParams, isOpen, router])

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
                onClick={() => setOpen(true)}
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
                        boxShadow="0 0 10px red.500"
                        animation="pulse 1.5s infinite"
                    />
                )}
            </Button>

            <NewsModal isOpen={isOpen} setOpen={setOpen} />
        </Box>
    )
}
