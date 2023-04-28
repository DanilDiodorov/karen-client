import styled, { ThemeProvider } from 'styled-components'
import { Sidebar } from './widgeds/sidebar'
import { darkTheme, lightTheme } from './styles/theme'
import { useEffect } from 'react'
import { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from './widgeds/login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { deleteUser, setCurrentRoom, setUser } from './store/slices/userSlice'
import { getDataById, getDataOrderBy, setData } from './helpers/dbFetch'
import { LoadingPage } from './shared/loadingPage'
import {
    addMessage,
    addRoom,
    deleteRooms,
    fillMessage,
    setCurrentMid,
    setFullMessage,
    setMessages,
    setRecieveWaiting,
    setRooms,
    setTyping,
    setWaiting,
} from './store/slices/roomsSlice'
import { Signin } from './widgeds/signin'
import socket from './socket'
import randomstring from 'randomstring'
import { currentTime } from './helpers/getTime'
import { Room } from './widgeds/room'

let flag = true

function App() {
    const user = useSelector((state) => state.user)
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    const rooms = useSelector((state) => state.rooms)
    const dispatch = useDispatch()

    useEffect(() => {
        if (flag) {
            document
                .querySelector(':root')
                .style.setProperty('--vh', window.innerHeight / 100 + 'px')
            window.addEventListener('resize', () => {
                document
                    .querySelector(':root')
                    .style.setProperty('--vh', window.innerHeight / 100 + 'px')
            })
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setLoading(true)
                    const data = await getDataById('users', user.uid)
                    dispatch(
                        setUser({
                            uid: user.uid,
                            email: data.email,
                            name: data.name,
                            ava: data.ava,
                            status: data.status,
                            dark: data.dark,
                        })
                    )
                    setProgress(25)
                    const rooms = await getDataOrderBy(
                        'rooms',
                        'uid',
                        user.uid,
                        'createdAt'
                    )
                    dispatch(setRooms([]))
                    rooms.forEach((room) => {
                        dispatch(addRoom(room))
                    })
                    setProgress(50)
                    let s = 50
                    let k = 50 / rooms.length
                    rooms.forEach(async (room) => {
                        const messages = await getDataOrderBy(
                            'messages',
                            'roomID',
                            room.id,
                            'time2'
                        )
                        s += k
                        setProgress(s)
                        dispatch(setMessages({ id: room.id, messages }))
                    })
                    dispatch(setCurrentRoom(rooms[0].id))
                    setTimeout(() => {
                        setLoading(false)
                        setProgress(0)
                    }, 2000)
                } else {
                    dispatch(deleteUser())
                    dispatch(deleteRooms())
                    setLoading(false)
                    dispatch(setCurrentRoom(rooms[0].id))
                }
            })
            flag = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        socket.on('message', (data) => {
            rooms.forEach((room) => {
                if (data.id === room.id && !room.stop) {
                    if (data.type === 'start') {
                        let newMessage = {
                            mid: randomstring.generate(10),
                            role: 'assistant',
                            content: data.content,
                        }
                        dispatch(
                            setFullMessage({
                                id: room.id,
                                fullMessage: data.content,
                            })
                        )
                        dispatch(
                            addMessage({ id: room.id, message: newMessage })
                        )
                        dispatch(
                            setCurrentMid({
                                id: room.id,
                                currentMid: newMessage.mid,
                            })
                        )
                        dispatch(
                            setRecieveWaiting({
                                id: room.id,
                                recieveWaiting: false,
                            })
                        )
                    } else if (data.type === 'middle') {
                        dispatch(setTyping({ id: room.id, typing: true }))

                        dispatch(
                            fillMessage({
                                id: room.id,
                                content: data.content,
                            })
                        )
                        dispatch(
                            setFullMessage({
                                id: room.id,
                                fullMessage: room.fullMessage + data.content,
                            })
                        )
                    }
                    if (data.type === 'end') {
                        dispatch(setTyping({ id: room.id, typing: false }))
                        setData('messages', room.currentMid, {
                            mid: room.currentMid,
                            roomID: room.id,
                            role: 'assistant',
                            content: room.fullMessage,
                            time: currentTime(),
                            time2: Date.now(),
                        })
                        dispatch(
                            setFullMessage({ id: room.id, fullMessage: '' })
                        )
                        dispatch(setWaiting({ id: room.id, waiting: false }))
                    }
                    if (data.type === 'nonstream') {
                        let newMessage = {
                            mid: randomstring.generate(10),
                            role: 'assistant',
                            content: data.content,
                            time2: Date.now(),
                        }
                        dispatch(
                            addMessage({
                                id: room.id,
                                message: newMessage,
                            })
                        )
                        newMessage = {
                            ...newMessage,
                            roomID: room.id,
                        }
                        setData('messages', newMessage.mid, newMessage)
                        dispatch(
                            setRecieveWaiting({
                                id: room.id,
                                recieveWaiting: false,
                            })
                        )
                        dispatch(setWaiting({ id: room.id, waiting: false }))
                    }
                }
            })
        })

        return () => {
            socket.off('message')
        }
    }, [dispatch, rooms])

    return (
        <ThemeProvider theme={user.dark ? darkTheme : lightTheme}>
            <BrowserRouter>
                <Main>
                    <LoadingPage active={loading} progress={progress} />
                    <Sidebar />
                    <Routes>
                        <Route
                            path="/"
                            index
                            element={<Room roomID={rooms[0].id} />}
                        />
                        <Route path="/room/:id" index element={<Room />} />
                        <Route path="/login" index element={<Login />} />
                        <Route
                            path="/signin"
                            index
                            element={<Signin user={user} />}
                        />
                    </Routes>
                </Main>
            </BrowserRouter>
        </ThemeProvider>
    )
}

const Main = styled.div`
    color: ${({ theme }) => theme.colors.font};
    position: relative;
    height: calc(100 * var(--vh));
    width: 100vw;
    overflow: hidden;
    display: flex;

    @media ${({ theme }) => theme.media.large} {
        height: calc(100 * var(--vh));
    }
`

export default App
