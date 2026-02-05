'use client'

import {
    Box,
    Button,
    chakra,
    Image,
    Link,
    shouldForwardProp,
    SimpleGrid,
    useColorModeValue
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Content from './content'
import {
    CalendarIcon,
    ChevronRightIcon,
    EmailIcon,
    PhoneIcon
} from '@chakra-ui/icons'
import DateSetup, { getDateFormat } from './dateSetup'
import { motion } from 'framer-motion'

import miscLang from '../locales/misc.json'
import letterLang from '../locales/recommendations.json'

const StyledDiv = chakra(motion.div, {
    shouldForwardProp: prop => {
        return shouldForwardProp(prop) || prop === 'transition'
    }
})

const RecommendationCard = ({ projectID, delay = 0 }) => {
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
        <StyledDiv
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: delay }}
        >
            <Box maxW="400px">
                <Box position="relative">
                    <Box
                        p={1}
                        h="fit-content"
                        position="absolute"
                        zIndex={1}
                        alignSelf="anchor-center"
                        my="auto"
                        bg={useColorModeValue(
                            'blackAlpha.50',
                            'blackAlpha.500'
                        )}
                        borderColor={useColorModeValue(
                            'blackAlpha.700',
                            'whiteAlpha.300'
                        )}
                        borderWidth={2}
                        ml={-5}
                        borderRadius="lg"
                    >
                        {projectContent.company}
                    </Box>
                    <Image
                        pointerEvents="none"
                        borderRadius="100%"
                        borderWidth={2}
                        borderStyle="solid"
                        borderColor={useColorModeValue(
                            'blackAlpha.700',
                            'whiteAlpha.300'
                        )}
                        maxW="15%"
                        ml={-100}
                        margin="auto"
                        src={'/images/recommendation/' + projectContent.image}
                    />
                </Box>
                <Box
                    display="grid"
                    boxShadow="lg"
                    gap={2}
                    bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
                    borderRadius="lg"
                    p={3}
                    pt={6}
                    mt={-6}
                >
                    <Box justifySelf="center">
                        <b>{projectContent.author}</b>
                    </Box>
                    <Box justifySelf="center" mt={-3}>
                        {projectContent.title}
                    </Box>
                    <Box display="inline-flex" alignItems="center" gap={2}>
                        <CalendarIcon />

                        <DateSetup date={getDateFormat(projectContent.date)} />
                    </Box>
                    <Box
                        justifySelf="center"
                        bg={useColorModeValue(
                            'blackAlpha.200',
                            'blackAlpha.400'
                        )}
                        p={2}
                        borderRadius="lg"
                    >
                        <i>{projectContent.description}...</i>
                    </Box>
                    <Box
                        bg={useColorModeValue(
                            'blackAlpha.200',
                            'blackAlpha.400'
                        )}
                        p={2}
                        display="grid"
                        borderRadius="lg"
                        w="full"
                    >
                        <Box display="inline-flex" gap={2} alignItems="center">
                            <PhoneIcon />
                            <div>
                                <NextLink href={'tel:' + projectContent.phone}>
                                    {projectContent.phone}
                                </NextLink>
                            </div>
                        </Box>
                        <Box display="inline-flex" gap={2} alignItems="center">
                            <EmailIcon />
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
                            rightIcon={<ChevronRightIcon />}
                            colorScheme="orange"
                        >
                            {Content(miscLang, 'button', 'content')}
                        </Button>
                        <Button
                            as={Link}
                            href={`/PDF/Recommendations/${projectContent.id}.pdf`}
                            rightIcon={<ChevronRightIcon />}
                            colorScheme="orange"
                        >
                            {Content(miscLang, 'letter', 'content')}
                        </Button>
                    </SimpleGrid>
                </Box>
            </Box>
        </StyledDiv>
    )
}

export default RecommendationCard
