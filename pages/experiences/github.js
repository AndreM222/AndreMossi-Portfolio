import {
    Container,
    Badge,
    List,
    Box,
    SimpleGrid,
    Skeleton,
    Heading,
    Flex,
    Text,
    chakra
} from '@chakra-ui/react'
import { Title, Meta } from '../../components/experience'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import CitationList from '../../components/citationList'
import DateSetup from '../../components/dateSetup'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { FaBook, FaStar } from 'react-icons/fa'
import { TbLicense } from 'react-icons/tb'
import { FaCodeFork } from 'react-icons/fa6'
import { motion } from 'framer-motion'

import githubLang from '../../locales/pages/experiences/github.json'
import contentLang from '../../locales/experience-content.json'
import miscLang from '../../locales/misc.json'
import experienceLang from '../../locales/pages/experience.json'
import { StatItem } from '@/stats'

const MotionBox = motion(Box)

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: prop => {
        return isValidMotionProp(prop) || isPropValid(prop)
    }
})

const TopRepoSecton = ({ loading, data, ...props }) => {
    return (
        <MotionBox
            borderRadius="cardBase"
            bg="cardBase.bg"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="cardBase.borderColor"
            boxShadow="cardBase.normal"
            mb={4}
            cursor="pointer"
            _hover={{
                boxShadow: `0 0 24px orange.400`,
                transform: 'translateY(-2px)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            as={NextLink}
            href={data.url}
            w="full"
            position="relative"
            overflow="hidden"
            {...props}
        >
            <Box p={{ base: 4, md: 6 }} position="relative" zIndex={1}>
                <Flex
                    justify="space-between"
                    align="center"
                    mb={{ base: 3, md: 4 }}
                >
                    <Heading
                        size={{ base: 'sm', md: 'md' }}
                        mb={{ base: 2, md: 0 }}
                    >
                        {loading ? (
                            <Skeleton variant="shine" h={6} w="80%" />
                        ) : (
                            data.name
                        )}
                    </Heading>

                    {data.language && data.language !== 'Unknown' && (
                        <Badge
                            bg="cyan.100"
                            _dark={{
                                bg: 'cyan.700',
                                color: 'cyan'
                            }}
                            color="cyan.700"
                            px={{ base: 2, md: 3 }}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="medium"
                        >
                            {loading ? (
                                <Skeleton
                                    variant="shine"
                                    h={4}
                                    w={16}
                                    rounded="full"
                                />
                            ) : (
                                data.language
                            )}
                        </Badge>
                    )}
                </Flex>

                {/* Stats */}
                <Box
                    display="flex"
                    flexDirection={{ base: 'column', md: 'row' }}
                    gap={{ base: 3, md: 4 }}
                    mb={{ base: 3, md: 4 }}
                    flexWrap="wrap"
                >
                    <Flex align="center" gap={2} minW={0}>
                        <Box
                            w={8}
                            h={8}
                            borderRadius="full"
                            bg="orange.50"
                            _dark={{ bg: 'orange.900' }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <FaStar size={12} color="orange.500" />
                        </Box>
                        <Box>
                            <Text fontSize="xs" opacity={0.7} mb={0.5}>
                                {Content(experienceLang, 'category', 'stars')}:
                            </Text>
                            {loading ? (
                                <Skeleton
                                    variant="shine"
                                    h={5}
                                    w={12}
                                    rounded="md"
                                />
                            ) : (
                                <Text
                                    fontSize={{ base: 'md', md: 'lg' }}
                                    fontWeight="bold"
                                >
                                    {data.stars || 0}
                                </Text>
                            )}
                        </Box>
                    </Flex>

                    <Flex align="center" gap={2} minW={0}>
                        <Box
                            w={8}
                            h={8}
                            borderRadius="full"
                            bg="green.50"
                            _dark={{ bg: 'green.900' }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <FaCodeFork size={12} color="green.500" />
                        </Box>
                        <Box>
                            <Text fontSize="xs" opacity={0.7} mb={0.5}>
                                {Content(experienceLang, 'category', 'forks')}:
                            </Text>
                            {loading ? (
                                <Skeleton
                                    variant="shine"
                                    h={5}
                                    w={12}
                                    rounded="md"
                                />
                            ) : (
                                <Text
                                    fontSize={{ base: 'md', md: 'lg' }}
                                    fontWeight="bold"
                                >
                                    {data.forks || 0}
                                </Text>
                            )}
                        </Box>
                    </Flex>

                    {data.licence !== 'None' && (
                        <Flex align="center" gap={2} minW={0}>
                            <Box
                                w={8}
                                h={8}
                                borderRadius="full"
                                bg="purple.50"
                                _dark={{ bg: 'purple.900' }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <TbLicense size={12} color="purple.500" />
                            </Box>
                            <Box>
                                <Text fontSize="xs" opacity={0.7} mb={0.5}>
                                    {Content(
                                        experienceLang,
                                        'category',
                                        'license'
                                    )}
                                    :
                                </Text>
                                {loading ? (
                                    <Skeleton
                                        variant="shine"
                                        h={5}
                                        w={20}
                                        rounded="md"
                                    />
                                ) : (
                                    <Text fontSize="sm" fontWeight="medium">
                                        {data.licence}
                                    </Text>
                                )}
                            </Box>
                        </Flex>
                    )}
                </Box>

                {/* Description */}
                {loading ? (
                    <Skeleton variant="shine" h={5} w="full" rounded="md" />
                ) : (
                    <Text
                        fontSize="sm"
                        lineHeight="1.6"
                        opacity={0.9}
                        noOfLines={2}
                    >
                        {data.description}
                    </Text>
                )}
            </Box>
        </MotionBox>
    )
}

const Github = () => {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    const [topRepos, setTopRepos] = useState(null)
    const [loadingTops, setLoadingTops] = useState(true)

    const [pinRepos, setPinRepos] = useState(null)
    const [loadingPin, setLoadingPin] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('/api/github/stats')
            .then(res => res.json())
            .then(item => {
                setStats(item)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        setLoadingTops(true)
        fetch('/api/github/top-repos')
            .then(res => res.json())
            .then(data => {
                setTopRepos(data)
                setLoadingTops(false)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setLoadingPin(true)
        fetch('/api/github/pin-repos')
            .then(res => res.json())
            .then(data => {
                setPinRepos(data)
                setLoadingPin(false)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(experienceLang, 'github', 'title')
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(experienceLang, 'github', 'title')}{' '}
                    <Badge>
                        <DateSetup date="present" />
                    </Badge>
                </Title>
                <P>{Content(githubLang, 'description', 'content')}</P>
                <List.Root ml={4} my={4} variant="plain">
                    <List.Item>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>
                            {Content(contentLang, 'info', 'type-education')}
                        </span>
                    </List.Item>
                    <List.Item>
                        <Meta>{Content(contentLang, 'info', 'link')}</Meta>
                        <CitationList list="my github" />
                    </List.Item>
                </List.Root>

                <SimpleGrid columns={[1, 1, 3]} mb={3} gap={2}>
                    <StatItem
                        loading={loading}
                        icon={<FaBook />}
                        category="repositories"
                        href="https://github.com/AndreM222?tab=repositories"
                        value={stats?.totalRepos}
                        delay={0.5}
                    />

                    <StatItem
                        loading={loading}
                        icon={<FaStar />}
                        category="stars"
                        href="https://github.com/AndreM222"
                        value={stats?.totalStars}
                        delay={0.2}
                    />

                    <StatItem
                        loading={loading}
                        icon={<FaCodeFork />}
                        category="forks"
                        href="https://github.com/AndreM222?tab=repositories"
                        value={stats?.totalForks}
                        delay={0.5}
                    />
                </SimpleGrid>

                <Heading as="h2" fontSize="2xl" variant="section-title">
                    {Content(githubLang, 'topRepos', 'title')}
                </Heading>
                <StyledDiv
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <Box display="grid" gap={2}>
                        {topRepos?.map(item => {
                            return (
                                <TopRepoSecton
                                    key={item.name}
                                    loading={loadingTops}
                                    data={item}
                                />
                            )
                        })}
                    </Box>
                </StyledDiv>

                <Heading as="h2" fontSize="2xl" variant="section-title">
                    {Content(githubLang, 'pinRepos', 'title')}
                </Heading>
                <StyledDiv
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <Box display="grid" gap={2}>
                        {pinRepos?.map(item => {
                            return (
                                <TopRepoSecton
                                    key={item.name}
                                    loading={loadingPin}
                                    data={item}
                                />
                            )
                        })}
                    </Box>
                </StyledDiv>
            </Container>
        </Layout>
    )
}

export default Github
