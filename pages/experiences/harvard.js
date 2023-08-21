import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, ThumbImage, Meta } from '../../components/experience'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'

import harvardLang from '../assets/harvard.json'
import contentLang from '../assets/experience-content.json'
import miscLang from '../assets/misc.json'

const Harvard = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(contentLang, 'title', 'harvard'),
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(contentLang, 'title', 'harvard')}{' '}
                    <Badge>2022</Badge>
                </Title>
                <P>{Content(harvardLang, 'description', 'content')}</P>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>
                            {Content(contentLang, 'info', 'type-education')}
                        </span>
                    </ListItem>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'content')}</Meta>
                        <span>C, Python, Javascript, CSS, Html, SQL</span>
                    </ListItem>
                </List>
                <ThumbImage src="/images/experiences/CS50x.png" alt="Harvard" />
            </Container>
        </Layout>
    )
}

export default Harvard
