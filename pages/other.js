import { Container, Heading, Divider } from '@chakra-ui/react'
import { GridItem } from '../components/grid-item'
import Section from '../components/section'
import Layout from '../components/layouts/article'
import Paragraph from '../components/paragraph'
import thumbNvim from '../public/images/others/Terminal-Preview.png'
import thumbJapan from '../public/images/others/Japan-Byakutan.png'
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
            <Container maxW={{ base: "container.md", lg: "70%" }}>
                <Heading as="h3">
                    {Content(miscLang, 'category', 'others')}
                </Heading>{' '}

                <Divider my={6} />

                <Section delay={0.1}>
                    <Heading as="h3" variant="section-title">
                        {Content(othersLang, 'beginning', 'title')}
                    </Heading>
                    <Paragraph>
                        {Content(othersLang, 'beginning', 'content')}
                    </Paragraph>
                </Section>

                <Section delay={0.2} align='right'>
                    <Heading as="h3" variant="section-title">
                        {Content(othersLang, 'editor', 'title')}
                    </Heading>
                    <Paragraph>
                        {Content(othersLang, 'editor', 'description')}
                    </Paragraph>
                    <GridItem
                        href="https://github.com/AndreM222/Windows-Dotfiles"
                        title={Content(othersLang, 'thumbnailEditor', 'title')}
                        thumbnail={thumbNvim}
                    >
                        {Content(othersLang, 'thumbnailEditor', 'description')}
                    </GridItem>
                </Section>

                <Section delay={0.3}>
                    <Heading as="h3" variant="section-title">
                        {Content(othersLang, 'culture', 'title')}
                    </Heading>
                    <Paragraph>
                        {Content(othersLang, 'culture', 'content')}
                    </Paragraph>
                    <GridItem
                        href="https://www.instagram.com/yakinikubyakutan/"
                        title={Content(othersLang, 'thumbnailCulture', 'title')}
                        thumbnail={thumbJapan}
                    >
                        {Content(othersLang, 'thumbnailCulture', 'description')}
                    </GridItem>
                </Section>
            </Container>
        </Layout>
    )
}

export default Other
