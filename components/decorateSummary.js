import { Link, Text } from '@chakra-ui/react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { useMemo } from 'react'
import { useColorModeValue } from './ui/color-mode'

import grammarLang from '../locales/grammarSymbols.json'
import NavContent from './translations/navigationContent'

const LINK_REGEX = /https?:\/\/[^\s<]+/g
const EMAIL_REGEX = /[^a-zA-Z0-9]+@[^<\s]+/g
const NUMBER_REGEX = /(\d+(?:\.\d+)?)([KMBkmb%+×]?)/g
const LANGUAGE_REGEXES = {
    ja: /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/gu,
    en: /[a-zA-Z\u00C0-\u024F]/gu
}

export const DecorateSummary = ({ text, ...props }) => {
    const emailColor = useColorModeValue('cyan.400', 'cyan.200')
    const { ref, inView } = useInView({ threshold: 0.1 })

    const parts = useMemo(() => {
        const tokens = []
        let lastIndex = 0

        const mainLang = checkLang(text)

        const numMatches = [...text.matchAll(NUMBER_REGEX)]
        numMatches.forEach(match => {
            const [full, value, suffix] = match
            const start = match.index

            if (start > lastIndex) {
                tokens.push({
                    type: 'text',
                    content: text.slice(lastIndex, start)
                })
            }

            tokens.push({
                type: 'number',
                value: parseFloat(value),
                suffix,
                full
            })
            lastIndex = start + full.length
        })

        // 2️⃣ Links
        const linkMatches = [...text.matchAll(LINK_REGEX)]
        linkMatches.forEach(match => {
            const start = match.index
            if (start >= lastIndex) {
                if (start > lastIndex) {
                    tokens.push({
                        type: 'text',
                        content: text.slice(lastIndex, start)
                    })
                }
                tokens.push({ type: 'link', url: match[0], content: match[0] })
                lastIndex = start + match[0].length
            }
        })

        // 3️⃣ Emails
        const emailMatches = [...text.matchAll(EMAIL_REGEX)]
        emailMatches.forEach(match => {
            const start = match.index
            if (start >= lastIndex) {
                if (start > lastIndex) {
                    tokens.push({
                        type: 'text',
                        content: text.slice(lastIndex, start)
                    })
                }
                tokens.push({
                    type: 'email',
                    url: `mailto:${match[0]}`,
                    content: match[0]
                })
                lastIndex = start + match[0].length
            }
        })

        const foreignRegex =
            mainLang === 'ja' ? LANGUAGE_REGEXES.en : LANGUAGE_REGEXES.ja

        const foreignMatches = [...text.matchAll(foreignRegex)]
        foreignMatches.forEach(match => {
            const start = match.index
            if (start >= lastIndex) {
                if (start > lastIndex) {
                    tokens.push({
                        type: 'text',
                        content: text.slice(lastIndex, start)
                    })
                }
                tokens.push({
                    type: 'foreign',
                    content: match[0],
                    foreignLang: mainLang === 'ja' ? 'en' : 'ja'
                })
                lastIndex = start + match[0].length
            }
        })

        if (lastIndex < text.length) {
            tokens.push({ type: 'text', content: text.slice(lastIndex) })
        }

        return tokens
    }, [text])

    return (
        <Text ref={ref} style={{ lineHeight: '1.6' }} {...props}>
            {parts.map((part, i) => {
                switch (part.type) {
                    case 'link':
                        return (
                            <Link key={i} href={part.url} isExternal>
                                {part.content}
                            </Link>
                        )
                    case 'email':
                        return (
                            <Link key={i} href={part.url} color={emailColor}>
                                {part.content}
                            </Link>
                        )
                    case 'number':
                        return (
                            <Text
                                key={i}
                                as="span"
                                display="inline-flex"
                                color="orange.400"
                            >
                                <CountUp
                                    end={part.value}
                                    duration={1.5}
                                    separator=","
                                    decimals={part.value % 1 !== 0 ? 1 : 0}
                                    start={inView ? undefined : 0}
                                >
                                    {({ countUpRef }) => (
                                        <span ref={countUpRef} />
                                    )}
                                </CountUp>
                                {part.suffix}
                            </Text>
                        )
                    case 'foreign':
                        return (
                            <Text
                                key={i}
                                as="span"
                                color="teal.fg"
                                _dark={{ color: 'teal.fg' }}
                            >
                                {part.content}
                            </Text>
                        )
                    default:
                        return part.content
                }
            })}
        </Text>
    )
}

const checkLang = text => {
    const langFrequency = new Map()

    for (const [lang, regex] of Object.entries(LANGUAGE_REGEXES)) {
        const matches = [...text.matchAll(regex)]
        const count = matches.reduce(
            (total, match) => total + match[0].length,
            0
        )
        langFrequency.set(lang, count)
    }

    let mainLang = 'en'
    let maxCount = langFrequency.get('en') || 0

    for (const [lang, count] of langFrequency) {
        if (count > maxCount) {
            maxCount = count
            mainLang = lang
        }
    }

    return mainLang
}

export const humanizeSummary = (summary = '') => {
    if (!summary) return ''

    const cleaned = summary.replace(/^[a-z-]+(\([^)]+\))?:\s*/i, '').trim()

    if (!cleaned) return ''

    const sentence = cleaned.charAt(0).toUpperCase() + cleaned.slice(1)

    const lang = checkLang(sentence)

    const dot = NavContent(grammarLang, 'dot', 'content', lang)

    return sentence?.endsWith(dot) ? sentence : sentence + dot
}
