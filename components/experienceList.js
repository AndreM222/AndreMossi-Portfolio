import Content from './content'

import experienceLang from '../locales/experienceList.json'
import symbolLang from '../locales/grammarSymbols.json'

const ExperienceList = ({ list }) => {
    const items = list.split(',')

    return (
        <span>
            {items.map((item, index) => {
                const translation = Content(
                    experienceLang,
                    'info',
                    item.toLowerCase().trim()
                )
                if (translation) return (
                    index === 0
                        ? translation
                        : Content(symbolLang, 'separator', 'content') + translation
                )
            })}
        </span>
    )
}

export default ExperienceList
