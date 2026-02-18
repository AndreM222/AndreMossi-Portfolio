import {
    Container,
    Badge,
    List,
    ListItem,
    Box,
    Heading
} from '@chakra-ui/react'
import { Title, Meta, ThumbImage } from '../../components/experience'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import Content from '../../components/content'
import ExperienceList from '../../components/experienceList'
import CitationList from '../../components/citationList'
import DateSetup from '../../components/dateSetup'

import sandboxLang from '../../locales/pages/experiences/ai-sandbox.json'
import contentLang from '../../locales/experience-content.json'
import experienceLang from '../../locales/pages/experience.json'
import miscLang from '../../locales/misc.json'
import RecommendationCard from '../../components/recommendationCard'
import { PdfPreviewButton } from '../../components/pdfViewer'
import { ChevronRightIcon } from '@chakra-ui/icons'

const Sandbox = () => {
    return (
        <Layout
            title={[
                Content(miscLang, 'title', 'name'),
                '-',
                Content(miscLang, 'category', 'experience'),
                ':',
                Content(experienceLang, 'ai-sandbox', 'title')
            ].join(' ')}
        >
            <Container>
                <Title>
                    {Content(experienceLang, 'ai-sandbox', 'title')}{' '}
                    <Badge>
                        <DateSetup date="2024 to 2025" />
                    </Badge>
                </Title>

                <Paragraph>
                    {Content(sandboxLang, 'description', 'content')}
                </Paragraph>

                <Paragraph>
                    {Content(sandboxLang, 'event', 'content')}
                </Paragraph>

                <Box display="grid" gridRowGap={5}>
                    <Box
                        display={
                            Content(
                                sandboxLang,
                                'technicalDetails',
                                'content'
                            ) === ' '
                                ? 'none'
                                : ''
                        }
                    >
                        <Heading size="sm">
                            {Content(
                                sandboxLang,
                                'technicalDetails',
                                'content'
                            )}
                        </Heading>
                        <List spacing={1} styleType="disc" ml={4}>
                            {Content(
                                sandboxLang,
                                'technicalDetails',
                                'list'
                            )?.map((item, index) => (
                                <ListItem key={index}>{item}</ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>

                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{Content(contentLang, 'info', 'type')}</Meta>
                        <span>
                            {Content(contentLang, 'info', 'type-research')}
                        </span>
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

                <Box align="center" my={4}>
                    <PdfPreviewButton
                        src={Content(sandboxLang, 'paper', 'url')}
                        title={Content(experienceLang, 'ai-sandbox', 'title')}
                        rightIcon={<ChevronRightIcon />}
                        colorScheme="orange"
                    >
                        {Content(miscLang, 'moreBTN', 'content')}
                    </PdfPreviewButton>
                </Box>

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

                <Box justifyItems="center">
                    <RecommendationCard projectID="aiSandbox" />
                </Box>
            </Container>
        </Layout>
    )
}

export default Sandbox
