'use client'

import {
    chakra,
    shouldForwardProp,
    Box,
    SimpleGrid,
    Skeleton,
    useColorModeValue
} from '@chakra-ui/react'
import { fetchStats } from '../api/gitAPI'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { FaTrophy, FaBook, FaStar } from 'react-icons/fa'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import Content from '../components/content'

import experienceLang from '../locales/pages/experience.json'

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
            h={10}
            gap={1}
            rounded="lg"
            justifyContent="center"
            alignItems="center"
            as={NextLink}
            href={href}
        >
            {icon}
            <span>{Content(experienceLang, 'category', category.toLowerCase())}</span>
            {loading ? (
                <Skeleton h={5} w={20} rounded="lg" />
            ) : (
                    <CountUp start={0} end={value || 0} />
                )}
        </Box>
    </StyledDiv>
)

const StatsMenu = () => {
    const [stats, setStats] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetchStats()
            .then(item => {
                setStats(item)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <SimpleGrid columns={[1, 3]} mb={3} gap={2}>
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
                icon={<FaTrophy />}
                category="awards"
                href="/experience"
                value={stats?.totalAwards}
                delay={0.5}
            />
        </SimpleGrid>
    )
}

export default StatsMenu
