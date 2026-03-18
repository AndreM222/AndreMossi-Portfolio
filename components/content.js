import { useRouter } from 'next/router'

const Content = (current, category, type) => {
    const { locale, defaultLocale } = useRouter()

    const currentTranslation = current[category].find(
        lang => lang.locale === locale
    )
    const defaultTranslation = current[category].find(
        lang => lang.locale === defaultLocale
    )

    const value = currentTranslation?.[type]

    if (value !== undefined && value !== null && value !== '') {
        return value
    }

    return defaultTranslation?.[type] || ''
}

export const injectVars = (text = '', vars = {}) => {
    let result = text

    Object.entries(vars).forEach(([key, value]) => {
        result = result.replaceAll(`{${key}}`, value)
    })

    return result
}

export const ContentWithVars = (langData, section, field, vars = {}) => {
    const text = Content(langData, section, field)
    return injectVars(text, vars)
}

export default Content
