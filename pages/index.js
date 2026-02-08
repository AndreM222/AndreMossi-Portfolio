import { Container, Box, Heading } from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { TimeBox, TimeYear } from '../components/timeline'
import TimeSection from '../components/time-section'
import Layout from '../components/layouts/article'
import Content from '../components/content'
import indexLang from '../locales/pages/index.json'
import miscLang from '../locales/misc.json'
import DateSetup from '../components/dateSetup'
import StatsMenu from '../components/stats'
import NavBTN from '../components/Buttons/Navigation'
import { QuoteCard, quoteLength } from '../components/quoteCard'
import { useState, useEffect } from 'react'
import RecommendationSection from '../components/recommendationSection'
import AvatarIcon from '../components/avatarIcon'

const Page = () => {
    const [idQuote, setIdQuote] = useState(null)

    useEffect(() => {
        const random = Math.floor(Math.random() * quoteLength())
        setIdQuote(random)
    }, [])

    return (
        <Layout>
            <Container maxW={{ base: 'container.md', lg: '100%' }}>
                <Box maxW="container.md" m="auto">
                    <QuoteCard quoteNum={idQuote} />

                    <StatsMenu />

                    <Box
                        display={{ md: 'flex' }}
                        maxW="container.md"
                        my="auto"
                        mb={10}
                    >
                        <Box flexGrow={1}>
                            <Heading as="h2" variant="page-title">
                                {Content(miscLang, 'title', 'name')}
                            </Heading>
                            <p>{Content(indexLang, 'card', 'work')}</p>
                            <p>{Content(indexLang, 'card', 'type')}</p>
                        </Box>
                        <Box
                            flexShrink={0}
                            mt={{ base: 4, md: 0 }}
                            ml={{ md: 6 }}
                            align="center"
                        >
                            <AvatarIcon />
                        </Box>
                    </Box>
                </Box>
                <Section delay={0.1}>
                    <Heading as="h3" variant="section-title">
                        {Content(miscLang, 'category', 'about')}
                    </Heading>
                    <Paragraph>
                        {Content(indexLang, 'about', 'content')}
                    </Paragraph>
                </Section>

                <Section delay={0.2} align="right">
                    <Heading as="h3" variant="section-title">
                        {Content(miscLang, 'category', 'experience')}
                    </Heading>
                    <Paragraph>
                        {Content(indexLang, 'experience', 'content')}
                    </Paragraph>
                    <NavBTN href="/experience" />
                </Section>

                <Section delay={0.3}>
                    <Heading as="h3" variant="section-title">
                        {Content(miscLang, 'category', 'others')}
                    </Heading>
                    <Paragraph>
                        {Content(indexLang, 'others', 'content')}
                    </Paragraph>
                    <NavBTN href="/other" />
                </Section>

                <Heading
                    as="h2"
                    fontSize="2xl"
                    variant="section-title"
                    justifySelf="center"
                >
                    {Content(miscLang, 'category', 'recommendations')}
                </Heading>

                <RecommendationSection delay={0.4} />

                <TimeSection delay={0.5}>
                    <Heading as="h2" fontSize="2xl" variant="section-title">
                        {Content(indexLang, 'timeline', 'title')}
                    </Heading>
                    <TimeBox>
                        <TimeYear>
                            <DateSetup date="2016" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'first award')}
                    </TimeBox>
                    <TimeBox>
                        <TimeYear>
                            <DateSetup date="2019" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'president club')}
                    </TimeBox>
                    <TimeBox>
                        <TimeYear>
                            <DateSetup date="2020" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'second award')}
                    </TimeBox>
                    <TimeBox>
                        <TimeYear>
                            <DateSetup date="2023" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'dinant intern')}
                    </TimeBox>
                    <TimeBox>
                        <TimeYear>
                            <DateSetup date="2024 to 2025" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'tag research')}
                    </TimeBox>
                    <TimeBox>
                        <TimeYear>
                            <DateSetup date="2025" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'tag publication')}
                    </TimeBox>
                    <TimeBox>
                        <TimeYear>
                            <DateSetup date="2025" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'bachelor')}
                    </TimeBox>
                    <TimeBox last={true}>
                        <TimeYear>
                            <DateSetup date="2025 to present" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'isi-language-school')}
                    </TimeBox>
                </TimeSection>
            </Container>
        </Layout>
    )
}

export default Page
