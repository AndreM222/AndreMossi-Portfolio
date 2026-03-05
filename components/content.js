import { useRouter } from 'next/router'

const Content = (current, category, type) => {
    const { locale, defaultLocale } = useRouter()

    const currentTranslation = current[category].find(
        lang => lang.locale === locale
    )
    const defaultTranslation = current[category].find(
        lang => lang.locale === defaultLocale
    )

    return currentTranslation?.[type] || defaultTranslation?.[type] || ''
}

export default Content
