import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, ThumbImage, Meta } from '../../components/practice'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import harvardLang from '../assets/harvard.json'

const Practice = () => {
    return (
        <Layout title="Harvard">
            <Container>
                <Title>
                    Harvard <Badge>2022</Badge>
                </Title>
                <P>
                    {Content(harvardLang, 'description', 'content')}
                </P>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(harvardLang, 'category', 'type')}</Meta>
                        <span>{Content(harvardLang, 'category', 'type-description')}</span>
                    </ListItem>
                    <ListItem>
                        <Meta>{Content(harvardLang, 'category', 'content')}</Meta>
                        <span>C, Python, Javascript, CSS, Html, SQL</span>
                    </ListItem>
                </List>
                <ThumbImage src="/images/practices/CS50x.png" alt="Harvard" />
            </Container>
        </Layout>
    )
}

export default Practice
