import { Link, Text, Badge, Table } from '@chakra-ui/react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { useMemo } from 'react'

import grammarLang from '../locales/grammarSymbols.json'
import NavContent from './translations/navigationContent'

const INLINE_LINK_REGEX = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g
const HTML_LINK_REGEX =
    /<a\b[^>]*\bhref=(["'])(https?:\/\/[^"']+)\1[^>]*>([\s\S]*?)<\/a>/gi
const LINK_REGEX = /https?:\/\/[^\s<]+/g
const INLINE_BLOCK_REGEX = /`([^\s<]+)`/g
const EMAIL_REGEX = /[^a-zA-Z0-9]+@[^<\s]+/g
const NUMBER_REGEX = /(\d+(?:\.\d+)?)([KMBkmb%+×]?)/g
const LANGUAGE_REGEXES = {
    ja: /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/gu,
    en: /[a-zA-Z\u00C0-\u024F]/gu
}

const TABLE_SEP_REGEX = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/
const TABLE_ROW_REGEX = /\|/

function splitBlocks(text) {
    const lines = text.split(/\r?\n/)
    const blocks = []
    let buffer = []

    const flushText = () => {
        if (buffer.length) {
            blocks.push({ type: 'text', content: buffer.join('\n') })
            buffer = []
        }
    }

    let curr = 0
    while (curr < lines.length) {
        const line = lines[curr]
        const next = lines[curr + 1]

        const isHeader = TABLE_ROW_REGEX.test(line)
        const isSeparator = TABLE_SEP_REGEX.test(next)

        if (isHeader && isSeparator) {
            flushText()
            const tableLines = [line, next]
            curr += 2
            while (curr < lines.length && TABLE_ROW_REGEX.test(lines[curr])) {
                tableLines.push(lines[curr])
                curr++
            }

            blocks.push({ type: 'table', content: tableLines.join('\n') })
        } else {
            buffer.push(line)
            curr++
        }
    }
    flushText()
    return blocks
}

function splitTableRow(line) {
    let trimmed = line.trim()
    if (trimmed.startsWith('|')) trimmed = trimmed.slice(1)
    if (trimmed.endsWith('|')) trimmed = trimmed.slice(0, -1)

    return trimmed
        .split(/(?<!\\)\|/)
        .map(curr => curr.trim().replace(/\\\|/g, '|'))
}

function parseTable(content) {
    const [headerLine, sepLine, ...rowLines] = content.split('\n')
    const header = splitTableRow(headerLine)
    const aligns = splitTableRow(sepLine).map(curr => {
        const left = curr.startsWith(':')
        const right = curr.endsWith(':')

        if (left && right) return 'center'
        if (right) return 'right'
        if (left) return 'left'

        return undefined
    })

    const rows = rowLines.filter(line => line.trim()).map(splitTableRow)
    return { header, aligns, rows }
}

function tokenizeInline(text) {
    const mainLang = checkLang(text)
    const foreignRegex =
        mainLang === 'ja' ? LANGUAGE_REGEXES.en : LANGUAGE_REGEXES.ja

    const candidates = [
        ...[...text.matchAll(INLINE_BLOCK_REGEX)].map(m => ({
            start: m.index,
            end: m.index + m[0].length,
            token: { type: 'inline_block', content: m[1] }
        })),
        ...[...text.matchAll(INLINE_LINK_REGEX)].map(m => ({
            start: m.index,
            end: m.index + m[0].length,
            token: { type: 'inline_link', url: m[2], content: m[1] }
        })),
        ...[...text.matchAll(HTML_LINK_REGEX)].map(m => ({
            start: m.index,
            end: m.index + m[0].length,
            token: { type: 'html_link', url: m[2], content: m[3] }
        })),
        ...[...text.matchAll(LINK_REGEX)].map(m => ({
            start: m.index,
            end: m.index + m[0].length,
            token: { type: 'link', url: m[0], content: m[0] }
        })),
        ...[...text.matchAll(EMAIL_REGEX)].map(m => ({
            start: m.index,
            end: m.index + m[0].length,
            token: { type: 'email', url: `mailto:${m[0]}`, content: m[0] }
        })),
        ...[...text.matchAll(NUMBER_REGEX)].map(m => ({
            start: m.index,
            end: m.index + m[0].length,
            token: {
                type: 'number',
                value: parseFloat(m[1]),
                suffix: m[2],
                full: m[0],
                hasComma: m[0].includes(',')
            }
        })),
        ...[...text.matchAll(foreignRegex)].map(m => ({
            start: m.index,
            end: m.index + m[0].length,
            token: {
                type: 'foreign',
                content: m[0],
                foreignLang: mainLang === 'ja' ? 'en' : 'ja'
            }
        }))
    ].sort((a, b) => a.start - b.start || b.end - a.end)

    const tokens = []
    let lastIndex = 0
    for (const c of candidates) {
        if (c.start < lastIndex) continue
        if (c.start > lastIndex) {
            tokens.push({
                type: 'text',
                content: text.slice(lastIndex, c.start)
            })
        }
        tokens.push(c.token)
        lastIndex = c.end
    }
    if (lastIndex < text.length) {
        tokens.push({ type: 'text', content: text.slice(lastIndex) })
    }
    return tokens
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

function getPreviewBlocks(blocks, { maxChars = 500 } = {}) {
    const preview = []
    let charCount = 0

    for (const block of blocks) {
        preview.push(block)

        if (block.type === 'table') break

        charCount += block.content.length
        if (charCount >= maxChars) break
    }

    return { preview, hasMore: preview.length < blocks.length }
}

const renderToken = (part, i, { inView, emailColor }) => {
    switch (part.type) {
        case 'inline_block':
            return <Badge key={i}>{part.content}</Badge>
        case 'inline_link':
        case 'html_link':
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
                        separator={part.hasComma ? ',' : ''}
                        decimals={part.value % 1 !== 0 ? 1 : 0}
                        start={inView ? undefined : 0}
                    >
                        {({ countUpRef }) => <span ref={countUpRef} />}
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
}

const InlineText = ({ text, inView, emailColor, ...props }) => {
    const parts = useMemo(() => tokenizeInline(text), [text])
    return (
        <Text style={{ lineHeight: '1.6' }} {...props}>
            {parts.map((part, i) =>
                renderToken(part, i, { inView, emailColor })
            )}
        </Text>
    )
}

export const DecorateSummary = ({ text, sourceUrl, ...props }) => {
    const emailColor = { _light: 'cyan.400', _dark: 'cyan.200' }
    const { ref, inView } = useInView({ threshold: 0.1 })

    const blocks = useMemo(() => splitBlocks(text), [text])
    const { preview, hasMore } = useMemo(
        () => getPreviewBlocks(blocks),
        [blocks]
    )

    return (
        <div ref={ref}>
            {preview.map((block, i) => {
                if (block.type === 'table') {
                    const { header, aligns, rows } = parseTable(block.content)
                    return (
                        <Table.Root
                            key={i}
                            size="sm"
                            my={2}
                            rounded="xl"
                            overflow="hidden"
                            border="1px solid"
                            borderColor="border"
                            bg="bg.canvas"
                            css={{
                                '& thead': {
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1
                                }
                            }}
                        >
                            <Table.Header>
                                <Table.Row
                                    bg="bg.subtle"
                                    borderBottom="1px solid"
                                    borderColor="border"
                                >
                                    {header.map((h, hi) => (
                                        <Table.ColumnHeader
                                            key={hi}
                                            textAlign={aligns[hi]}
                                            fontWeight="semibold"
                                            color="fg.emphasized"
                                            py={2.5}
                                            px={3}
                                        >
                                            <InlineText
                                                text={h}
                                                inView={inView}
                                                emailColor={emailColor}
                                                as="span"
                                            />
                                        </Table.ColumnHeader>
                                    ))}
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {rows.map((row, ri) => (
                                    <Table.Row
                                        key={ri}
                                        bg={
                                            ri % 2 === 0
                                                ? 'bg.canvas'
                                                : 'bg.muted'
                                        }
                                        _hover={{ bg: 'bg.emphasized' }}
                                        transition="background 150ms ease"
                                    >
                                        {row.map((cell, ci) => (
                                            <Table.Cell
                                                key={ci}
                                                textAlign={aligns[ci]}
                                                py={2.5}
                                                px={3}
                                                borderBottom={
                                                    ri === rows.length - 1
                                                        ? 'none'
                                                        : '0.1px solid'
                                                }
                                                borderColor="border"
                                            >
                                                <InlineText
                                                    text={cell}
                                                    inView={inView}
                                                    emailColor={emailColor}
                                                    as="span"
                                                />
                                            </Table.Cell>
                                        ))}
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    )
                }
                return (
                    <InlineText
                        key={i}
                        text={block.content}
                        inView={inView}
                        emailColor={emailColor}
                        {...props}
                    />
                )
            })}
            {hasMore && sourceUrl && (
                <Link
                    href={sourceUrl}
                    isExternal
                    color="cyan.400"
                    fontSize="sm"
                    mt={1}
                    display="inline-block"
                >
                    View full details on GitHub →
                </Link>
            )}
        </div>
    )
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
