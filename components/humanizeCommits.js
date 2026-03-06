'use client'
import { Link, Text } from '@chakra-ui/react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { useMemo } from 'react'

const LINK_REGEX = /https?:\/\/[^\s<]+/g
const EMAIL_REGEX = /[^a-zA-Z0-9]+@[^<\s]+/g
const NUMBER_REGEX = /(\d+(?:\.\d+)?)([KMBkmb%+×]?)/g

export const humanizeSummary = (summary = '') => {
    if (!summary) return ''

    const cleaned = summary.replace(/^[a-z-]+(\([^)]+\))?:\s*/i, '').trim()

    if (!cleaned) return ''

    const sentence = cleaned.charAt(0).toUpperCase() + cleaned.slice(1)

    return sentence.endsWith('.') ? sentence : sentence + '.'
}

export const decorateSummary = (text) => {
    const { ref, inView } = useInView({ threshold: 0.1 })

    const parts = useMemo(() => {
        const tokens = []
        let lastIndex = 0

        // 1️⃣ Numbers first (highest priority)
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

        // 3️⃣ Emails ✅ NOW PROCESSED!
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

        // 4️⃣ Remaining text
        if (lastIndex < text.length) {
            tokens.push({ type: 'text', content: text.slice(lastIndex) })
        }

        return tokens
    }, [text])

    return (
        <p ref={ref} style={{ lineHeight: '1.6' }}>
            {parts.map((part, i) => {
                switch (part.type) {
                    case 'link':
                        return (
                            <Link
                                key={i}
                                href={part.url}
                                isExternal
                            >
                                {part.content}
                            </Link>
                        )
                    case 'email':
                        return (
                            <Link
                                key={i}
                                href={part.url}
                                color="cyan"
                            >
                                {part.content}
                            </Link>
                        )
                    case 'number':
                        return (
                            <CountUp
                                key={i}
                                end={part.value}
                                duration={1.5}
                                separator=","
                                decimals={part.value % 1 !== 0 ? 1 : 0}
                                enableScrollSpy={inView}
                            >
                                {({ countUpRef }) => (
                                    <Text display="inline-flex" color='orange' ref={countUpRef}>{part.suffix}</Text>
                                )}
                            </CountUp>
                        )
                    default:
                        return part.content
                }
            })}
        </p>
    )
}
