'use client'

import { Box } from '@chakra-ui/react'
import { useColorModeValue } from "@/components/ui/color-mode"
import Content from './content'
import quoteLang from '../locales/quotesList.json'
import symbolLang from '../locales/grammarSymbols.json'

const groupNames = Object.keys(quoteLang)

export const quoteLength = () => {
    return groupNames.length
}

export const QuoteCard = ({ quoteNum }) => {
    if (!quoteNum) quoteNum = 0

    const quoteId = groupNames[quoteNum]

    return (
        <Box
            boxShadow="lg"
            maxW="2xl"
            borderRadius="lg"
            bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
            p={3}
            display="grid"
            mb={10}
            justifyContent="center"
            css={{ backdropFilter: 'blur(10px)' }}
        >
            <p style={{ whiteSpace: 'pre-line' }}>
                {Content(symbolLang, 'qb-sentence', 'start')}
                {Content(quoteLang, quoteId, 'content')}
                {Content(symbolLang, 'qb-sentence', 'end')}
            </p>
            <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box
                    width="20px"
                    height="4px"
                    borderRadius="lg"
                    mr={2}
                    bg={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
                />
                {Content(symbolLang, 'qb-author', 'start')}
                {Content(quoteLang, quoteId, 'author')}
                {Content(symbolLang, 'qb-author', 'end')}
            </Box>
        </Box>
    )
}
