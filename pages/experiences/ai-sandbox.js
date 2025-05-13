import { Container, Badge, List, ListItem, Link } from '@chakra-ui/react'
import { Title, Meta, ThumbImage } from '../../components/experience'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import ExperienceList from '../../components/experienceList'
import CitationList from '../../components/citationList'
import DateSetup from '../../components/dateSetup'

import sandboxLang from '../../locales/pages/experiences/ai-sandbox.json'
import contentLang from '../../locales/experience-content.json'
import miscLang from '../../locales/misc.json'
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
                        <DateSetup date="2024 to 2025" />
                    </Badge>
                </Title>

                <Paragraph>{Content(sandboxLang, 'description', 'content')}</Paragraph>

                <Paragraph>{Content(sandboxLang, 'event', 'content')}</Paragraph>

                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>{Content(contentLang, 'info', 'type-research')}</span>
                    </ListItem>

                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'content')}</Meta>
                        <ExperienceList list="Full-Stack Development, C++, Unreal Engine, Cuda, CMake, blueprints, ai, latex" />
                    </ListItem>

                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'link')}</Meta>
                        <CitationList list="AI Entity, World Generator, ASEE Published Research, sigma xi conference, tag ai sandbox, latex of research" />
                    </ListItem>
                </List>

                <NavBTN as={Link} href="/PDF/AI-Sandbox.pdf" target="_blank" />

                <ThumbImage
                    src="/images/experiences/TracingSense.png"
                    alt="Actions Preview"
                />
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
