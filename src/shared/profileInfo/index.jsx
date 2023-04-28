import styled from 'styled-components'
import { SiOpenai } from 'react-icons/si'
import { FaUserCircle } from 'react-icons/fa'

export const ProfileInfo = ({ ava = null, name, text, def = false }) => {
    return (
        <Main>
            {def ? (
                <Icon>
                    <FaUserCircle />
                </Icon>
            ) : (
                <Icon>{ava ? <Ava src={ava} /> : <SiOpenai />}</Icon>
            )}

            <Block>
                <Name>{name}</Name>
                <Text>{text}</Text>
            </Block>
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`

const Ava = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`

const Block = styled.div``

const Icon = styled.div`
    font-size: 40px;
    display: flex;
    align-items: center;
`

const Name = styled.div``

const Text = styled.div`
    font-size: 12px;
    color: grey;
`
