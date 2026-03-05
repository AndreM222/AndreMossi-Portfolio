import { FaCode, FaSuitcase } from 'react-icons/fa6'
import { FaCog, FaFileAlt } from 'react-icons/fa'

export const interestTypes = [
    {
        id: 'general',
        title: 'General',
        color: 'teal',
        icon: <FaCog />,
        types: ['feat', 'Timeline', 'About']
    },
    {
        id: 'experience',
        title: 'Experience',
        color: 'cyan',
        icon: <FaSuitcase />,
        types: ['Intern', 'Research', 'Awards', 'Projects', 'Certifications']
    },
    {
        id: 'resume',
        title: 'Resume',
        color: 'orange',
        icon: <FaFileAlt />,
        types: ['English', 'Spanish', 'Japanese']
    },
    {
        id: 'developer',
        title: 'Development',
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
