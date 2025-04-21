import {
    IconButton,
    useColorModeValue,
    Menu,
    MenuItem,
    MenuList,
    MenuButton
} from '@chakra-ui/react'
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

    const [language, setLanguage] = useState(() => {
        if (
            typeof localStorage != 'undefined' &&
            localStorage.getItem('language')
        ) {
            return localStorage.getItem('language')
        }

        return locale
    })

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
        <Menu>
            <MenuButton
                as={IconButton}
                mr={2}
                icon={<TfiWorld />}
                colorScheme={useColorModeValue('purple', 'pink')}
            />
            <MenuList>
                {locales.map(language => (
                    <MenuItem
                        as={MenuLink}
                        href={path}
                        locale={language}
                        key={language}
                        onClick={() => setLocale(language)}
                    >
                        {languageNames[language]}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}

export default LanguageButton
