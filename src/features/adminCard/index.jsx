import styled from 'styled-components'

export const AdminCard = ({ color, icon, title, count }) => {
    return (
        <Main color={color}>
            <Icon>{icon}</Icon>
            <Title>{title}</Title>
            <Count>{count}</Count>
        </Main>
    )
}

const Main = styled.div`
    flex: 1;
    min-width: 300px;
    height: 250px;
    background-color: ${({ color }) => color};
    border-radius: 15px;
    color: white;
    padding: 30px;
    font-size: 20px;
`

const Icon = styled.div`
    font-size: 40px;
`

const Title = styled.div``

const Count = styled.div`
    font-size: 40px;
    font-weight: bold;
    margin-top: 20px;
`
