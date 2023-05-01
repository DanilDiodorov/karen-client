import styled, { keyframes } from 'styled-components'
import { SiOpenai } from 'react-icons/si'

export const LoadingPage = ({ active, progress = 0 }) => {
    return (
        <Main active={active}>
            <Icon />
            <Loader>
                <Fill progress={progress} />
            </Loader>
        </Main>
    )
}

const Main = styled.div`
    display: ${({ active }) => (active ? 'flex' : 'none')};
    position: absolute;
    width: 100vw;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.bgSideBar};
    z-index: 500;
    align-items: center;
    justify-content: center;
    gap: 30px;
    flex-direction: column;
`

const Loader = styled.div`
    width: 300px;
    height: 10px;
    border-radius: 10px;
    background-color: grey;
    overflow: hidden;
`

const Fill = styled.div`
    width: ${({ progress }) => progress}%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.purple};
    transition: all 0.5s ease-in-out;
`

const IconKeyframes = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const Icon = styled(SiOpenai)`
    font-size: 100px;
    animation: ${IconKeyframes} 5s linear infinite;
`
