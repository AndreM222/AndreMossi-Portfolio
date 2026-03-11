const NavContent = (current, category, type, langLocal, langDefaultLocale) => {
    if (langLocal) {
        const currentTranslation = current[category].find(
            lang => lang.locale === langLocal
        )
        const defaultTranslation = current[category].find(
            lang => lang.locale === langDefaultLocale
        )

        return currentTranslation?.[type] || defaultTranslation?.[type] || ''
    }

    const defaultLocale = langDefaultLocale || 'en'
    const currentLang = navigator.language.split('-')[0]

    const currentTranslation = current[category].find(
        lang => lang.locale === currentLang
    )
    const defaultTranslation = current[category].find(
        lang => lang.locale === defaultLocale
    )

    return currentTranslation?.[type] || defaultTranslation?.[type] || ''
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
