import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
    global: props => ({
        body: {
            bg: mode('#f1ece8', '#101015')(props)
        }
    })
}

const components = {
    Heading: {
        variants: {
            'section-title': {
                textDecoration: 'underline',
                fontSize: 20,
                textUnderlineOffset: 6,
                textDecorationColor: '#525252',
                textDecorationThickness: 4,
                marginTop: 3,
                marginBottom: 4
            }
        }
    },
    Button: {
        variants: {
            outline: props => ({
                borderColor: mode('blackAlpha.300', 'whiteAlpha.300')(props)
            })
        }
    },
    Divider: {
        baseStyle: props => ({
            borderColor: mode('blackAlpha.300', 'whiteAlpha.300')(props)
        })
    },
    Menu: {
        baseStyle: props => ({
            list: {
                // this will style the MenuList component
                bg: mode('#f4f0fc', '#1C1C20')(props)
            },
            item: {
                // this will style the MenuItem and MenuItemOption components
                bg: mode('#f4f0fc', '#1C1C20')(props),
                _hover: { bg: mode('#e5e5e5', '#292930')(props) }
            }
        })
    },
    Link: {
        baseStyle: props => ({
            color: mode('#613ded', '#ff63c3')(props),
            textUnderlineOffset: 3
        })
    }
}

const fonts = {
    heading: "'M PLUS Rounded 1c'"
}

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts })
export default theme
