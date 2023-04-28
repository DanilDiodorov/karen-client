import styled, { keyframes } from 'styled-components'

export const Message = ({ children, text, isMy = true, typing = false }) => {
    return (
        <Main isMy={isMy} className="message">
            {children}
            <Text>
                {text}
                {!isMy && typing ? <Mark>|</Mark> : <></>}
            </Text>
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
    white-space: pre-wrap;
    margin-right: 25px;

    @media ${({ theme }) => theme.media.large} {
        margin-right: 7px;
    }
`
const MarkKeyframes = keyframes`
    0% {
        opacity: 1;
    }
    50%{
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

const Mark = styled.span`
    margin-top: 4px;
    font-size: 16px;
    margin-left: 2px;
    width: 3px;
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.font};
    animation: ${MarkKeyframes} 0.2s ease-in infinite;
`

const Text = styled.div`
    margin-top: 10px;
`
