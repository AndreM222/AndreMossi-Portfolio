import Content from './content'

import dateSymbolLang from '../pages/assets/dateSymbols.json'
import grammarSymbolLang from '../pages/assets/grammarSymbols.json'

const itemSetup = ({ date }) => {
    const items = date.toLowerCase().split(' ')

    return items
        .map((item, index) => {
            const currTime = item.trim()

            let translatedTime =
                Content(dateSymbolLang, 'time', currTime) ||
                Content(dateSymbolLang, 'months', currTime) ||
                currTime

            if (!Content(dateSymbolLang, 'time', currTime)) {
                if (!Content(dateSymbolLang, 'months', currTime)) {
                    translatedTime +=
                        translatedTime.length < 4
                            ? Content(dateSymbolLang, 'endtrail', 'date')
                            : Content(dateSymbolLang, 'endtrail', 'year')
                } else {
                    translatedTime = translatedTime.concat(
                        Content(dateSymbolLang, 'endtrail', 'month')
                    )
                }
            }

            if (
                index > 0 &&
                currTime !== 'to' &&
                Content(dateSymbolLang, 'space', 'content').toLowerCase() === 'true'
            )
                return ' ' + translatedTime

            return translatedTime
        })
        .join('')
}

const spaceSetup = ({ date }) => {
    const items = date.toLowerCase().split('to')

    return items
        .map((item, index) => {
            const currTime = item.trim()

            return index === 0
                ? itemSetup({ date: currTime })
                : Content(dateSymbolLang, 'to', 'content') +
                itemSetup({ date: currTime })
        })
        .join('')
}

const DateSetup = ({ date }) => {
    const groups = date.toLowerCase().split(',')

    return (
        <span>
            {groups.map((item, index) => {
                const currTime = item.trim()

                return index === 0
                    ? spaceSetup({ date: currTime })
                    : Content(grammarSymbolLang, 'separator', 'content') +
                    spaceSetup({ date: currTime })
            })}
        </span>
    )
}

export default DateSetup
