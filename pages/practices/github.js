import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { Title, Meta } from '../../components/practice'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import githubLang from '../assets/github.json'

const Github = () => {
    return (
        <Layout title="Github">
            <Container>
                <Title>Github <Badge>{Content(githubLang, 'date', 'content')}</Badge></Title>
                <P>
                    {Content(githubLang, 'description', 'content')}
                </P>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(githubLang, 'category', 'type')}</Meta>
                        <span>{Content(githubLang, 'category', 'type-description')}</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Link</Meta>
                        <Link href='https://github.com/AndreM222'>{Content(githubLang, 'category', 'link-description')}</Link>
                    </ListItem>
                </List>
            </Container>
        </Layout>
    )
}

export default Github
