import { Container, Badge, List, ListItem, Link } from '@chakra-ui/react'
import { Title, ThumbImage, Meta } from '../../components/practice'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Extreme = () => {
    return (
        <Layout title="Extreme-Networks">
            <Container>
                <Title>
                    Extreme-Networks <Badge>2022</Badge>
                </Title>
                <Paragraph>
                    It&apos;s a class which focus on the introduction to network
                    management and how it is structured. The class I had in my
                    unviersity its content came from{' '}
                    <Link href="https://www.extremenetworks.com/">
                        Extreme-Networks
                    </Link>
                    .
                </Paragraph>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>Type</Meta>
                        <span>Education</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Content</Meta>
                        <span>Introduction to networks</span>
                    </ListItem>
                </List>
                <ThumbImage src="/images/practices/Extreme-Certificate.png" />
            </Container>
        </Layout>
    )
}

export default Extreme
