import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, ThumbImage, Meta } from '../../components/practice'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import extremeLang from '../assets/extreme.json'

const Extreme = () => {
    return (
        <Layout title="Extreme-Networks">
            <Container>
                <Title>
                    Extreme-Networks <Badge>2022</Badge>
                </Title>
                <Paragraph>
                    {Content(extremeLang, 'description', 'content')}
                </Paragraph>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(extremeLang, 'category', 'type')}</Meta>
                        <span>{Content(extremeLang, 'category', 'type-description')}</span>
                    </ListItem>
                    <ListItem>
                        <Meta>{Content(extremeLang, 'category', 'content')}</Meta>
                        <span>{Content(extremeLang, 'category', 'content-description')}</span>
                    </ListItem>
                </List>
                <ThumbImage src="/images/practices/Extreme-Certificate.png" />
            </Container>
        </Layout>
    )
}

export default Extreme
