import {
    Button,
    Container,
    Box,
    Heading,
    Image,
    useColorModeValue,
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { ChevronRightIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { TimeBox, TimeYear } from '../components/timeline'
import TimeSection from '../components/time-section'
import Layout from '../components/layouts/article'
import { motion } from 'framer-motion'
import Content from '../components/content'
import indexLang from './assets/index.json'
import miscLang from './assets/misc.json'

const Page = () => {
    return (
        <Layout>
            <Container maxW={{ base: 'container.md', lg: '100%' }}>
                <Box maxW="container.md" m="auto">
                    <Box
                        boxShadow="lg"
                        maxW="container.md"
                        borderRadius="lg"
                        bg={useColorModeValue(
                            'whiteAlpha.500',
                            'whiteAlpha.200'
                        )}
                        p={3}
                        mb={10}
                        align="center"
                        css={{ backdropFilter: 'blur(10px)' }}
                    >
                        {Content(indexLang, 'quote', 'content')}
                        <p>{Content(indexLang, 'quote', 'author')}</p>
                    </Box>

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
                            <motion.div
                                initial={{ scale: 0, rotate: 180 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 20,
                                }}
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
                            </motion.div>
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
                    <Box align="center" my={4}>
                        <Button
                            as={NextLink}
                            href="/experience"
                            rightIcon={<ChevronRightIcon />}
                            colorScheme="orange"
                        >
                            {Content(miscLang, 'button', 'content')}
                        </Button>
                    </Box>
                </Section>

                <Section delay={0.3}>
                    <Heading as="h3" variant="section-title">
                        {Content(miscLang, 'category', 'others')}
                    </Heading>
                    <Paragraph>
                        {Content(indexLang, 'others', 'content')}
                    </Paragraph>
                    <Box align="center" my={4}>
                        <Button
                            as={NextLink}
                            href="/other"
                            rightIcon={<ChevronRightIcon />}
                            colorScheme="orange"
                        >
                            {Content(miscLang, 'button', 'content')}
                        </Button>
                    </Box>
                </Section>

                <TimeSection delay={0.4}>
                    <Heading as="h2" fontSize="2xl" variant="section-title">
                        {Content(indexLang, 'timeline', 'title')}
                    </Heading>
                    <TimeBox>
                        <TimeYear>2002</TimeYear>
                        {Content(indexLang, 'timeline', 'first')}
                    </TimeBox>
                    <TimeBox>
                        <TimeYear>2016</TimeYear>
                        {Content(indexLang, 'timeline', 'second')}
                    </TimeBox>
                    <TimeBox>
                        <TimeYear>2019</TimeYear>
                        {Content(indexLang, 'timeline', 'third')}
                    </TimeBox>
                    <TimeBox>
                        <TimeYear>2020</TimeYear>
                        {Content(indexLang, 'timeline', 'fourth')}
                    </TimeBox>
                    <TimeBox>
                        <TimeYear>2023</TimeYear>
                        {Content(indexLang, 'timeline', 'fifth')}
                    </TimeBox>
                    <TimeBox last={true}>
                        <TimeYear>
                            {Content(indexLang, 'timeline', 'sixth-time')}
                        </TimeYear>
                        {Content(indexLang, 'timeline', 'sixth')}
                    </TimeBox>
                </TimeSection>
            </Container>
        </Layout>
    )
}

export default Page
