import { Container, Badge, List, ListItem, Link } from "@chakra-ui/react";
import { Title, Meta, ThumbImage } from "../../components/experience";
import Paragraph from "../../components/paragraph";
import Layout from "../../components/layouts/article";
import Content from "../../components/content";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import sandboxLang from '../assets/ai-sandbox.json'
import contentLang from '../assets/experience-content.json'
import miscLang from '../assets/misc.json'

const Sandbox = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(contentLang, 'title', 'ai-sandbox'),
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(contentLang, 'title', 'ai-sandbox')}{' '}
                    <Badge>Present</Badge>
                </Title>

                <Paragraph>
                    {Content(sandboxLang, 'description', 'content')}
                </Paragraph>

                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>
                            {Content(contentLang, 'info', 'type-research')}
                        </span>
                    </ListItem>

                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'content')}</Meta>
                        <span>{Content(sandboxLang, 'info', 'content')}</span>
                    </ListItem>

                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'link')}</Meta>
                        <Link href="https://github.com/AndreM222/Procedural-Generator">
                            {Content(sandboxLang, 'info', 'world')}
                            <ExternalLinkIcon ml={2} />
                        </Link>
                        {', '}
                        <Link href="https://github.com/AndreM222/AI-Entities">
                            {Content(sandboxLang, 'info', 'entity')}
                            <ExternalLinkIcon ml={2} />
                        </Link>
                    </ListItem>
                </List>

                <ThumbImage src="/images/experiences/ActionPreview.png" alt="Actions Preview" />
                <ThumbImage src="/images/experiences/ProceduralPreviewPic.png" alt="World Generator Preview" />
            </Container>
        </Layout>
    )
}

export default Sandbox
