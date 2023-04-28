import styled from 'styled-components'
import { IoSend } from 'react-icons/io5'

export const Send = ({ active = false, send = () => {} }) => {
    return (
        <Main onClick={() => send()} active={active}>
            <IoSend />
        </Main>
    )
}

const Main = styled.div`
    color: #fff;
    width: 50px;
    height: 50px;
    background-color: ${({ theme, active }) =>
        active ? theme.colors.purple : 'grey'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
    flex-shrink: 0;

    &:hover {
        cursor: ${({ active }) => (active ? 'pointer' : 'auto')};
    }
`
