import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, ThumbImage, Meta } from '../../components/experience'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'

import dowalLang from '../assets/dowal2016.json'
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
                Content(contentLang, 'title', 'dowal-2016'),
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(contentLang, 'title', 'dowal-2016')}{' '}
                    <Badge>2016</Badge>
                </Title>
                <Paragraph>
                    {Content(dowalLang, 'description', 'content')}
                </Paragraph>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>
                            {Content(contentLang, 'info', 'award')}
                        </span>
                    </ListItem>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'content')}</Meta>
                        <span>{Content(dowalLang, 'info', 'content')}</span>
                    </ListItem>
                </List>
                <ThumbImage src="/images/experiences/dowal-2016p-certificate.png" alt="Dowal 2016" />
            </Container>
        </Layout>
    )
}

export default Extreme
