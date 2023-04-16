import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { Title, Meta } from '../../components/practice'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Github = () => {
    return (
        <Layout title="Github">
            <Container>
                <Title>Github <Badge>Present</Badge></Title>
                <P>
                    During my spare time I tried to dedicate it towards
                    improving my knowledge by working on some small project.
                    Some projects are decent and others might not be optimal
                    but something that is certain is I that my growth can be
                    seen in all the projects I have worked so far. Being Javafx with
                    the first time I worked with GUI using Java, my sorting algorithm
                    that sorts files content with CPP, etc.
                </P>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>Type</Meta>
                        <span>Practice</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Link</Meta>
                        <Link href='https://github.com/AndreM222'>My Github</Link>
                    </ListItem>
                </List>
            </Container>
        </Layout>
    )
}

export default Github
