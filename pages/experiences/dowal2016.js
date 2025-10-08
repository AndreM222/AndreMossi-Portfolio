import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, ThumbImage, Meta } from '../../components/experience'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import ExperienceList from '../../components/experienceList'
import DateSetup from '../../components/dateSetup'

import dowalLang from '../../locales/pages/experiences/dowal2016.json'
import contentLang from '../../locales/experience-content.json'
import experienceLang from '../../locales/pages/experience.json'
import miscLang from '../../locales/misc.json'

const Extreme = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(experienceLang, 'dowal-competition-2016', 'title')
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(experienceLang, 'dowal-competition-2016', 'title')}{' '}
                    <Badge>
                        <DateSetup date="2016" />
                    </Badge>
                </Title>
                <Paragraph>{Content(dowalLang, 'description', 'content')}</Paragraph>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>{Content(contentLang, 'info', 'award')}</span>
                    </ListItem>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'content')}</Meta>
                        <ExperienceList list="Unreal Engine, c++, blueprint" />
                    </ListItem>
                </List>
                <ThumbImage
                    src="/images/experiences/Dowal-2016p-Certificate.png"
                    alt="Dowal 2016"
                />
            </Container>
        </Layout>
    )
}

export default Extreme
