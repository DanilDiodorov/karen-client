import styled from 'styled-components'
import { AdminHeader } from '../../features/adminHeader'
import { AdminUsers } from '../../features/adminUsers'

export const Admin = () => {
    return (
        <Main>
            <AdminHeader />
            <AdminUsers />
        </Main>
    )
}

const Main = styled.div`
    background-color: ${({ theme }) => theme.colors.bgMain};
    flex-basis: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex: 1;

    @media ${({ theme }) => theme.media.large} {
        padding: 10px;
        width: 100vw;
    }
`
