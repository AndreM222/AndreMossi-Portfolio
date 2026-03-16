'use client'

import {
    Badge,
    Box,
    Button,
    chakra,
    Flex,
    Image,
    SimpleGrid,
    Text
} from '@chakra-ui/react'
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

    const MotionBox = motion(Box)

    return (
        <StyledDiv
            suppressHydrationWarning
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: delay }}
        >
            <MotionBox
                w="100%"
                maxW={{ base: '92vw', sm: '380px', md: '400px' }}
                mx="auto"
                borderRadius="3xl"
                overflow="hidden"
                boxShadow={{
                    _light: '0 35px 80px -20px rgba(0,0,0,0.15)',
                    _dark: '0 35px 80px -20px rgba(0,0,0,0.8)'
                }}
                bg="white"
                _dark={{ bg: 'gray.900' }}
                position="relative"
                cursor="pointer"
                transition="all 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
                {...props}
            >
                <Box
                    position="relative"
                    h={{ base: '150px', md: '240px' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Image
                        src={'/images/recommendation/' + projectContent.image}
                        w="full"
                        filter="auto"
                        blur="20px"
                        contrast="1.5"
                        position="absolute"
                        dropShadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
                        h="full"
                        objectFit="cover"
                        objectPosition="center"
                        transition="all 0.4s ease"
                        _hover={{ transform: 'scale(1.05)' }}
                    />

                    <Image
                        src={'/images/recommendation/' + projectContent.image}
                        w={20}
                        h={20}
                        borderRadius="full"
                        objectFit="cover"
                        position="relative"
                        boxShadow="0 12px 30px rgba(0,0,0,0.45)" // strong separation
                        border="1px solid rgba(0,0,0,0.9)"
                        bg="white"
                        transition="transform 0.3s ease, box-shadow 0.3s ease"
                        pointerEvents="none"
                    />

                    <Badge
                        position="absolute"
                        top={4}
                        left={4}
                        bg="white"
                        color="gray.900"
                        px={3}
                        py={1}
                        fontSize="xs"
                        fontWeight="bold"
                        borderRadius="full"
                        boxShadow="0 4px 12px rgba(0,0,0,0.3)"
                    >
                        {projectContent.company}
                    </Badge>
                </Box>

                <Box p={4} pb={4}>
                    <Flex align="center" gap={3} mb={2}>
                        <Box>
                            <Text
                                fontSize={{ base: 'xl', md: 'xl' }}
                                fontWeight="black"
                            >
                                {projectContent.author}
                            </Text>
                            <Text
                                fontSize="sm"
                                color="orange.600"
                                _dark={{ color: 'orange.400' }}
                            >
                                {projectContent.title}
                            </Text>
                        </Box>
                    </Flex>

                    <Flex align="center" gap={2} mb={3} opacity={0.8}>
                        <Box
                            w={6}
                            h={6}
                            bg="gray.100"
                            _dark={{ bg: 'gray.800' }}
                            borderRadius="full"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <LuCalendarRange size={12} color="gray.600" />
                        </Box>
                        <Text fontSize="sm">
                            <DateSetup
                                date={getDateFormat(projectContent.date)}
                            />
                        </Text>
                    </Flex>

                    <Text
                        fontSize="sm"
                        fontStyle="italic"
                        color="gray.700"
                        _dark={{ color: 'gray.300' }}
                        lineHeight="1.7"
                        mb={6}
                        noOfLines={3}
                    >
                        {projectContent.description}...
                    </Text>

                    <Box display="grid" gap={2} mb={3}>
                        <NextLink
                            href={'tel:' + projectContent.phone}
                            style={{ textDecoration: 'none' }}
                        >
                            <Flex
                                p={2}
                                borderRadius="2xl"
                                bg="green.50"
                                _dark={{ bg: 'green.900' }}
                                align="center"
                                gap={3}
                                _hover={{
                                    bg: 'green.500'
                                }}
                                transition="all 0.3s ease"
                                border="1px solid"
                                borderColor="green.500"
                            >
                                <Box
                                    w={8}
                                    h={8}
                                    bg="green.500"
                                    borderRadius="full"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <FaPhone size={14} color="white" />
                                </Box>
                                <Text fontSize="sm" fontWeight="medium">
                                    {projectContent.phone}
                                </Text>
                            </Flex>
                        </NextLink>

                        <NextLink
                            href={'mailto:' + projectContent.mail}
                            style={{ textDecoration: 'none' }}
                        >
                            <Flex
                                p={2}
                                borderRadius="2xl"
                                bg="blue.50"
                                _dark={{ bg: 'blue.900' }}
                                align="center"
                                gap={3}
                                _hover={{
                                    bg: 'blue.500'
                                }}
                                transition="all 0.3s ease"
                                border="1px solid"
                                borderColor="blue.500"
                            >
                                <Box
                                    w={8}
                                    h={8}
                                    bg="blue.500"
                                    borderRadius="full"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <MdEmail size={16} color="white" />
                                </Box>
                                <Text fontSize="sm" fontWeight="medium">
                                    {projectContent.mail}
                                </Text>
                            </Flex>
                        </NextLink>
                    </Box>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
                        <Button
                            as={NextLink}
                            href={`/experiences/${projectContent.id}`}
                            w="full"
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
            </MotionBox>
        </StyledDiv>
    )
}

export default RecommendationCard
