import styled from 'styled-components'
import { marked } from 'marked'
import { useEffect } from 'react'
import { useRef } from 'react'

export const Message = ({
    children,
    text = '',
    isMy = true,
    loader = null,
}) => {
    const textRef = useRef(null)

    useEffect(() => {
        textRef.current.innerHTML = marked.parse(
            typeof text === 'string' ? text : ''
        )
    }, [text])

    return (
        <Main isMy={isMy} className="message">
            {children}
            {loader !== null ? <Loader>{loader}</Loader> : <></>}
            <Text ref={textRef}></Text>
        </Main>
    )
}

const Main = styled.div`
    border: 1px solid
        ${({ theme, isMy }) =>
            isMy ? theme.colors.stroke : theme.colors.primary};
    border-radius: ${({ theme }) => theme.sizes.borderRadius}px;
    background-color: ${({ theme, isMy }) =>
        isMy ? theme.colors.bgMessage : theme.colors.primary};
    padding: 15px;
    max-width: 100%;
    margin-right: 25px;

    @media ${({ theme }) => theme.media.large} {
        margin-right: 7px;
    }
`

const Text = styled.div`
    margin-top: 10px;
`
const Loader = styled.div`
    margin-top: 10px;
`
