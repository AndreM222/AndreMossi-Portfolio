import { Container, Heading, Divider } from '@chakra-ui/react'
import { GridItem } from '../components/grid-item'
import Section from '../components/section'
import Layout from '../components/layouts/article'
import Paragraph from '../components/paragraph'
import thumbNvim from '../public/images/others/Terminal-Preview.png'
import Content from '../components/content'
import othersLang from './assets/other.json'
import miscLang from './assets/misc.json'

const Other = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'others'),
            ].join(' ')}
        >
            <Container>
                <Heading as="h3">
                    {Content(miscLang, 'category', 'others')}
                </Heading>{' '}

                <Divider my={6} />

                <Section delay={0.1} align='left'>
                    <Paragraph>
                        {Content(othersLang, 'description', 'content')}
                    </Paragraph>
                </Section>

                <Section delay={0.2}>
                    <Heading as="h3" variant="section-title">
                        {Content(othersLang, 'editor', 'title')}
                    </Heading>
                    <Paragraph>
                        {Content(othersLang, 'editor', 'description')}
                    </Paragraph>
                </Section>

                <Section delay={0.3}>
                    <GridItem
                        href="https://github.com/AndreM222/Windows-Dotfiles"
                        title={Content(othersLang, 'thumbnail', 'title')}
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
