import {
    IconButton,
    useColorModeValue,
    Menu,
    MenuItem,
    MenuList,
    MenuButton
} from '@chakra-ui/react'
import { TfiWorld } from 'react-icons/tfi'
import { forwardRef } from 'react'
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
    const { locales } = useRouter()
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                mr={2}
                icon={<TfiWorld />}
                colorScheme={useColorModeValue('purple', 'pink')}
            />
            <MenuList>
                {locales.map(locale => (
                    <MenuItem as={MenuLink} href={path} locale={locale} key={locale}>
                        {languageNames[locale]}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}

export default LanguageButton
