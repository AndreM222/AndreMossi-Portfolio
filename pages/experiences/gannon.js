import { Container, Badge, List } from '@chakra-ui/react'
import { Title, ThumbImage, Meta } from '../../components/experience'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import ExperienceList from '../../components/experienceList'
import DateSetup from '../../components/dateSetup'

import gannonLang from '../../locales/pages/experiences/gannon.json'
import experienceLang from '../../locales/pages/experience.json'
import contentLang from '../../locales/experience-content.json'
import miscLang from '../../locales/misc.json'

const gannon = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(experienceLang, 'gannon', 'title')
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(experienceLang, 'gannon', 'title')}{' '}
                    <Badge>
                        <DateSetup date="2025" />
                    </Badge>
                </Title>
                <P>{Content(gannonLang, 'description', 'content')}</P>
                <List.Root ml={4} my={4} variant="plain">
                    <List.Item>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>
                            {Content(contentLang, 'info', 'type-education')}
                        </span>
                    </List.Item>
                    <List.Item>
                        <Meta>{Content(contentLang, 'info', 'content')}</Meta>
                        <ExperienceList list="C++, Python, Javascript, CSS, Html, SQL, Shell, Introduction to Networks, C#" />
                    </List.Item>
                </List.Root>
                <ThumbImage src="/images/experiences/Gannon-Certificate.png" alt="gannon" />
                <ThumbImage src="/images/experiences/Gannon-Ceremony-Graduation.png" alt="gannon" />
            </Container>
        </Layout>
    )
}

export default gannon
