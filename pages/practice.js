import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Section from '../components/section'
import { PracticeGridItem } from '../components/grid-item'
import Layout from '../components/layouts/article'

import thumbHarvard from '../public/images/practices/Harvard.png'
import thumbExtreme from '../public/images/practices/ExtremeNetworks.png'
import thumbGithub from '../public/images/practices/GitBanner.png'

const Practice = () => {
    return (
        <Layout title="Practices">
            <Container maxW="container.md">
                <Heading as="h3">
                    Practices
                </Heading>
                <Divider my={6}/>

                <SimpleGrid columns={[1, 1, 3]} gap={6}>
                    <Section>
                        <PracticeGridItem
                            id="harvard"
                            title="Harvard"
                            thumbnail={thumbHarvard}
                        >
                            Online harvard class for introduction to computer
                            science.
                        </PracticeGridItem>
                    </Section>
                    <Section>
                        <PracticeGridItem
                            id="extreme"
                            title="Extreme Networks"
                            thumbnail={thumbExtreme}
                        >
                            Practiced online for my networks class.
                        </PracticeGridItem>
                    </Section>
                    <Section>
                        <PracticeGridItem
                            id="github"
                            title="Github"
                            thumbnail={thumbGithub}
                        >
                            Projects for practice and fun.
                        </PracticeGridItem>
                    </Section>
                </SimpleGrid>
            </Container>
        </Layout>
    )
}

export default Practice
