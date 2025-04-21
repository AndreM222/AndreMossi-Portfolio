import Content from './content'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/react'

import citationLang from '../pages/assets/citationsList.json'
import symbolLang from '../pages/assets/grammarSymbols.json'

const CitationList = ({ list }) => {
    const items = list.split(',')

    return (
        <span>
            {items.map((item, index) =>
                index === 0 ? (
                    <Link
                        href={Content(citationLang, 'link', item.toLowerCase().trim())}
                        alignItems="center"
                        display="inline-flex"
                        key={index}
                    >
                        {Content(citationLang, 'title', item.toLowerCase().trim())}
                        <ExternalLinkIcon ml={1} />
                    </Link>
                ) : (
                    <span key={index}>
                        {Content(symbolLang, 'separator', 'content')}{' '}
                        {
                            <Link
                                href={Content(citationLang, 'link', item.toLowerCase().trim())}
                                alignItems="center"
                                display="inline-flex"
                            >
                                {Content(citationLang, 'title', item.toLowerCase().trim())}
                                <ExternalLinkIcon ml={1} />
                            </Link>
                        }
                    </span>
                )
            )}
        </span>
    )
}

export default CitationList
