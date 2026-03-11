'use client'

import { IconButton, Menu } from '@chakra-ui/react'
import { TfiWorld } from 'react-icons/tfi'
import { forwardRef, useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const MenuLink = forwardRef((props, ref) => {
    return <NextLink ref={ref} {...props} />
})

const languageNames = {
    en: 'English',
    es: 'Español',
    ja: '日本語'
}

const LanguageButton = ({ path }) => {
    const { locales, locale, push, asPath } = useRouter()

    const [language, setLanguage] = useState(locale)

    useEffect(() => {
        const saved = localStorage.getItem('language')
        if (saved && saved !== language) {
            setLanguage(saved)
        }
    }, [])

    const setLocale = language => {
        localStorage.setItem('language', language)
        setLanguage(language)
    }

    useEffect(() => {
        if (locale !== language) {
            push(path, asPath, { locale: language })
        }
    }, [language])

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <IconButton
                    mr={2}
                    bg={{ _light: 'purple.500', _dark: 'pink' }}
                    aria-label="Language"
                >
                    <TfiWorld />
                </IconButton>
            </Menu.Trigger>

            <Menu.Positioner>
                <Menu.Content>
                    {locales.map(language => (
                        <Menu.Item
                            asChild
                            key={language}
                            onClick={() => setLocale(language)}
                        >
                            <MenuLink href={path} locale={language}>
                                {languageNames[language]}
                            </MenuLink>
                        </Menu.Item>
                    ))}
                </Menu.Content>
            </Menu.Positioner>
        </Menu.Root>
    )
}

export default LanguageButton
