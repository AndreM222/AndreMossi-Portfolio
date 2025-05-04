import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Section from '../components/section'
import { ExperienceGridItem } from '../components/grid-item'
import Layout from '../components/layouts/article'
import Content from '../components/content'

import experienceLang from '../locales/pages/experience.json'
import miscLang from '../locales/misc.json'
import contentLang from '../locales/experience-content.json'

import thumbHarvard from '/public/images/experiences/Banners/Harvard-Banner.png'
import thumbTraceability from '/public/images/experiences/Banners/Traceability-Banner.png'
import thumbExtreme from '/public/images/experiences/Banners/ExtremeNetworks-Banner.png'
import thumbGithub from '/public/images/experiences/Banners/Git-Banner.png'
import thumbDinant from '/public/images/experiences/Banners/Dinant-Banner.png'
import thumbAISandbox from '/public/images/experiences/Banners/AI-Sandbox-Banner.png'
import thumbDowal2016 from '/public/images/experiences/Banners/Dowal-2016p-Banner.png'
import thumbDowal2020 from '/public/images/experiences/Banners/Dowal-2020p-Banner.png'

const Experience = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience')
            ].join(' ')}
        >
            <Container maxW="container.lg">
                <Heading as="h3">{Content(miscLang, 'category', 'experience')}</Heading>
                <Divider my={6} />

                <Heading as="h2" fontSize={25} my={6}>
                    {Content(experienceLang, 'category', 'internship')}
                </Heading>

                <SimpleGrid columns={[1, 1, 3]} gap={6}>
                    <Section>
                        <ExperienceGridItem
                            id="dinant"
                            title={Content(contentLang, 'title', 'dinant')}
                            thumbnail={thumbDinant}
                        >
                            {Content(experienceLang, 'dinant', 'description')}
                        </ExperienceGridItem>
                    </Section>
                </SimpleGrid>

                <Heading as="h2" fontSize={25} my={6}>
                    {Content(experienceLang, 'category', 'research')}
                </Heading>

                <SimpleGrid columns={[1, 1, 3]} gap={6}>
                    <Section delay={0.1}>
                        <ExperienceGridItem
                            id="ai-sandbox"
                            title={Content(contentLang, 'title', 'ai-sandbox')}
                            thumbnail={thumbAISandbox}
                        >
                            {Content(experienceLang, 'ai-sandbox', 'description')}
                        </ExperienceGridItem>
                    </Section>
                </SimpleGrid>

                <Heading as="h2" fontSize={25} my={6}>
                    {Content(experienceLang, 'category', 'awards')}
                </Heading>

                <SimpleGrid columns={[1, 1, 3]} gap={6}>
                    <Section delay={0.2}>
                        <ExperienceGridItem
                            id="dowal2020"
                            title={Content(contentLang, 'title', 'dowal-2020')}
                            thumbnail={thumbDowal2020}
                        >
                            {Content(experienceLang, 'dowal-competition', 'description')}
                        </ExperienceGridItem>
                    </Section>

                    <Section delay={0.2}>
                        <ExperienceGridItem
                            id="dowal2016"
                            title={Content(contentLang, 'title', 'dowal-2016')}
                            thumbnail={thumbDowal2016}
                        >
                            {Content(experienceLang, 'dowal-competition', 'description')}
                        </ExperienceGridItem>
                    </Section>
                </SimpleGrid>

                <Heading as="h2" fontSize={25} my={6}>
                    {Content(experienceLang, 'category', 'practice')}
                </Heading>

                <SimpleGrid columns={[1, 1, 3]} gap={6}>
                    <Section delay={0.3}>
                        <ExperienceGridItem
                            id="traceability"
                            title={Content(contentLang, 'title', 'traceability')}
                            thumbnail={thumbTraceability}
                        >
                            {Content(experienceLang, 'traceability', 'description')}
                        </ExperienceGridItem>
                    </Section>

                    <Section delay={0.3}>
                        <ExperienceGridItem
                            id="harvard"
                            title={Content(contentLang, 'title', 'harvard')}
                            thumbnail={thumbHarvard}
                        >
                            {Content(experienceLang, 'harvard', 'description')}
                        </ExperienceGridItem>
                    </Section>

                    <Section delay={0.3}>
                        <ExperienceGridItem
                            id="extreme"
                            title={Content(contentLang, 'title', 'extreme')}
                            thumbnail={thumbExtreme}
                        >
                            {Content(experienceLang, 'extreme-networks', 'description')}
                        </ExperienceGridItem>
                    </Section>

                    <Section delay={0.3}>
                        <ExperienceGridItem
                            id="github"
                            title={Content(contentLang, 'title', 'github')}
                            thumbnail={thumbGithub}
                        >
                            {Content(experienceLang, 'github', 'description')}
                        </ExperienceGridItem>
                    </Section>
                </SimpleGrid>
            </Container>
        </Layout>
    )
}

export default Experience
