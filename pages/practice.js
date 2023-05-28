import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Section from '../components/section'
import { PracticeGridItem } from '../components/grid-item'
import Layout from '../components/layouts/article'
import Content from '../components/content'

import practiceLang from './assets/practice.json'
import miscLang from './assets/misc.json'
import contentLang from './assets/practice-content.json'

import thumbHarvard from '../public/images/practices/Harvard.png'
import thumbExtreme from '../public/images/practices/ExtremeNetworks.png'
import thumbGithub from '../public/images/practices/GitBanner.png'

const Practice = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'practice'),
            ].join(' ')}
        >
            <Container maxW="container.lg">
                <Heading as="h3">
                    {Content(miscLang, 'category', 'practice')}
                </Heading>
                <Divider my={6} />

                <SimpleGrid columns={[1, 1, 3]} gap={6}>
                    <Section>
                        <PracticeGridItem
                            id="harvard"
                            title={Content(contentLang, 'title', 'harvard')}
                            thumbnail={thumbHarvard}
                        >
                            {Content(practiceLang, 'harvard', 'description')}
                        </PracticeGridItem>
                    </Section>
                    <Section>
                        <PracticeGridItem
                            id="extreme"
                            title={Content(contentLang, 'title', 'extreme')}
                            thumbnail={thumbExtreme}
                        >
                            {Content(
                                practiceLang,
                                'extreme-networks',
                                'description'
                            )}
                        </PracticeGridItem>
                    </Section>
                    <Section>
                        <PracticeGridItem
                            id="github"
                            title={Content(contentLang, 'title', 'github')}
                            thumbnail={thumbGithub}
                        >
                            {Content(practiceLang, 'github', 'description')}
                        </PracticeGridItem>
                    </Section>
                </SimpleGrid>
            </Container>
        </Layout>
    )
}

export default Practice
