import { Container, Heading, Divider } from '@chakra-ui/react'
import { GridItem } from "../components/grid-item"
import Section from '../components/section'
import Layout from '../components/layouts/article'
import Paragraph from '../components/paragraph'
import thumbNvim from "../public/images/others/Terminal-Preview.png"

const Other = () => {
    return (
        <Layout title="Others">
            <Container>
                <Heading as="h3">Others</Heading>
                <Divider my={6} />

                <Section delay={0.1}>
                    <Paragraph>
                        Was awarded in my school for best computer project by
                        developing my first ever videogame using Unreal Engine.
                        After developing my first videogame I knew that
                        programming was the path I wanted to walk. Walking from
                        there I started learning more and joining clubs related
                        to my carreer, I was able to win a second competition in
                        my school developing a second small survival game. In
                        the same year I was nominated as the president of the
                        computer club. At my school for the seniors there is a
                        final test which measures your level of understanding of
                        computers, the one who obtaines the highest grade and
                        greater then 90% can obtain a medal. I was the one with
                        the highest grade being 100%.
                    </Paragraph>
                </Section>

                <Section delay={0.2}>
                    <Heading as="h3" variant="section-title">
                        Editor
                    </Heading>
                    <Paragraph>
                        Currently my main editor is Neovim but I am also
                        familiar with other editors like VSCode, InteliJ, and
                        Visual Studio. I started my journey towards Neovim since
                        I was told that it was the most powerfull tool to
                        program but was too complicated to learn. I love to take
                        over challenges and learn new things so I decided to
                        take over the challenge.
                    </Paragraph>
                </Section>
                <Section delay={0.3}>
                    <GridItem
                        href="https://github.com/AndreM222/Windows-Dotfiles"
                        title="Nvim Setup"
                        thumbnail={thumbNvim}
                    >
                        My dotfiles setup on Windows
                    </GridItem>
                </Section>
            </Container>
        </Layout>
    )
}

export default Other
