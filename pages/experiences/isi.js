import { Container, Badge, List, Box, Heading } from '@chakra-ui/react'
import { Title, Meta, ThumbImage } from '../../components/experience'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import ExperienceList from '../../components/experienceList'
import DateSetup from '../../components/dateSetup'

import isiLang from '../../locales/pages/experiences/isi.json'
import contentLang from '../../locales/experience-content.json'
import experienceLang from '../../locales/pages/experience.json'
import miscLang from '../../locales/misc.json'

const Isi = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(experienceLang, 'isi', 'title')
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(experienceLang, 'isi', 'title')}{' '}
                    <Badge>
                        <DateSetup date="2026" />
                    </Badge>
                </Title>

                <Paragraph>
                    {Content(isiLang, 'description', 'content')}
                </Paragraph>

                <Box display="grid" gridRowGap={5}>
                    <Box
                        display={
                            Content(isiLang, 'languageTraining', 'content') ===
                                ' '
                                ? 'none'
                                : ''
                        }
                    >
                        <Heading size="sm">
                            {Content(isiLang, 'languageTraining', 'content')}
                        </Heading>
                        <List.Root gap={1} listStyleType="disc" ml={4}>
                            {Content(isiLang, 'languageTraining', 'list')?.map(
                                (item, index) => (
                                    <List.Item key={index}>{item}</List.Item>
                                )
                            )}
                        </List.Root>
                    </Box>

                    <Box
                        display={
                            Content(isiLang, 'crossCultural', 'content') === ' '
                                ? 'none'
                                : ''
                        }
                    >
                        <Heading size="sm">
                            {Content(isiLang, 'crossCultural', 'content')}
                        </Heading>
                        <List.Root gap={1} listStyleType="disc" ml={4}>
                            {Content(isiLang, 'crossCultural', 'list')?.map(
                                (item, index) => (
                                    <List.Item key={index}>{item}</List.Item>
                                )
                            )}
                        </List.Root>
                    </Box>

                    <Box
                        display={
                            Content(isiLang, 'disciplineGrowth', 'content') ===
                                ' '
                                ? 'none'
                                : ''
                        }
                    >
                        <Heading size="sm">
                            {Content(isiLang, 'disciplineGrowth', 'content')}
                        </Heading>
                        <List.Root gap={1} listStyleType="disc" ml={4}>
                            {Content(isiLang, 'disciplineGrowth', 'list')?.map(
                                (item, index) => (
                                    <List.Item key={index}>{item}</List.Item>
                                )
                            )}
                        </List.Root>
                    </Box>
                </Box>

                <List.Root ml={4} my={4} variant="plain">
                    <List.Item>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>
                            {Content(contentLang, 'info', 'type-education')}
                        </span>
                    </List.Item>

                    <List.Item>
                        <Meta>{Content(contentLang, 'info', 'content')}</Meta>
                        <ExperienceList list="Japanese Language, Cross-Cultural Communication, Adaptability, Discipline, Immersive Learning, Daily Communication, Reading and Writing, Listening Comprehension, Speaking, Cultural Awareness" />
                    </List.Item>
                </List.Root>

                <ThumbImage
                    src="/images/experiences/ISI-March-2026-Certificate.png"
                    alt="gannon"
                />
            </Container>
        </Layout>
    )
}

export default Isi
