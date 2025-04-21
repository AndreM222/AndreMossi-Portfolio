import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, Meta } from '../../components/experience'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import ExperienceList from '../../components/experienceList'
import DateSetup from '../../components/dateSetup'

import dinantLang from '../assets/dinant.json'
import contentLang from '../assets/experience-content.json'
import miscLang from '../assets/misc.json'

const Dinant = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(contentLang, 'title', 'dinant')
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(contentLang, 'title', 'dinant')}{' '}
                    <Badge>
                        <DateSetup date="2023" />
                    </Badge>
                </Title>

                <Paragraph>{Content(dinantLang, 'description', 'content')}</Paragraph>

                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>{Content(contentLang, 'info', 'type-internship')}</span>
                    </ListItem>

                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'content')}</Meta>
                        <ExperienceList list="Full-Stack Development, Data Transformation, Oracle Database, HTML, CSS, JavaScript, SQL, Data Entry, Data Analysis, Data Modeling" />
                    </ListItem>
                </List>
            </Container>
        </Layout>
    )
}

export default Dinant
