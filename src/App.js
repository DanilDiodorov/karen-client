import styled, { ThemeProvider } from 'styled-components'
import { Sidebar } from './widgeds/sidebar'
import { darkTheme, lightTheme } from './styles/theme'
import { useEffect } from 'react'
import { useState } from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
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
import { Admin } from './widgeds/admin'

let flag = true

function App() {
    const user = useSelector((state) => state.user)
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    const rooms = useSelector((state) => state.rooms)
    const dispatch = useDispatch()

    useEffect(() => {
        if (flag) {
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
                        if (user.logged)
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
                        if (user.logged)
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
    }, [dispatch, rooms, user.logged])

    useEffect(() => {
        // let vh = window.innerHeight * 0.01
        // document.querySelector('#root').style.setProperty('--vh', `${vh}px`)
        // window.addEventListener('resize', () => {
        //     let vh = window.innerHeight * 0.01
        //     document.documentElement.style.setProperty('--vh', `${vh}px`)
        // })
        // return () => {
        //     window.removeEventListener('resize', () => {})
        // }
    }, [])

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
                            element={
                                <Room
                                    roomID={
                                        rooms[0] !== undefined
                                            ? rooms[0].id
                                            : '1'
                                    }
                                />
                            }
                        />
                        <Route path="/room/:id" element={<Room />} />
                        {user.logged ? (
                            <Route path="/admin" element={<Admin />} />
                        ) : (
                            <></>
                        )}
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/signin"
                            element={<Signin user={user} />}
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route
                            element={
                                <Room
                                    roomID={
                                        rooms[0] !== undefined
                                            ? rooms[0].id
                                            : '1'
                                    }
                                />
                            }
                        />
                    </Routes>
                </Main>
            </BrowserRouter>
        </ThemeProvider>
    )
}

const Main = styled.div`
    color: ${({ theme }) => theme.colors.font};
    width: 100vw;
    overflow: hidden;
    display: flex;
    height: 100%;
    position: relative;

    /* @media ${({ theme }) => theme.media.large} {
        height: 100%;
    } */
`

export default App
