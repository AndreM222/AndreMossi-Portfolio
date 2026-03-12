import { FaCode, FaSuitcase } from 'react-icons/fa6'
import { FaCog, FaFileAlt } from 'react-icons/fa'

export const interestTypes = [
    {
        id: 'general',
        color: 'teal',
        icon: <FaCog />,
        types: ['feat', 'timeline', 'about', 'stars', 'repository']
    },
    {
        id: 'experience',
        color: 'cyan',
        icon: <FaSuitcase />,
        types: ['intern', 'research', 'awards', 'projects', 'certifications']
    },
    {
        id: 'resume',
        color: 'orange',
        icon: <FaFileAlt />,
        types: ['resume-en', 'resume-es', 'resume-ja']
    },
    {
        id: 'developer',
        color: 'purple',
        icon: <FaCode />,
        types: ['fix', 'perf', 'refactor', 'docs', 'style', 'chore']
    }
]

export const defaultInterestsSettings = {
    general: {
        feat: true,
        timeline: true,
        about: true,
        stars: true,
        repository: true
    },
    experience: {
        intern: true,
        research: true,
        awards: true,
        projects: true,
        certifications: true
    },
    resume: { 'resume-en': true, 'resume-es': true, 'resume-ja': true },
    developer: {
        fix: true,
        perf: true,
        refactor: true,
        docs: true,
        style: true,
        chore: true
    }
}
