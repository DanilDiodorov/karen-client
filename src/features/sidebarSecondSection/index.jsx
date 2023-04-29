import styled from 'styled-components'
import { RoomButton } from '../../shared/roomButton'
import { useDispatch, useSelector } from 'react-redux'
import { RouteLink } from '../../shared/routeLink'
import { ConfirmPopup } from '../../shared/confirmPopup'
import { useState } from 'react'
import { deleteData, deleteDataById } from '../../helpers/dbFetch'
import { deleteRoom } from '../../store/slices/roomsSlice'
import { useNavigate } from 'react-router-dom'
import { EditRoomPopup } from '../editRoomPopup'
import { closeMenu } from '../../store/slices/userSlice'

let currentId = ''

export const SidebarSecondSection = () => {
    const rooms = useSelector((state) => state.rooms)
    const user = useSelector((state) => state.user)
    const [deletePopupActive, setDeletePopupActive] = useState(false)
    const [editPopupActive, setEditPopupActive] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClickDelete = (id, event) => {
        event.preventDefault()
        event.stopPropagation()
        currentId = id
        setDeletePopupActive(true)
    }

    const confirmDelete = async () => {
        setDeleteLoading(true)
        await deleteDataById('rooms', currentId)
        await deleteData('messages', 'roomID', currentId)
        dispatch(deleteRoom(currentId))
        setDeleteLoading(false)
        setDeletePopupActive(false)
        return navigate('/')
    }

    const onCancelDelete = () => {
        setDeletePopupActive(false)
    }

    const clickHandler = () => {
        dispatch(closeMenu())
    }

    return (
        <Main>
            <ConfirmPopup
                text={'Чат будет удален без возможности восстановления.'}
                onOk={() => confirmDelete()}
                title="Удалить чат"
                active={deletePopupActive}
                onCancel={() => onCancelDelete()}
                loading={deleteLoading}
            />
            <Text>Чаты</Text>
            {rooms.map((room) => {
                const link = '/room/' + room.id
                const active = room.id === user.currentRoom
                return (
                    <>
                        <EditRoomPopup
                            active={editPopupActive}
                            setActive={setEditPopupActive}
                            currentName={room.name}
                            currentSystem={room.system}
                            id={room.id}
                        />
                        <RouteLink to={link}>
                            <RoomButton
                                key={room.id}
                                id={room.id}
                                canEdit={room.canEdit}
                                active={active}
                                onClickDelete={(event) =>
                                    onClickDelete(room.id, event)
                                }
                                onClickEdit={(event) => {
                                    setEditPopupActive(true)
                                    event.preventDefault()
                                    event.stopPropagation()
                                }}
                                onClick={clickHandler}
                            >
                                {room.name}
                            </RoomButton>
                        </RouteLink>
                    </>
                )
            })}
        </Main>
    )
}

const Main = styled.section`
    margin-top: 20px;

    @media ${({ theme }) => theme.media.large} {
        padding: 0 10px;
    }
`

const Text = styled.div`
    margin-bottom: 20px;
`
