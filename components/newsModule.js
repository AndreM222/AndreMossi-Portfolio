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
import miscLang from '../locales/misc.json'
import NavContent from './translations/navigationContent'
import { useSearchParams } from 'next/navigation'
import { toaster } from './ui/toaster'
import { FiX } from 'react-icons/fi'
import { AiFillBell } from 'react-icons/ai'
import { BiChevronRight } from 'react-icons/bi'

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
    const cardShadow = {
        _light: '0 10px 30px rgba(0,0,0,0.12)',
        _dark: '0 10px 30px rgba(0,0,0,0.6)'
    }

    return (
        <MotionBox
            p={6}
            borderRadius="2xl"
            bg={{ _light: 'whiteAlpha.900', _dark: 'whiteAlpha.50' }}
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
                <Box fontSize="sm" opacity={0.7}>
                    <Skeleton variant="shine" h={5} w={20} borderRadius={5} />
                </Box>
            </Flex>

            <Heading size="md" mb={2}>
                <Skeleton variant="shine" h={8} w={200} borderRadius={5} />
            </Heading>

            <Box fontSize="lg" mb={3} fontWeight="medium">
                <Skeleton variant="shine" h={6} w={300} borderRadius={5} />
            </Box>

            <Box opacity={0.8} lineHeight="1.6" mb={3}>
                <Skeleton
                    variant="shine"
                    lineClamp={2}
                    gap="2"
                    skeletonHeight="4"
                />
            </Box>

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
    const cardShadow = {
        _light: '0 10px 30px rgba(0,0,0,0.12)',
        _dark: '0 10px 30px rgba(0,0,0,0.6)'
    }

    const hasMultiplePdf = lang => {
        const categoryData = NavContent(
            miscLang,
            'category',
            'link-resume',
            lang
        )

        if (typeof categoryData === 'string') return false

        return true
    }

    const getResumeData = (selectedName, lang) => {
        const categoryData = NavContent(
            miscLang,
            'category',
            'link-resume',
            lang
        )

        if (!categoryData) return null

        if (!hasMultiplePdf(lang))
            return { src: categoryData.src, name: categoryData.name }

        const matching = categoryData.find(item => item.name === selectedName)
        console.log('Name: ' + categoryData[0].name)
        return matching ? { src: matching.src, name: matching.name } : null
    }

    return (
        <MotionBox
            p={6}
            borderRadius="2xl"
            bg={{ _light: 'whiteAlpha.900', _dark: 'whiteAlpha.50' }}
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
                            : news.description
                )}
            />

            <Box justifySelf="center" mt={2}>
                {news.type?.includes(interestTypes[1]['types']) && (
                    <ExperienceGridItem
                        id={news.title}
                        mb={2}
                        title={Content(experienceLang, news.title, 'title')}
                        thumbnail={Content(
                            experienceLang,
                            news.title,
                            'img-url'
                        )}
                    />
                )}
                {interestTypes[2]['types'].includes(news.type) && (
                    <Flex
                        position="relative"
                        direction="column"
                        align="center"
                        justify="center"
                        mb={2}
                        h="100%"
                        overflow="hidden"
                        borderRadius="lg"
                    >
                        <iframe
                            src={
                                getResumeData(news.title, news.type.slice(-2))
                                    .src
                            }
                            width="100%"
                            height="100%"
                            style={{
                                border: 'none',
                                filter: 'blur(4px) brightness(0.75)',
                                pointerEvents: 'none',
                                transform: 'scale(1.05)',
                                transition: 'opacity 0.4s ease'
                            }}
                        />

                        <Box
                            position="absolute"
                            inset="0"
                            backdropFilter="blur(2px)"
                            background="rgba(0, 0, 0, 0.35)"
                        />

                        <Flex
                            position="absolute"
                            direction="column"
                            align="center"
                            gap={4}
                            textAlign="center"
                            px={6}
                            transition="opacity 0.4s ease"
                        >
                            <Text
                                fontSize="md"
                                fontWeight="semibold"
                                color="white"
                            >
                                {ContentWithVars(
                                    newsLang,
                                    'pdfDescriptionMSG',
                                    'content',
                                    {
                                        pdf: hasMultiplePdf(news.type.slice(-2))
                                            ? getResumeData(
                                                news.title,
                                                news.type.slice(-2)
                                            ).name
                                            : Content(
                                                miscLang,
                                                'category',
                                                'resume'
                                            ),
                                        lang: Content(
                                            newsLang,
                                            'switch-types',
                                            news.type
                                        )
                                    }
                                )}
                            </Text>
                            <Button
                                bg={{ _light: 'cyan.400', _dark: 'cyan.200' }}
                                color="black"
                                borderRadius="full"
                                px={8}
                                onClick={() =>
                                    window.open(
                                        getResumeData(
                                            news.title,
                                            news.type.slice(-2)
                                        ).src,
                                        '_blank'
                                    )
                                }
                            >
                                {Content(miscLang, 'viewPDFBTN', 'content')}
                            </Button>
                        </Flex>
                    </Flex>
                )}
            </Box>

            <Separator borderColor="whiteAlpha.300" mb={3} />

            <Flex justifyContent="space-between" alignItems="center">
                <Flex gap={4} fontSize="sm" opacity={0.6}>
                    <Flex gap={1}>
                        <IoGitBranchOutline />
                        <Text>{news.branch}</Text>
                    </Flex>
                    <Flex gap={1}>
                        {news.commit && <Text>#{news.commit.slice(-7)}</Text>}
                    </Flex>
                </Flex>
                <IconButton
                    bg="orange.fg"
                    size="xs"
                    _hover={{
                        bg: 'orange.border'
                    }}
                    title="Interests"
                    onClick={() => window.open(`https://github.com/AndreM222/${news.branch}`, '_blank')}
                >
                    <BiChevronRight />
                </IconButton>
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

const NewsScreen = ({ preference, lang, defaultLang }) => {
    const queryClient = useQueryClient()
    const [newItemsAvailable, setNewItemsAvailable] = useState(false)
    const [latestKnownId, setLatestKnownId] = useState(null)
    const containerRef = useRef(null)

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
        refetchInterval: 30000,
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

    useEffect(() => {
        if (!data?.pages?.length) return

        const firstItem = data.pages[0]?.[0]
        if (!firstItem) return

        if (!latestKnownId) {
            setLatestKnownId(firstItem.id)
            return
        }

        if (firstItem.id !== latestKnownId) {
            setNewItemsAvailable(true)
        }
    }, [data, latestKnownId])

    const loadNewItems = () => {
        setLatestKnownId(data.pages[0][0].id)
        setNewItemsAvailable(false)

        queryClient.invalidateQueries({
            queryKey: ['news']
        })

        containerRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

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

    const allNews = useMemo(() => data?.pages.flat() ?? [], [data])

    return (
        <Box
            ref={containerRef}
            flex="1"
            overflowY="auto"
            onScroll={e => fetchMoreOnBottomReached(e.currentTarget)}
        >
            {newItemsAvailable && (
                <MotionBox
                    position="fixed"
                    zIndex="20"
                    w="full"
                    display="flex"
                    justifyContent="center"
                    mt={2}
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                >
                    <Button
                        backdropFilter="blur(20px)"
                        border="1px solid"
                        color="cyan"
                        shadow="2xl"
                        boxShadowColor="red"
                        bg={{
                            _light: 'blackAlpha.500',
                            _dark: 'whiteAlpha.500'
                        }}
                        borderRadius="full"
                        _hover={{
                            transform: 'translateY(6px)',
                            bg: {
                                _light: 'blackAlpha.700',
                                _dark: 'whiteAlpha.700'
                            }
                        }}
                        boxShadow="lg"
                        onClick={loadNewItems}
                    >
                        <AiFillBell />
                        {Content(newsLang, 'news-ui', 'newupdates')}
                    </Button>
                </MotionBox>
            )}
            <VStack
                gap={{ base: 4, md: 6 }}
                align="stretch"
                m={{ base: 4, md: 8 }}
            >
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
                                {NavContent(
                                    newsLang,
                                    'news-ui',
                                    'loadMore',
                                    lang,
                                    defaultLang
                                )}
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

    const bgColor = { _light: '#f4f0fc', _dark: '#1C1C20' }

    useEffect(() => {
        const initNotifications = async () => {
            if (!('Notification' in window) || !('serviceWorker' in navigator))
                return

            setPermission(Notification.permission)

            try {
                const registration = await navigator.serviceWorker.ready
                const subscription =
                    await registration.pushManager.getSubscription()

                const enabled = !!subscription
                setNotificationsEnabled(enabled)

                localStorage.setItem(
                    'andre_notifications_enabled',
                    enabled.toString()
                )
            } catch (e) {
                console.error('Failed to check subscription', e)
            }
        }

        initNotifications()
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
            const permission =
                Notification.permission === 'granted'
                    ? 'granted'
                    : await Notification.requestPermission()
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
            const registration = await navigator.serviceWorker.ready
            const subscription =
                await registration.pushManager.getSubscription()

            if (subscription) {
                await subscription.unsubscribe()
            }

            setNotificationsEnabled(false)
            localStorage.setItem('andre_notifications_enabled', 'false')
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
                            <NewsScreen
                                preference={preference}
                                lang={locale}
                                defaultLang={defaultLocale}
                            />
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

            setOpen(true)
        }
    }, [searchParams, isOpen, router])

    useEffect(() => {
        const loadUnread = () => {
            const dbReq = indexedDB.open('portfolio-db', 2)

            dbReq.onupgradeneeded = event => {
                const db = event.target.result

                if (!db.objectStoreNames.contains('kv')) {
                    db.createObjectStore('kv')
                }
            }

            dbReq.onsuccess = () => {
                const db = dbReq.result

                if (!db.objectStoreNames.contains('kv')) {
                    db.close()

                    const upgradeReq = indexedDB.open('portfolio-db', 2)

                    upgradeReq.onupgradeneeded = e => {
                        const upgradedDB = e.target.result
                        upgradedDB.createObjectStore('kv')
                    }

                    upgradeReq.onsuccess = () => {
                        setUnreadNews(0)
                    }

                    return
                }

                const tx = db.transaction('kv', 'readonly')
                const store = tx.objectStore('kv')

                const getReq = store.get('news_unread')

                getReq.onsuccess = () => {
                    setUnreadNews(getReq.result || 0)
                }
            }
        }

        loadUnread()
    }, [])

    useEffect(() => {
        const handler = event => {
            if (event.data?.type !== 'UNREAD_NOTIFICATION') return

            const dbReq = indexedDB.open('portfolio-db', 2)

            dbReq.onsuccess = () => {
                const db = dbReq.result
                const tx = db.transaction('kv', 'readonly')
                const store = tx.objectStore('kv')

                const getReq = store.get('news_unread')

                getReq.onsuccess = () => {
                    setUnreadNews(getReq.result || 0)
                }
            }
        }

        navigator.serviceWorker?.addEventListener('message', handler)

        return () =>
            navigator.serviceWorker?.removeEventListener('message', handler)
    }, [])

    useEffect(() => {
        if (!isOpen) return

        const dbReq = indexedDB.open('portfolio-db', 2)

        dbReq.onsuccess = () => {
            const db = dbReq.result
            const tx = db.transaction('kv', 'readwrite')
            const store = tx.objectStore('kv')

            store.put(0, 'news_unread')
            setUnreadNews(0)
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
