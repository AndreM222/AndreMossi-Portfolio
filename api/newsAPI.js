import { FaCode, FaSuitcase } from 'react-icons/fa6'
import { FaCog, FaFileAlt } from 'react-icons/fa'

export const interestTypes = [
    {
        id: 'general',
        color: 'teal',
        icon: <FaCog />,
        types: ['feat', 'timeline', 'about']
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
        types: ['english', 'spanish', 'japanese']
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
        Timeline: true,
        About: true
    },
    experience: {
        Intern: true,
        Research: true,
        Awards: true,
        Projects: true,
        Certifications: true
    },
    resume: { English: true, Spanish: true, Japanese: true },
    developer: {
        fix: true,
        perf: true,
        refactor: true,
        docs: true,
        style: true,
        chore: true
    }
}
