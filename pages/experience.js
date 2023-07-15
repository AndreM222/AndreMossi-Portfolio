import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Section from '../components/section'
import { ExperienceGridItem } from '../components/grid-item'
import Layout from '../components/layouts/article'
import Content from '../components/content'

import experienceLang from './assets/experience.json'
import miscLang from './assets/misc.json'
import contentLang from './assets/experience-content.json'

import thumbHarvard from '../public/images/experiences/Harvard.png'
import thumbExtreme from '../public/images/experiences/ExtremeNetworks.png'
import thumbGithub from '../public/images/experiences/GitBanner.png'
import thumbDinant from '../public/images/experiences/Dinant.png'

const Experience = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
            ].join(' ')}
        >
            <Container maxW="container.lg">
                <Heading as="h3">
                    {Content(miscLang, 'category', 'experience')}
                </Heading>
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
                    {Content(experienceLang, 'category', 'practice')}
                </Heading>

                <SimpleGrid columns={[1, 1, 3]} gap={6}>
                    <Section>
                        <ExperienceGridItem
                            id="harvard"
                            title={Content(contentLang, 'title', 'harvard')}
                            thumbnail={thumbHarvard}
                        >
                            {Content(experienceLang, 'harvard', 'description')}
                        </ExperienceGridItem>
                    </Section>
                    <Section>
                        <ExperienceGridItem
                            id="extreme"
                            title={Content(contentLang, 'title', 'extreme')}
                            thumbnail={thumbExtreme}
                        >
                            {Content(
                                experienceLang,
                                'extreme-networks',
                                'description'
                            )}
                        </ExperienceGridItem>
                    </Section>
                    <Section>
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
