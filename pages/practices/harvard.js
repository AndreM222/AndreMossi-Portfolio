import { Container, Badge, List, Link, ListItem } from '@chakra-ui/react'
import { Title, ThumbImage, Meta } from '../../components/practice'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Practice = () => {
    return (
        <Layout title="Harvard">
            <Container>
                <Title>
                    Harvard <Badge>2022</Badge>
                </Title>
                <P>
                    I decided to take a online{' '}
                    <Link href="https://pll.harvard.edu/course/cs50-introduction-computer-science?delta=0">
                        Havard
                    </Link>{' '}
                    class in order to increase my current knowledge regarding
                    Computer Science. I wanted to strive to do more and this
                    online class taught me many things I did not learn or have
                    yet to do. This experience had shown me how wide the world
                    of Computer Science is and I am excited to embark upon this
                    path.
                </P>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>Type</Meta>
                        <span>Education</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Content</Meta>
                        <span>C, Python, Javascript, CSS, Html, SQL</span>
                    </ListItem>
                </List>
                <ThumbImage src="/images/practices/CS50x.png" alt="Harvard" />
            </Container>
        </Layout>
    )
}

export default Practice
