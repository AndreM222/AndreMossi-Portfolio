import { useRouter } from 'next/router'

const Content = (current, category, type) => {
    const { locale } = useRouter()
    return current[category]
        .filter((lang) => lang.locale === locale)
        .map((indexLang) => {
            return indexLang[type]
        })
        .join('')
}

export default Content
