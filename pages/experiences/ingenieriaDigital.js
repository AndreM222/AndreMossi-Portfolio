import { Container, Badge, List, Box, Heading } from '@chakra-ui/react'
import { Title, Meta } from '../../components/experience'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import ExperienceList from '../../components/experienceList'
import DateSetup from '../../components/dateSetup'

import dinantLang from '../../locales/pages/experiences/ingenieriaDigital.json'
import contentLang from '../../locales/experience-content.json'
import experienceLang from '../../locales/pages/experience.json'
import miscLang from '../../locales/misc.json'

const Dinant = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(experienceLang, 'dinant', 'title')
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(experienceLang, 'dinant', 'title')}{' '}
                    <Badge>
                        <DateSetup date="2026 to present" />
                    </Badge>
                </Title>

                <Paragraph>
                    {Content(dinantLang, 'description', 'content')}
                </Paragraph>

                <Box display="grid" gridRowGap={5}>
                    <Box
                        display={
                            Content(
                                dinantLang,
                                'medicalPlatform',
                                'content'
                            ) === ' '
                                ? 'none'
                                : ''
                        }
                    >
                        <Heading size="sm">
                            {Content(dinantLang, 'medicalPlatform', 'content')}
                        </Heading>
                        <List.Root gap={1} listStyleType="disc" ml={4}>
                            {Content(
                                dinantLang,
                                'medicalPlatform',
                                'list'
                            )?.map((item, index) => (
                                <List.Item key={index}>{item}</List.Item>
                            ))}
                        </List.Root>
                    </Box>

                    <Box
                        display={
                            Content(
                                dinantLang,
                                'vehiclePlatform',
                                'content'
                            ) === ' '
                                ? 'none'
                                : ''
                        }
                    >
                        <Heading size="sm">
                            {Content(dinantLang, 'vehiclePlatform', 'content')}
                        </Heading>
                        <List.Root gap={1} listStyleType="disc" ml={4}>
                            {Content(
                                dinantLang,
                                'vehiclePlatform',
                                'list'
                            )?.map((item, index) => (
                                <List.Item key={index}>{item}</List.Item>
                            ))}
                        </List.Root>
                    </Box>

                    <Box
                        display={
                            Content(
                                dinantLang,
                                'engineeringImpact',
                                'content'
                            ) === ' '
                                ? 'none'
                                : ''
                        }
                    >
                        <Heading size="sm">
                            {Content(
                                dinantLang,
                                'engineeringImpact',
                                'content'
                            )}
                        </Heading>
                        <List.Root gap={1} listStyleType="disc" ml={4}>
                            {Content(
                                dinantLang,
                                'engineeringImpact',
                                'list'
                            )?.map((item, index) => (
                                <List.Item key={index}>{item}</List.Item>
                            ))}
                        </List.Root>
                    </Box>
                </Box>

                <List.Root ml={4} my={4} variant="plain">
                    <List.Item>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>{Content(contentLang, 'info', 'type-job')}</span>
                    </List.Item>

                    <List.Item>
                        <Meta>{Content(contentLang, 'info', 'content')}</Meta>
                        <ExperienceList list=" Full-Stack Development, AI Systems Engineering, OCR Pipelines, Computer Vision, Multimodal AI, React, Next.js, TypeScript, PostgreSQL, AWS S3, Auth0, OpenAI APIs, Amazon Textract, Playwright, Konva, GitHub Actions, CI/CD, REST APIs, Cloud Architecture" />{' '}
                    </List.Item>
                </List.Root>
            </Container>
        </Layout>
    )
}

export default Dinant
