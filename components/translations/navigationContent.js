const getValue = (currentTranslation, defaultTranslation, type) => {
    if (currentTranslation && type in currentTranslation) {
        return currentTranslation[type]
    }

    if (defaultTranslation && type in defaultTranslation) {
        return defaultTranslation[type]
    }

    return ''
}

const NavContent = (current, category, type, langLocal, langDefaultLocale) => {
    const defaultLocale = langDefaultLocale || 'en'

    let currentLang = langLocal

    if (!currentLang && typeof navigator !== 'undefined') {
        currentLang = navigator.language.split('-')[0]
    }

    const currentTranslation = current[category].find(
        lang => lang.locale === currentLang
    )

    const defaultTranslation = current[category].find(
        lang => lang.locale === defaultLocale
    )

    return getValue(currentTranslation, defaultTranslation, type)
}

export const injectVars = (text = '', vars = {}) => {
    let result = text

    Object.entries(vars).forEach(([key, value]) => {
        result = result.replaceAll(`{${key}}`, value)
    })

    return result
}

export const NavContentWithVars = (
    langData,
    section,
    field,
    locale,
    vars = {}
) => {
    const text = NavContent(langData, section, field, locale)
    return injectVars(text, vars)
}

export default NavContent
