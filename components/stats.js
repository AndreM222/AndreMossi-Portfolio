'use client'

import { chakra, Box, SimpleGrid, Skeleton, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { FaTrophy, FaBook, FaStar } from 'react-icons/fa'
import CountUp from 'react-countup'
import { isValidMotionProp, motion } from 'framer-motion'
import Content from '../components/content'

import experienceLang from '../locales/pages/experience.json'
import isPropValid from '@emotion/is-prop-valid'

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: prop => {
        return isValidMotionProp(prop) || isPropValid(prop)
    }
})

export const StatItem = ({ loading, icon, href, category, value, delay = 0 }) => (
    <StyledDiv
        key={loading ? "loading" : "loaded"}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay }}
    >
        <Box
            p={2}
            w="full"
            h={12}
            borderRadius="xl"
            bg={{ _light: 'whiteAlpha.900', _dark: 'whiteAlpha.100' }}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            boxShadow={{
                _light: '0 10px 30px rgba(0,0,0,0.12)',
                _dark: '0 10px 30px rgba(0,0,0,0.6)'
            }}
            display="flex"
            alignItems="center"
            gap={2}
            cursor="pointer"
            _hover={{
                boxShadow: `0 0 24px orange.400`,
                transform: 'translateY(-2px)'
            }}
            transition="all 0.3s ease"
            as={NextLink}
            alignContent="center"
            justifyItems="center"
            href={href}
        >
            <Box
                borderRadius="xl"
                display="flex"
                bg="none"
                alignItems="center"
                justifyContent="center"
            >
                {icon}
            </Box>

            <Box textAlign="center"  display="inline-flex" gap={2} alignContent="center">
                <Text
                    fontSize="md"
                    opacity={0.7}
                    letterSpacing="0.05em"
                >
                    {Content(
                        experienceLang,
                        'category',
                        category.toLowerCase()
                    )}
                </Text>
                {loading ? (
                    <Skeleton variant="shine" h={6} w={8} rounded="lg" />
                ) : (
                    <Text fontSize="md" fontWeight="bold">
                        <CountUp start={0} end={value || 0} />
                    </Text>
                )}
            </Box>
        </Box>
    </StyledDiv>
)

const StatsMenu = () => {
    const [stats, setStats] = useState(null)

    const [loading, setLoading] = useState(true)

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
