import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, Meta } from '../../components/experience'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'

import githubLang from '../assets/github.json'
import contentLang from '../assets/experience-content.json'
import miscLang from '../assets/misc.json'

const Github = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(contentLang, 'title', 'github'),
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(contentLang, 'title', 'github')}{' '}
                    <Badge>{Content(githubLang, 'date', 'content')}</Badge>
                </Title>
                <P>{Content(githubLang, 'description', 'content')}</P>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>
                            {Content(contentLang, 'info', 'type-education')}
                        </span>
                    </ListItem>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'link')}</Meta>
                        <Link href="https://github.com/AndreM222">
                            {Content(githubLang, 'info', 'link')}
                            <ExternalLinkIcon ml={2} />
                        </Link>
                    </ListItem>
                </List>
            </Container>
        </Layout>
    )
}

export default Github
