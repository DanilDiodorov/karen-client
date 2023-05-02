import styled from 'styled-components'
import { AdminCard } from '../adminCard'
import { BiChat, BiMessage, BiUser } from 'react-icons/bi'
import { useEffect } from 'react'
import { useState } from 'react'
import { getCount } from '../../helpers/dbFetch'

export const AdminHeader = () => {
    const [users, setUsers] = useState(0)
    const [rooms, setRooms] = useState(0)
    const [messages, setMessages] = useState(0)

    const getData = async () => {
        setUsers(await getCount('users'))
        setRooms(await getCount('rooms'))
        setMessages(await getCount('messages'))
    }

    useEffect(() => {
        getData()
    })

    return (
        <Main>
            <AdminCard
                color="#BA80F4"
                icon={<BiUser />}
                title="Всего пользователей"
                count={users}
            />
            <AdminCard
                color="#7F88EB"
                icon={<BiChat />}
                title="Всего чатов"
                count={rooms}
            />
            <AdminCard
                color="#FEA688"
                icon={<BiMessage />}
                title="Всего сообщений"
                count={messages}
            />
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
`
