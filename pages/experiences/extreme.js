import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, ThumbImage, Meta } from '../../components/experience'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import ExperienceList from '../../components/experienceList'
import DateSetup from '../../components/dateSetup'

import extremeLang from '../assets/extreme.json'
import contentLang from '../assets/experience-content.json'
import miscLang from '../assets/misc.json'

const Extreme = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(contentLang, 'title', 'extreme')
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(contentLang, 'title', 'extreme')}{' '}
                    <Badge>
                        <DateSetup date="2022" />
                    </Badge>
                </Title>
                <Paragraph>{Content(extremeLang, 'description', 'content')}</Paragraph>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>{Content(contentLang, 'info', 'type-education')}</span>
                    </ListItem>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'content')}</Meta>
                        <ExperienceList list="introduction to networks" />
                    </ListItem>
                </List>
                <ThumbImage
                    src="/images/experiences/Extreme-Certificate.png"
                    alt="Extreme Certificate"
                />
            </Container>
        </Layout>
    )
}

export default Extreme
