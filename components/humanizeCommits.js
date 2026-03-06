export const humanizeSummary = (summary = '') => {
    if (!summary) return ''

    const cleaned = summary.replace(/^[a-z-]+(\([^)]+\))?:\s*/i, '').trim()

    if (!cleaned) return ''

    const sentence = cleaned.charAt(0).toUpperCase() + cleaned.slice(1)

    return sentence.endsWith('.') ? sentence : sentence + '.'
}
