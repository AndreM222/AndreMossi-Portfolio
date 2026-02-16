import { Container, Badge, List, ListItem, Heading, Box } from '@chakra-ui/react'
import { Title, Meta, ThumbImage } from '../../components/experience'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import ExperienceList from '../../components/experienceList'
import DateSetup from '../../components/dateSetup'

import traceabilityLang from '../../locales/pages/experiences/traceability.json'
import contentLang from '../../locales/experience-content.json'
import experienceLang from '../../locales/pages/experience.json'
import miscLang from '../../locales/misc.json'
import { ThumbVideo } from '../../components/ThumbVideo'

const Sandbox = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(experienceLang, 'traceability', 'title')
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(experienceLang, 'traceability', 'title')}{' '}
                    <Badge>
                        <DateSetup date="2024 to 2025" />
                    </Badge>
                </Title>

                <Paragraph>
                    {Content(traceabilityLang, 'description', 'content')}
                </Paragraph>

                <Box display="grid" gridRowGap={5}>
                    <div>
                        <Heading size="sm">
                            {Content(
                                traceabilityLang,
                                'EnginnerOwnerAndDecision',
                                'content'
                            )}
                        </Heading>
                        <List spacing={1} styleType="disc" ml={4}>
                            {Content(
                                traceabilityLang,
                                'EnginnerOwnerAndDecision',
                                'list'
                            )?.map((item, index) => (
                                <ListItem key={index}>{item}</ListItem>
                            ))}
                        </List>
                    </div>

                    <div>
                        <Heading size="sm">
                            {Content(
                                traceabilityLang,
                                'OperationalBusinessImpact',
                                'content'
                            )}
                        </Heading>
                        <List spacing={1} styleType="disc" ml={4}>
                            {Content(
                                traceabilityLang,
                                'OperationalBusinessImpact',
                                'list'
                            )?.map((item, index) => (
                                <ListItem key={index}>{item}</ListItem>
                            ))}
                        </List>
                    </div>
                </Box>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>
                            {Content(contentLang, 'info', 'type-education')}
                        </span>
                    </ListItem>

                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'content')}</Meta>
                        <ExperienceList list="ai, data entry, data analysis, javascript, react, c++, shell, docker, python, rust, yolo, machine learning, timescaledb, data modeling" />
                    </ListItem>
                </List>

                <ThumbImage
                    src="/images/experiences/TracingUI.png"
                    alt="Actions Preview"
                />

                <ThumbVideo
                    src="/Videos/WarehousePreview.mp4"
                    alt="Wearhouse Preview"
                />
            </Container>
        </Layout>
    )
}

export default Sandbox
