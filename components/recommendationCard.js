'use client'

import { Box, Button, chakra, Image, SimpleGrid } from '@chakra-ui/react'
import NextLink from 'next/link'
import Content from './content'
import { FaChevronRight } from 'react-icons/fa'
import DateSetup, { getDateFormat } from './dateSetup'
import { isValidMotionProp, motion } from 'framer-motion'

import miscLang from '../locales/misc.json'
import letterLang from '../locales/recommendations.json'
import { PdfPreviewButton } from './pdfViewer'
import { MdEmail } from 'react-icons/md'
import { FaPhone } from 'react-icons/fa6'
import { LuCalendarRange } from 'react-icons/lu'
import isPropValid from '@emotion/is-prop-valid'

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: prop => isValidMotionProp(prop) || isPropValid(prop)
})

const RecommendationCard = ({ projectID, delay = 0, ...props }) => {
    const projectContent = {
        id: Content(letterLang, projectID, 'id'),
        image: Content(letterLang, projectID, 'image'),
        company: Content(letterLang, projectID, 'company'),
        date: Content(letterLang, projectID, 'date'),
        title: Content(letterLang, projectID, 'title'),
        author: Content(letterLang, projectID, 'author'),
        description: Content(letterLang, projectID, 'description'),
        phone: Content(letterLang, projectID, 'phone'),
        mail: Content(letterLang, projectID, 'mail')
    }

    return (
        <Box
            w="100%"
            maxW={{ base: '92vw', sm: '380px', md: '400px' }}
            mx="auto"
            {...props}
        >
            <StyledDiv
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: delay }}
            >
                <Box position="relative">
                    <Box
                        p={1}
                        h="fit-content"
                        position="absolute"
                        zIndex={1}
                        alignSelf="anchor-center"
                        my="auto"
                        bg={{ _light: 'white', _dark: 'black' }}
                        borderColor={{ _light: 'blackAlpha.700', _dark: 'whiteAlpha.300' }}
                        borderWidth={2}
                        top={2}
                        left={-4}
                        borderRadius="lg"
                    >
                        {projectContent.company}
                    </Box>
                    <Image
                        pointerEvents="none"
                        borderRadius="100%"
                        borderWidth={2}
                        borderStyle="solid"
                        borderColor={{ _light: 'blackAlpha.700', _dark: 'whiteAlpha.300' }}
                        maxW={{ base: '60px', md: '15%' }}
                        margin="auto"
                        src={'/images/recommendation/' + projectContent.image}
                    />
                </Box>
                <Box
                    display="grid"
                    gridTemplateRows="auto auto auto 1fr auto auto"
                    boxShadow="lg"
                    gap={2}
                    bg={{ _light: 'color-mix(in srgb, white 50%, #f1ece8)', _dark: 'color-mix(in srgb, white 8%, #101015)'}}
                    borderRadius="lg"
                    p={3}
                    pt={6}
                    mt={-6}
                    minH="520px"
                >
                    <Box justifySelf="center">
                        <b>{projectContent.author}</b>
                    </Box>
                    <Box justifySelf="center" mt={-3}>
                        {projectContent.title}
                    </Box>
                    <Box display="inline-flex" alignItems="center" gap={2}>
                        <LuCalendarRange />

                        <DateSetup date={getDateFormat(projectContent.date)} />
                    </Box>
                    <Box
                        justifySelf="center"
                        bg={{ _light: 'blackAlpha.200', _dark: 'blackAlpha.400' }}
                        p={2}
                        borderRadius="lg"
                    >
                        <i>{projectContent.description}...</i>
                    </Box>
                    <Box
                        bg={{ _light: 'blackAlpha.200', _dark: 'blackAlpha.400' }}
                        p={2}
                        display="grid"
                        borderRadius="lg"
                        w="full"
                    >
                        <Box display="inline-flex" gap={2} alignItems="center">
                            <FaPhone />
                            <div>
                                <NextLink href={'tel:' + projectContent.phone}>
                                    {projectContent.phone}
                                </NextLink>
                            </div>
                        </Box>
                        <Box display="inline-flex" gap={2} alignItems="center">
                            <MdEmail />
                            <div>
                                <NextLink
                                    href={'mailto:' + projectContent.mail}
                                >
                                    {projectContent.mail}
                                </NextLink>
                            </div>
                        </Box>
                    </Box>

                    <SimpleGrid columns={[2]} gap={2}>
                        <Button
                            as={NextLink}
                            href={`/experiences/${projectContent.id}`}
                            bg="orange.fg"
                            _hover={{
                                bg: 'orange.border'
                            }}
                        >
                            {Content(miscLang, 'moreBTN', 'content')}
                            <FaChevronRight />
                        </Button>
                        <PdfPreviewButton
                            title={projectContent.title}
                            src={`/PDF/Recommendations/${projectContent.id}.pdf`}
                        >
                            {Content(miscLang, 'letterBTN', 'content')}
                            <FaChevronRight />
                        </PdfPreviewButton>
                    </SimpleGrid>
                </Box>
            </StyledDiv>
        </Box>
    )
}

export default RecommendationCard
