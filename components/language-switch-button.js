import {
    IconButton,
    useColorModeValue,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
} from '@chakra-ui/react'
import { TfiWorld } from 'react-icons/tfi'
import { forwardRef } from 'react'
import NextLink from 'next/link'

const MenuLink = forwardRef((props, locale, href) => {
    return <NextLink href={href} locale={locale} {...props} />
})
const LanguageButton = ({ path }) => {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                mr={2}
                icon={<TfiWorld />}
                colorScheme={useColorModeValue('purple', 'pink')}
            />
            <MenuList>
                <MenuItem as={MenuLink} href={path} locale={'en'}>
                    English
                </MenuItem>
                <MenuItem as={MenuLink} href={path} locale={'es'}>
                    Español
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default LanguageButton
