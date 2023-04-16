import Link from 'next/link'
import Image from 'next/image'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

const LogoBox = styled.span`
    font-weight: bold;
    font-size: 18px;
    display: inline-flex;
    align-items: center;
    height: 30px;
    line-height: 20px;
    padding: 10px;

    > img {
        transition: 100ms ease;
    }

    &:hover img {
        transform: rotate(15deg);
    }
`

const Logo = () => {
    const logoPrintImg = `/images/LogoNav.png`

    return (
        <Link href="/">
            <LogoBox>
                <Image src={logoPrintImg} width={20} height={20} alt="logo" />
                <Text
                    color={useColorModeValue('gray.800', 'whiteAlpha.900')}
                    fontFamily="M PLUS Rounded 1c"
                    fontWeight="bold"
                    ml={3}
                >
                    André Mossi
                </Text>
            </LogoBox>
        </Link>
    )
}

export default Logo
