import styled from 'styled-components'
import { Logo } from '../../shared/logo'
import { IoClose } from 'react-icons/io5'
import { closeMenu } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'

export const SidebarHeader = () => {
    const dispatch = useDispatch()

    return (
        <Main>
            <Logo />
            <CloseButton>
                <IoClose onClick={() => dispatch(closeMenu())} />
            </CloseButton>
        </Main>
    )
}

const Main = styled.header`
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media ${({ theme }) => theme.media.large} {
        padding: 0 10px;
    }
`

const CloseButton = styled.div`
    font-size: 30px;
    display: none;

    @media ${({ theme }) => theme.media.large} {
        display: block;
        padding: 20px 10px;
    }
`
