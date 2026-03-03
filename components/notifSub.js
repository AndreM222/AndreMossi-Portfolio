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
    Badge
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaCode, FaNewspaper, FaSuitcase } from 'react-icons/fa6'
import { FaCog, FaFileAlt, FaListAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { IoGitBranchOutline } from 'react-icons/io5'

const MotionBox = motion(Box)

const interestTypes = [
    {
        id: 'general',
        title: 'General',
        color: 'teal',
        icon: <FaCog />,
        types: ['Timeline', 'About']
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

const getCategoryMeta = category =>
    interestTypes.find(t => t.id === category) ?? interestTypes[0]

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
                    {new Date(news.date).toLocaleDateString()}
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
        <VStack spacing={6} p={8} align="stretch">
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
    )
}

const NewsScreen = ({ preference }) => {
    const [news, setNews] = useState([])

    useEffect(() => {
        fetch('/api/news')
            .then(res => res.json())
            .then(setNews)
    }, [])

    const filteredNews = news.filter(item => {
        const prefs = preference[item.category]
        return prefs?.[item.type]
    })

    return (
        <VStack p={8} spacing={6} align="stretch" overflowY="auto">
            {filteredNews.length ? (
                filteredNews.map(item => <NewsItem key={item.id} news={item} />)
            ) : (
                <Text textAlign="center" opacity={0.6}>
                    No news matching your interests yet
                </Text>
            )}
        </VStack>
    )
}

export const NewsModal = ({ isOpen, onClose }) => {
    const bgColor = useColorModeValue('#f4f0fc', '#1C1C20')

    const defaultSettings = {
        general: {
            Timeline: true,
            About: true
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
            feat: false,
            fix: false,
            perf: false,
            refactor: false,
            docs: false,
            style: false,
            chore: false
        }
    }

    const [preference, setPreferences] = useState(() => {
        if (typeof window === 'undefined') return defaultSettings

        try {
            const saved = localStorage.getItem('andre_news_preferences')
            return saved ? JSON.parse(saved) : defaultSettings
        } catch {
            return defaultSettings
        }
    })

    const [interestOpen, setInterestOpen] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return

        try {
            localStorage.setItem(
                'andre_news_preferences',
                JSON.stringify(preference)
            )
        } catch (e) {
            console.error('Save failed:', e)
        }
    }, [preference])

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
            blockScrollOnMount
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
                    </Flex>

                    <Flex direction="column" align="center" pt={12}>
                        <Heading zIndex={10}>
                            {interestOpen ? 'Interests' : 'Latest Updates'}
                        </Heading>
                    </Flex>
                </ModalHeader>

                <ModalCloseButton size="lg" borderRadius="full" />

                <ModalBody p={0} flex="1" overflow="hidden">
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

export const NewsButton = ({ title, src, children, ...props }) => {
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
