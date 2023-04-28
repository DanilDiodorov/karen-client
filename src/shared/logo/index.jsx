import styled from 'styled-components'
import { SiOpenai } from 'react-icons/si'

export const Logo = () => {
    return (
        <Main>
            <Icon>
                <SiOpenai />
            </Icon>
            <Text>karen 2.0</Text>
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    align-items: center;
`

const Icon = styled.div`
    font-size: 30px;
    display: flex;
    align-items: center;
`

const Text = styled.h4`
    margin: 0 0 0 10px;
    text-transform: uppercase;
    padding: 0;
`
