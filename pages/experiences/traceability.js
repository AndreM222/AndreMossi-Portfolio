import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, Meta } from '../../components/experience'
import { Title, Meta, ThumbImage } from '../../components/experience'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import ExperienceList from '../../components/experienceList'
import DateSetup from '../../components/dateSetup'

import traceabilityLang from '../../locales/pages/experiences/traceability.json'
import contentLang from '../../locales/experience-content.json'
import miscLang from '../../locales/misc.json'

const Sandbox = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(contentLang, 'title', 'ai-sandbox')
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(contentLang, 'title', 'traceability')}{' '}
                    <Badge>
                        <DateSetup date="2024 to 2025" />
                    </Badge>
                </Title>

                <Paragraph>
                    {Content(traceabilityLang, 'description', 'content')}
                </Paragraph>

                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>{Content(contentLang, 'info', 'type-education')}</span>
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
            </Container>
        </Layout>
    )
}

export default Sandbox
