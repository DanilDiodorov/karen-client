import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { getCountWhere, getData } from '../../helpers/dbFetch'

export const AdminUserItem = ({ user, index }) => {
    const [rooms, setRooms] = useState(0)
    const [messages, setMessages] = useState(0)
    const [status, setStatus] = useState('')

    const getUserData = async () => {
        const newRooms = await getData('rooms', 'uid', user.id)
        setRooms(newRooms.length)
        let s = 0
        newRooms.forEach(async (room) => {
            const newRoom = await getCountWhere('messages', 'roomID', room.id)
            setMessages(s + newRoom)
            s += newRoom
        })
    }

    useEffect(() => {
        getUserData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (user.status === 1) setStatus('Обычный')
        else if (user.status === 2) setStatus('Премиум')
        else if (user.status === 3) setStatus('Премиум')
    }, [user])

    return (
        <Main>
            <Td>{index + 1}</Td>
            <Td>{user.email}</Td>
            <Td>{user.name}</Td>
            <Td>{status}</Td>
            <Td>{rooms}</Td>
            <Td>{messages}</Td>
        </Main>
    )
}

const Main = styled.tr``

const Td = styled.td`
    padding: 10px;
    text-align: left;
`
