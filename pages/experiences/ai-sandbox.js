import { Container, Badge, List, ListItem, Link } from '@chakra-ui/react'
import { Title, Meta, ThumbImage } from '../../components/experience'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import ExperienceList from '../../components/experienceList'
import CitationList from '../../components/citationList'
import DateSetup from '../../components/dateSetup'

import sandboxLang from '../assets/ai-sandbox.json'
import contentLang from '../assets/experience-content.json'
import miscLang from '../assets/misc.json'
import NavBTN from '../../components/Buttons/Navigation'

const Sandbox = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(contentLang, 'title', 'ai-sandbox')
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(contentLang, 'title', 'ai-sandbox')}{' '}
                    <Badge>
                        <DateSetup date="2024 to present" />
                    </Badge>
                </Title>

                <Paragraph>{Content(sandboxLang, 'description', 'content')}</Paragraph>

                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>{Content(contentLang, 'info', 'type-research')}</span>
                    </ListItem>

                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'content')}</Meta>
                        <ExperienceList list="Full-Stack Development, C++, Unreal Engine, Cuda, Pytorch, blueprints" />
                    </ListItem>

                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'link')}</Meta>
                        <CitationList list="World Generator, AI Entity" />
                    </ListItem>
                </List>

                <NavBTN as={Link} href="/PDF/AI-Sandbox.pdf" target="_blank" />

                <ThumbImage
                    src="/images/experiences/ActionPreview.png"
                    alt="Actions Preview"
                />
                <ThumbImage
                    src="/images/experiences/ProceduralPreviewPic.png"
                    alt="World Generator Preview"
                />
            </Container>
        </Layout>
    )
}

export default Sandbox
