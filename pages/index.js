import {
    Container,
    Box,
    Heading,
    Image,
    useColorModeValue
} from '@chakra-ui/react'
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

const Page = () => {
    return (
        <Layout>
            <Container maxW={{ base: 'container.md', lg: '100%' }}>
                <Box maxW="container.md" m="auto">
                    <Box
                        boxShadow="lg"
                        maxW="container.md"
                        borderRadius="lg"
                        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
                        p={3}
                        mb={10}
                        align="center"
                        css={{ backdropFilter: 'blur(10px)' }}
                    >
                        {Content(indexLang, 'quote', 'content')}
                        <Box display="inline-flex" alignItems="center">
                            <Box
                                width="20px"
                                height="4px"
                                borderRadius="lg"
                                mr={2}
                                bg={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
                            />{' '}
                            {Content(indexLang, 'quote', 'author')}
                        </Box>
                    </Box>

                    <StatsMenu />

                    <Box display={{ md: 'flex' }} maxW="container.md" my="auto" mb={10}>
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
                            <Image
                                borderColor="whiteAlpha.800"
                                borderWidth={2}
                                borderStyle="solid"
                                maxWidth="100px"
                                display="inline-block"
                                borderRadius="full"
                                src="/images/PortfolioPic.png"
                                alt="Profile Image"
                            />
                        </Box>
                    </Box>
                </Box>
                <Section delay={0.1}>
                    <Heading as="h3" variant="section-title">
                        {Content(miscLang, 'category', 'about')}
                    </Heading>
                    <Paragraph>{Content(indexLang, 'about', 'content')}</Paragraph>
                </Section>

                <Section delay={0.2} align="right">
                    <Heading as="h3" variant="section-title">
                        {Content(miscLang, 'category', 'experience')}
                    </Heading>
                    <Paragraph>{Content(indexLang, 'experience', 'content')}</Paragraph>
                    <NavBTN href="/experience" />
                </Section>

                <Section delay={0.3}>
                    <Heading as="h3" variant="section-title">
                        {Content(miscLang, 'category', 'others')}
                    </Heading>
                    <Paragraph>{Content(indexLang, 'others', 'content')}</Paragraph>
                    <NavBTN href="/other" />
                </Section>

                <TimeSection delay={0.4}>
                    <Heading as="h2" fontSize="2xl" variant="section-title">
                        {Content(indexLang, 'timeline', 'title')}
                    </Heading>
                    <TimeBox>
                        <TimeYear>
                            <DateSetup date="2002" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'origin')}
                    </TimeBox>
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
                    <TimeBox last={true}>
                        <TimeYear>
                            <DateSetup date="2022 to 2025" />
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'bachelor')}
                    </TimeBox>
                </TimeSection>
            </Container>
        </Layout>
    )
}

export default Page
