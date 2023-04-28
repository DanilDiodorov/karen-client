import { BiMenu } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { openMenu } from '../../store/slices/userSlice'
import { closeTools, openTools } from '../../store/slices/roomsSlice'
import { animateScroll } from 'react-scroll'
import { IoClose } from 'react-icons/io5'

export const RoomHeader = ({ id, tools }) => {
    const dispatch = useDispatch()

    const toolsHandler = () => {
        if (tools) {
            dispatch(closeTools(id))
        } else {
            dispatch(openTools(id))
            setTimeout(() => {
                animateScroll.scrollToBottom({
                    smooth: true,
                    duration: 0,
                    containerId: 'ContainerElementID',
                })
            }, 1)
        }
    }
    return (
        <Main>
            <Left>
                <BiMenu onClick={() => dispatch(openMenu())} />
            </Left>
            <Right onClick={toolsHandler}>
                {tools ? <IoClose /> : <BsThreeDotsVertical />}
            </Right>
        </Main>
    )
}

const Main = styled.div`
    display: none;
    height: 70px;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    flex-shrink: 0;

    @media ${({ theme }) => theme.media.large} {
        display: flex;
    }
`

const Left = styled.div``

const Right = styled.div``
