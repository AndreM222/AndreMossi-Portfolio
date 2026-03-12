'use client'

import { Box } from '@chakra-ui/react'
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
            bg={{_light: 'whiteAlpha.500', _dark: 'whiteAlpha.200'}}
            p={3}
            display="grid"
            mb={10}
            justifyContent="center"
            css={{ backdropFilter: 'blur(10px)' }}
        >
            <p style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
                {Content(symbolLang, 'qb-sentence', 'start')}
                {Content(quoteLang, quoteId, 'content')}
                {Content(symbolLang, 'qb-sentence', 'end')}
            </p>
            <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
            >
                <Box
                    width="20px"
                    height="4px"
                    borderRadius="lg"
                    mr={2}
                    bg={{_light: 'blackAlpha.800', _dark: 'whiteAlpha.800'}}
                />
                {Content(symbolLang, 'qb-author', 'start')}
                {Content(quoteLang, quoteId, 'author')}
                {Content(symbolLang, 'qb-author', 'end')}
            </Box>
        </Box>
    )
}
