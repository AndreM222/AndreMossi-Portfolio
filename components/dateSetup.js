import Content from './content'

import dateSymbolLang from '../locales/dateSymbols.json'
import grammarSymbolLang from '../locales/grammarSymbols.json'

const itemSetup = ({ date, sepFormat }) => {
    const items = sepFormat === 'slash' ? date.toLowerCase().split('/') : date.toLowerCase().split(' ')

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
                            ? Content(dateSymbolLang, 'endtrail', 'day')
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
                Content(grammarSymbolLang, 'space', 'content').toLowerCase() ===
                'true'
            )
                return ' ' + translatedTime

            return translatedTime
        })
        .join('')
}

const spaceSetup = ({ date, sepFormat }) => {
    const items = date.toLowerCase().split('to')

    return items
        .map((item, index) => {
            const currTime = item.trim()

            return index === 0
                ? itemSetup({ date: currTime, sepFormat: sepFormat })
                : Content(dateSymbolLang, 'to', 'content') +
                itemSetup({ date: currTime, sepFormat: sepFormat })
        })
        .join('')
}

const applyFormat = (format, values) => {
    return format.replace(/%(\w+)%/g, (_, key) => values[key] ?? '')
}

export const getDateFormat = (date, sepFormat) => {
    const monthKeys = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ]

    if (!date) return ''

    const parts = date.split('-')
    if (parts.length !== 3) return date

    const [year, monthStr, dayStr] = parts
    const monthIndex = parseInt(monthStr, 10) - 1

    if (monthIndex < 0 || monthIndex > 11) return date

    const format = Content(dateSymbolLang, 'format', sepFormat || 'content')

    return applyFormat(format, {
        year: year,
        month: sepFormat === "slash" ? parseInt(monthStr, 10) : monthKeys[monthIndex],
        day: parseInt(dayStr, 10)
    })
}

const DateSetup = ({ date, sepFormat }) => {
    if (!date) return <div/>

    const groups = date.toLowerCase().split(',')

    return (
        <span>
            {groups.map((item, index) => {
                const currTime = item.trim()

                return index === 0
                    ? spaceSetup({ date: currTime, sepFormat: sepFormat})
                    : Content(grammarSymbolLang, 'separator', 'content') +
                    spaceSetup({ date: currTime, sepFormat: sepFormat })
            })}
        </span>
    )
}

export default DateSetup
