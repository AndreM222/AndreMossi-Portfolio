import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Section from '../components/section'
import { PracticeGridItem } from '../components/grid-item'
import Layout from '../components/layouts/article'
import Content from '../components/content'
import practiceLang from './assets/practice.json'

import thumbHarvard from '../public/images/practices/Harvard.png'
import thumbExtreme from '../public/images/practices/ExtremeNetworks.png'
import thumbGithub from '../public/images/practices/GitBanner.png'

const Practice = () => {
    return (
        <Layout title="Practices">
            <Container maxW="container.lg">
                <Heading as="h3">
                    {Content(practiceLang, 'title', 'name')}
                </Heading>
                <Divider my={6}/>

                <SimpleGrid columns={[1, 1, 3]} gap={6}>
                    <Section>
                        <PracticeGridItem
                            id="harvard"
                            title="Harvard"
                            thumbnail={thumbHarvard}
                        >
                            {Content(practiceLang, 'harvard', 'description')}
                        </PracticeGridItem>
                    </Section>
                    <Section>
                        <PracticeGridItem
                            id="extreme"
                            title="Extreme Networks"
                            thumbnail={thumbExtreme}
                        >
                            {Content(practiceLang, 'extreme-networks', 'description')}
                        </PracticeGridItem>
                    </Section>
                    <Section>
                        <PracticeGridItem
                            id="github"
                            title="Github"
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
