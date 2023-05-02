import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { AdminUserItem } from '../adminUserItem'
import { getAllData } from '../../helpers/dbFetch'

export const AdminUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllData('users').then((data) => {
            setUsers(data)
        })
    }, [])

    return (
        <Main>
            <UsersTable>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th width="40px">№</Th>
                                <Th width="400px">E-mail</Th>
                                <Th width="300px">Имя пользователя</Th>
                                <Th width="200px">Статус</Th>
                                <Th width="100px">Чаты</Th>
                                <Th width="100px">Сообщения</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((user, index) => (
                                <AdminUserItem user={user} index={index} />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </UsersTable>
        </Main>
    )
}

const Main = styled.div``

const UsersTable = styled.div`
    overflow: auto;
    border-radius: 5px;
`

const TableContainer = styled.table`
    width: 100%;
`

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
    white-space: nowrap;
    margin-top: 20px;
`

const Thead = styled.thead`
    background-color: #474f65;
    color: white;
    height: 60px;
    border-radius: 20px;
`

const Tr = styled.tr``

const Th = styled.th`
    padding: 10px;
    text-align: left;
`

const Tbody = styled.tbody``
