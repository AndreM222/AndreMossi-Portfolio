'use client'

import Link from 'next/link'
import Image from 'next/image'
import styled from '@emotion/styled'
import Content from './content'
import miscLang from '../locales/misc.json'

const LogoBox = styled.span`
    font-weight: bold;
    font-size: 18px;
    display: inline-flex;
    align-items: center;
    height: 20px;
    line-height: 20px;
    padding: 10px;
    gap: 9px;

    > img {
        transition: 100ms ease;
    }

    &:hover img {
        transform: rotate(15deg) scale(1.2);
    }
`

const Logo = () => {
    const logoPrintImg = `/images/LogoNav.svg`

    return (
        <Link
            href="/"
            fontFamily="M PLUS Rounded 1c"
            fontWeight="bold"
        >
            <LogoBox>
                <Image src={logoPrintImg} width={20} height={20} alt="logo" />
                {Content(miscLang, 'title', 'name')}
            </LogoBox>
        </Link>
    )
}

export default Logo
