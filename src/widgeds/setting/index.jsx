import styled from 'styled-components'

export const Setting = () => {
    return <Main></Main>
}

const Main = styled.div`
    background-color: ${({ theme }) => theme.colors.bgMain};
    flex-basis: 1;
    padding: 0 0 20px 25px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;

    @media ${({ theme }) => theme.media.large} {
        padding: 0 0 10px 5px;
        width: 100vw;
    }
`
