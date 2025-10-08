import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Section from '../components/section'
import { ExperienceGridItem } from '../components/grid-item'
import Layout from '../components/layouts/article'
import Content from '../components/content'

import experienceLang from '../locales/pages/experience.json'
import miscLang from '../locales/misc.json'
import contentLang from '../locales/experience-content.json'

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
                            title={Content(experienceLang, 'dinant', 'title')}
                            thumbnail={Content(experienceLang, 'dinant', 'img-url')}
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
                            title={Content(experienceLang, 'ai-sandbox', 'title')}
                            thumbnail={Content(experienceLang, 'ai-sandbox', 'img-url')}
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
                            title={Content(experienceLang, 'dowal-competition-2020', 'title')}
                            thumbnail={Content(experienceLang, 'dowal-competition-2020', 'img-url')}
                        >
                            {Content(experienceLang, 'dowal-competition-2020', 'description')}
                        </ExperienceGridItem>
                    </Section>

                    <Section delay={0.2}>
                        <ExperienceGridItem
                            id="dowal2016"
                            title={Content(experienceLang, 'dowal-competition-2016', 'title')}
                            thumbnail={Content(experienceLang, 'dowal-competition-2016', 'img-url')}
                        >
                            {Content(experienceLang, 'dowal-competition-2016', 'description')}
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
                            title={Content(experienceLang, 'traceability', 'title')}
                            thumbnail={Content(experienceLang, 'traceability', 'img-url')}
                        >
                            {Content(experienceLang, 'traceability', 'description')}
                        </ExperienceGridItem>
                    </Section>

                    <Section delay={0.3}>
                        <ExperienceGridItem
                            id="gannon"
                            title={Content(experienceLang, 'gannon', 'title')}
                            thumbnail={Content(experienceLang, 'gannon', 'img-url')}
                        >
                            {Content(experienceLang, 'gannon', 'description')}
                        </ExperienceGridItem>
                    </Section>

                    <Section delay={0.3}>
                        <ExperienceGridItem
                            id="harvard"
                            title={Content(experienceLang, 'harvard', 'title')}
                            thumbnail={Content(experienceLang, 'harvard', 'img-url')}
                        >
                            {Content(experienceLang, 'harvard', 'description')}
                        </ExperienceGridItem>
                    </Section>

                    <Section delay={0.3}>
                        <ExperienceGridItem
                            id="extreme"
                            title={Content(experienceLang, 'extreme-networks', 'title')}
                            thumbnail={Content(experienceLang, 'extreme-networks', 'img-url')}
                        >
                            {Content(experienceLang, 'extreme-networks', 'description')}
                        </ExperienceGridItem>
                    </Section>

                    <Section delay={0.3}>
                        <ExperienceGridItem
                            id="github"
                            title={Content(experienceLang, 'github', 'title')}
                            thumbnail={Content(experienceLang, 'github', 'img-url')}
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
