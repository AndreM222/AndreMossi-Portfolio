import {
    Container,
    Badge,
    List,
    ListItem,
    chakra,
    shouldForwardProp,
    Box,
    SimpleGrid,
    Skeleton,
    useColorModeValue,
    Heading
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
import CountUp from 'react-countup'
import { motion } from 'framer-motion'

import githubLang from '../../locales/pages/experiences/github.json'
import contentLang from '../../locales/experience-content.json'
import miscLang from '../../locales/misc.json'
import experienceLang from '../../locales/pages/experience.json'

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: prop => {
        return shouldForwardProp(prop) || prop === 'transition'
    }
})

const StatItem = ({ loading, icon, href, category, value, delay = 0 }) => (
    <StyledDiv
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: delay }}
    >
        <Box
            w="full"
            bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
            borderStyle="solid"
            borderColor={useColorModeValue('blackAlpha.800', 'whiteAlpha.500')}
            boxShadow="lg"
            borderWidth={2}
            display="inline-flex"
            gap={1}
            h={10}
            justifyContent="center"
            rounded="lg"
            alignItems="center"
            as={NextLink}
            href={href}
        >
            {icon}
            <span>
                {Content(experienceLang, 'category', category.toLowerCase())}
            </span>
            {loading ? (
                <Skeleton h={5} w={20} rounded="lg" />
            ) : (
                <CountUp start={0} end={value || 0} />
            )}
        </Box>
    </StyledDiv>
)

const TopRepoSecton = ({ loading, data, ...props }) => {
    return (
        <Box
            w="full"
            bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
            borderStyle="solid"
            borderColor={useColorModeValue('blackAlpha.800', 'whiteAlpha.500')}
            boxShadow="lg"
            borderWidth={2}
            display="grid"
            rounded="lg"
            p={2}
            alignItems="center"
            as={NextLink}
            href={data.url}
            {...props}
        >
            <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Heading size="md" variant="repo-title">
                    {data.name}
                </Heading>
                <Heading
                    display={
                        data.language && data.language !== 'Unknown'
                            ? ''
                            : 'none'
                    }
                    fontSize="10px"
                    bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
                    borderStyle="solid"
                    borderWidth={2}
                    borderColor={useColorModeValue(
                        'blackAlpha.800',
                        'whiteAlpha.500'
                    )}
                    p={1}
                    borderRadius={5}
                    w="fit-content"
                >
                    {loading ? (
                        <Skeleton h={5} w={20} rounded="lg" />
                    ) : (
                        data.language
                    )}
                </Heading>
            </Box>

            <Box
                display="flex"
                gap={3}
                fontSize="sm"
                flexWrap="wrap"
                rowGap={0}
            >
                <Box display="inline-flex" alignItems="center" gap={1}>
                    <FaStar />
                    <span>{Content(experienceLang, 'category', 'stars')}:</span>
                    {loading ? (
                        <Skeleton h={5} w={20} rounded="lg" />
                    ) : (
                        <CountUp start={0} end={data.stars || 0} />
                    )}
                </Box>
                <Box display="inline-flex" alignItems="center" gap={1}>
                    <FaCodeFork />
                    <span>{Content(experienceLang, 'category', 'forks')}:</span>
                    {loading ? (
                        <Skeleton h={5} w={20} rounded="lg" />
                    ) : (
                        <CountUp start={0} end={data.forks || 0} />
                    )}
                </Box>
                <Box
                    display={data.licence === 'None' ? 'none' : 'inline-flex'}
                    alignItems="center"
                    gap={1}
                >
                    <TbLicense />
                    <span>
                        {Content(experienceLang, 'category', 'license')}:
                    </span>
                    {loading ? (
                        <Skeleton h={5} w={20} rounded="lg" />
                    ) : (
                        data.licence
                    )}
                </Box>
            </Box>
            <Box alignItems="center" gap={1} mt={3}>
                {loading ? (
                    <Skeleton h={5} w={20} rounded="lg" />
                ) : (
                    data.description
                )}
            </Box>
        </Box>
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
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>
                            {Content(contentLang, 'info', 'type-education')}
                        </span>
                    </ListItem>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'link')}</Meta>
                        <CitationList list="my github" />
                    </ListItem>
                </List>

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
