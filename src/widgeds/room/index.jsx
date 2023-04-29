import styled from 'styled-components'
import { RoomMessages } from '../../features/roomMessages'
import { RoomTools } from '../../features/roomTools'
import { RoomFooter } from '../../features/roomFooter'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import randomstring from 'randomstring'
import { useNavigate, useParams } from 'react-router-dom'
import { setCurrentRoom } from '../../store/slices/userSlice'
import { RoomHeader } from '../../features/roomHeader'

let lastSize = 0,
    currentSize = 0

export const Room = ({ roomID }) => {
    const rooms = useSelector((state) => state.rooms)
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    const [currentWaiting, setCurrentWaiting] = useState(null)
    const [currentCanSend, setCurrentCanSend] = useState(null)
    const [currentStop, setCurrentStop] = useState(null)
    const [currentRecieveWaiting, setCurrentRecieveWaiting] = useState(null)
    const [resized, setResized] = useState('')
    const [currentStream, setCurrentStream] = useState(null)
    const [currentMid, setCurrentMid] = useState('')
    const [currentTyping, setCurrentTyping] = useState(null)
    const [currentTools, setCurrentTools] = useState(false)
    const navigate = useNavigate()

    let { id } = useParams()

    if (id === undefined) {
        id = roomID
    }

    useEffect(() => {
        dispatch(setCurrentRoom(id))
    }, [id, dispatch])

    useEffect(() => {
        let found = false
        rooms.forEach((room) => {
            if (room.id === id) {
                setMessages(room.messages)
                setCurrentWaiting(room.waiting)
                setCurrentCanSend(room.canSend)
                setCurrentRecieveWaiting(room.recieveWaiting)
                setCurrentStop(room.stop)
                setCurrentStream(room.stream)
                setCurrentMid(room.currentMid)
                setCurrentTyping(room.typing)
                setCurrentTools(room.tools)
                found = true
            }
        })
        if (!found) {
            return navigate('/')
        }
        resizeHandler()
    }, [id, navigate, rooms])

    const resizeHandler = () => {
        const block = document.getElementById('ContainerElementID')
        currentSize = block.scrollHeight

        if (currentSize > lastSize) {
            setResized(randomstring.generate(5))
            lastSize = currentSize
        } else if (currentSize < lastSize) {
            lastSize = currentSize
        }
    }

    return (
        <Main>
            <RoomHeader id={id} tools={currentTools} />
            <RoomMessages
                messages={messages}
                currentWaiting={currentWaiting}
                id={id}
                resized={resized}
                recieveWaiting={currentRecieveWaiting}
                stop={currentStop}
                currentMid={currentMid}
                typing={currentTyping}
            />
            <RoomTools
                id={id}
                recieveWaiting={currentRecieveWaiting}
                currentStream={currentStream}
                messages={messages}
                active={currentTools}
            />
            <RoomFooter
                canSend={currentCanSend}
                id={id}
                waiting={currentWaiting}
            />
        </Main>
    )
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
