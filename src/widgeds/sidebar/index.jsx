import styled from 'styled-components'
import { SidebarHeader } from '../../features/sidebarHeader'
import { SidebarFirstSection } from '../../features/sidebarFirstSection'
import { SidebarSecondSection } from '../../features/sidebarSecondSection'
import { SidebarFooter } from '../../features/sidebarFooter'
import { useSelector } from 'react-redux'

export const Sidebar = () => {
    const user = useSelector((state) => state.user)

    return (
        <Main className="sideBar" active={user.menu}>
            <SidebarHeader />
            <SidebarFirstSection />
            <SidebarSecondSection />
            <SidebarFooter />
        </Main>
    )
}

const Main = styled.div`
    width: ${({ theme }) => theme.sizes.sideBar.width}px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.bgSideBar};
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    border-right: 1px solid ${({ theme }) => theme.colors.stroke};
    flex-shrink: 0;

    @media ${({ theme }) => theme.media.large} {
        position: absolute;
        width: 100vw;
        height: 100vh;
        border: none;
        padding: 0;
        transform: ${({ active }) =>
            active ? 'translateX(0)' : 'translateX(-100%)'};
    }
`
