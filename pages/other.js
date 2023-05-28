import { Container, Heading, Divider } from '@chakra-ui/react'
import { GridItem } from "../components/grid-item"
import Section from '../components/section'
import Layout from '../components/layouts/article'
import Paragraph from '../components/paragraph'
import thumbNvim from "../public/images/others/Terminal-Preview.png"
import Content from '../components/content'
import othersLang from './assets/other.json'

const Other = () => {
    return (
        <Layout title="Others">
            <Container>
                <Heading as="h3">{Content(othersLang, 'title', 'name')}</Heading>
                <Divider my={6} />

                <Section delay={0.1}>
                    <Paragraph>
                        {Content(othersLang, 'description', 'content')}
                    </Paragraph>
                </Section>

                <Section delay={0.2}>
                    <Heading as="h3" variant="section-title">
                        Editor
                    </Heading>
                    <Paragraph>
                        {Content(othersLang, 'editor', 'description')}
                    </Paragraph>
                </Section>
                <Section delay={0.3}>
                    <GridItem
                        href="https://github.com/AndreM222/Windows-Dotfiles"
                        title="Windows Dotfiles"
                        thumbnail={thumbNvim}
                    >
                        {Content(othersLang, 'thumbnail', 'description')}
                    </GridItem>
                </Section>
            </Container>
        </Layout>
    )
}

export default Other
