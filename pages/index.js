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
                        mb={6}
                        align="center"
                    >
                        Hello, I&apos;m a full-stack developer
                    </Box>

                    <Box display={{ md: 'flex' }} maxW="container.md" m="auto">
                        <Box flexGrow={1}>
                            <Heading as="h2" variant="page-title">
                                André Mossi
                            </Heading>
                            <p> Programmer | Artist | Designer </p>
                            <p> Software & Game Dev </p>
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
                        About
                    </Heading>
                    <Paragraph>
                        I am currently a University Student at Gannon University
                        studying Computer Science. I was inspired to start this
                        journey since I was in highschool after watching a video
                        regarding programming. At that moment I knew that this
                        was the path which I yearn to walk, no matter what
                        challenges might step in my way.
                    </Paragraph>
                </Section>

                <Section delay={0.2} align="right">
                    <Heading as="h3" variant="section-title">
                        Practice
                    </Heading>
                    <Paragraph>
                        Besides the homeworks given in class I try to obtain
                        more experiene by doing my own projects. I have taken
                        some online classes which two of them have given me
                        certificates while the others where just practice.
                        Besides classes I tried to adventure myself by making a
                        sorting algorithm for excel files, some websites to
                        improve my abilities not just as back-end but also
                        front-end, etc. I love exploring new languages and
                        taking up new challenges.
                    </Paragraph>
                    <Box align="center" my={4}>
                        <Button
                            as={NextLink}
                            href="/practice"
                            rightIcon={<ChevronRightIcon />}
                            colorScheme="orange"
                        >
                            More
                        </Button>
                    </Box>
                </Section>

                <Section delay={0.3}>
                    <Heading as="h3" variant="section-title">
                        Others
                    </Heading>
                    <Paragraph>
                        My main editor is Neovim but I also have experience
                        using Visual Studio, VSCode, and InteliJ. I started
                        using Neovim because I had heard that it was very
                        powerful but too complicated to learn, I am the type of
                        person who enjoys challenges and took on the challenge
                        of learning it. The language I enjoy programming the
                        most is C++ but I am also familiar with other languages
                        and love learning more.
                    </Paragraph>
                    <Box align="center" my={4}>
                        <Button
                            as={NextLink}
                            href="/other"
                            rightIcon={<ChevronRightIcon />}
                            colorScheme="orange"
                        >
                            More
                        </Button>
                    </Box>
                </Section>

                <TimeSection delay={0.4}>
                    <Heading as="h3" variant="section-title">
                        Timeline
                    </Heading>
                    <TimeBox>
                        <TimeYear>2002</TimeYear>
                        Born in Honduras, Tegucigalpa
                    </TimeBox>
                    <TimeBox>
                        <TimeYear>2016</TimeYear>
                        School award, Software Development
                    </TimeBox>
                    <TimeBox>
                        <TimeYear>2020</TimeYear>
                        President of the school computer club
                    </TimeBox>
                    <TimeBox last={true}>
                        <TimeYear>2022 To Present</TimeYear>
                        Student at Gannon University
                    </TimeBox>
                </TimeSection>
            </Container>
        </Layout>
    )
}

export default Page
