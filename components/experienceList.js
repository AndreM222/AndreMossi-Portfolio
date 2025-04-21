import Content from './content'

import experienceLang from '../pages/assets/experienceList.json'
import symbolLang from '../pages/assets/grammarSymbols.json'

const ExperienceList = ({ list }) => {
    const items = list.split(',')

    return (
        <span>
            {items.map((item, index) =>
                index === 0
                    ? Content(experienceLang, 'info', item.toLowerCase().trim())
                    : Content(symbolLang, 'separator', 'content') +
                    Content(experienceLang, 'info', item.toLowerCase().trim())
            )}
        </span>
    )
}

export default ExperienceList
