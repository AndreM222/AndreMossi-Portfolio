export const humanizeSummary = (summary = '') => {
    if (!summary) return ''

    const cleaned = summary.replace(/^[a-z-]+(\([^)]+\))?:\s*/i, '').trim()

    if (!cleaned) return ''

    const sentence = cleaned.charAt(0).toUpperCase() + cleaned.slice(1)

    return sentence.endsWith('.') ? sentence : sentence + '.'
}

export const typeConfig = {
    feat: 'Feature Update',
    fix: 'Bug Fix',
    perf: 'Performance Improvement',
    refactor: 'Code Improvement',
    docs: 'Documentation Update',
    style: 'Style Update',
    chore: 'Maintenance',

    intern: 'Internship Update',
    research: 'Research Update',
    awards: 'New Achievement',
    projects: 'Project Update',
    timeline: 'Career Timeline Updated',
    about: 'About Page Updated',
    'resume-en': 'Resume English Updated',
    'resume-es': 'Resume Spanish Updated',
    'resume-jp': 'Resume Japanese Updated'
}
