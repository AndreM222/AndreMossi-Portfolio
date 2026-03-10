import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
    globalCss: {
        html: {
            bg: 'body.bg',
        },
        body: {
            bg: 'body.bg',
            color: 'body.color'
        }
    },

    theme: {
        tokens: {
            fonts: {
                heading: { value: "'M PLUS Rounded 1c'" }
            }
        },

        semanticTokens: {
            colors: {
                body: {
                    bg: {
                        value: { base: '#f1ece8', _dark: '#101015' }
                    },

                    color: {
                        value: { base: 'gray.800', _dark: 'whiteAlpha.900' }
                    }
                },

                menuBg: {
                    value: { base: '#f4f0fc', _dark: '#1C1C20' }
                },

                menuHover: {
                    value: { base: '#e5e5e5', _dark: '#292930' }
                },

                link: {
                    value: { base: '#613ded', _dark: '#ff63c3' }
                },

                border: {
                    value: { base: 'blackAlpha.300', _dark: 'whiteAlpha.300' }
                }
            }
        },

        slotRecipes: {
            menu: {
                base: {
                    item: {
                        border: 'none',
                        _hover: {
                            bg: {
                                base: '#e5e5e5',
                                _dark: '#292930'
                            }
                        }
                    }
                }
            }
        },

        recipes: {
            heading: {
                variants: {
                    variant: {
                        'section-title': {
                            base: {
                                textDecoration: 'underline',
                                fontSize: '20px',
                                textUnderlineOffset: '6px',
                                textDecorationColor: '#525252',
                                textDecorationThickness: '4px',
                                marginTop: '12px',
                                marginBottom: '16px'
                            }
                        }
                    }
                }
            },

            container: {
                base: {
                    maxWidth: '2xl',
                }
            },

            separator: {
                base: {
                    borderColor: {
                        base: 'gray.300',
                        _dark: 'gray.800'
                    }
                }
            },

            link: {
                base: {
                    color: 'link',
                    textUnderlineOffset: '3px'
                },
                variants: {
                    variant: {
                        plain: {
                            color: 'link',
                            _hover: {
                                textDecoration: 'underline',
                                textUnderlineOffset: '3px',
                                textDecorationColor: 'currentColor/20'
                            }
                        }
                    }
                },

                defaultVariants: {
                    variant: 'plain'
                }
            }
        }
    }
})

export const system = createSystem(defaultConfig, config)
export default system
