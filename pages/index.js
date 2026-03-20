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
import { QRCodeButton } from '../components/QRCodeViwer'
import { useRouter, useSearchParams } from 'next/navigation'

const Page = () => {
    const [idQuote, setIdQuote] = useState(null)
    const [isOpen, setOpen] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const random = Math.floor(Math.random() * quoteLength())
        setIdQuote(random)
    }, [])

    useEffect(() => {
        if (searchParams.get('entry') === 'nfc' && !isOpen) {
            const newUrl = new URL(window.location.href)
            newUrl.searchParams.delete('entry')
            router.replace(newUrl.toString())

            setOpen(true)
        }
    }, [searchParams, isOpen, router])

    return (
        <Layout>
            <Container maxW={{ base: '2xl', lg: '100%' }}>
                <Box maxW="2xl" m="auto">
                    <QuoteCard quoteNum={idQuote} />

                    <StatsMenu />

                    <Box
                        display={{ base: 'block', md: 'flex' }}
                        maxW="2xl"
                        mb={10}
                    >
                        <Box flexGrow={1}>
                            <Heading size="4xl">
                                {Content(miscLang, 'title', 'name')}
                            </Heading>
                            {Content(miscLang, 'title', 'subname') && (
                                <Box mt={-2} mb={1} fontSize="lg" opacity={0.9}>
                                    {Content(miscLang, 'title', 'subname')}
                                </Box>
                            )}
                            <p>{Content(indexLang, 'card', 'work')}</p>
                            <p>{Content(indexLang, 'card', 'type')}</p>
                        </Box>
                        <Box
                            flexShrink={0}
                            mt={{ base: 6, md: 0 }}
                            ml={{ md: 6 }}
                            display="flex"
                            justifyContent={{
                                base: 'center',
                                md: 'flex-start'
                            }}
                        >
                            <QRCodeButton
                                isOpen={isOpen}
                                setOpen={setOpen}
                                variant="ghost"
                                borderRadius="full"
                                w="auto"
                                h="auto"
                                p={0}
                                _hover={{ bg: 'transparent' }}
                            >
                                <AvatarIcon />
                            </QRCodeButton>
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
                    <TimeBox index={0}>
                        <TimeYear>
                            <DateSetup date="2016" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'first award')}
                    </TimeBox>
                    <TimeBox index={1}>
                        <TimeYear>
                            <DateSetup date="2019" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'president club')}
                    </TimeBox>
                    <TimeBox index={2}>
                        <TimeYear>
                            <DateSetup date="2020" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'second award')}
                    </TimeBox>
                    <TimeBox index={3}>
                        <TimeYear>
                            <DateSetup date="2023" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'dinant intern')}
                    </TimeBox>
                    <TimeBox index={4}>
                        <TimeYear>
                            <DateSetup date="2024 to 2025" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'tag research')}
                    </TimeBox>
                    <TimeBox index={5}>
                        <TimeYear>
                            <DateSetup date="2025" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'tag publication')}
                    </TimeBox>
                    <TimeBox index={6}>
                        <TimeYear>
                            <DateSetup date="2025" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'bachelor')}
                    </TimeBox>
                    <TimeBox index={7}>
                        <TimeYear>
                            <DateSetup date="2025 to 2026" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'isi-language-school')}
                    </TimeBox>
                </TimeSection>
            </Container>
        </Layout>
    )
}

export default Page
