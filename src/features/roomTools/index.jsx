import styled from 'styled-components'
import { FooterButton } from '../../shared/footerButton'
import { AiFillDelete } from 'react-icons/ai'
import { FaStop } from 'react-icons/fa'
import { VscDebugRestart } from 'react-icons/vsc'
import { CiStreamOn } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteMessages,
    restart,
    setStop,
    setStream,
} from '../../store/slices/roomsSlice'
import { deleteData } from '../../helpers/dbFetch'
import { ConfirmPopup } from '../../shared/confirmPopup'
import { useState } from 'react'

export const RoomTools = ({
    id,
    recieveWaiting,
    currentStream,
    messages,
    active = false,
}) => {
    const dispatch = useDispatch()
    const [popupActive, setPopupActive] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const { logged } = useSelector((state) => state.user)

    const streamState = (state) => {
        if (typeof state == 'boolean')
            dispatch(setStream({ id, stream: state }))
    }

    const stopHandler = () => {
        dispatch(setStop({ id, stop: true }))
    }

    const restartHandler = () => {
        if (!recieveWaiting) {
            dispatch(setStop({ id, stop: true }))
            dispatch(restart(id))
        }
    }

    const confirmDelete = async () => {
        setDeleteLoading(true)
        dispatch(setStop({ id, stop: true }))
        if (logged) await deleteData('messages', 'roomID', id)
        dispatch(deleteMessages(id))
        setDeleteLoading(false)
        setPopupActive(false)
    }

    const onCancel = () => {
        setPopupActive(false)
    }

    const deleteHandler = () => {
        if (messages.length > 0) setPopupActive(true)
    }

    return (
        <Main active={active}>
            <ConfirmPopup
                text={
                    'Все сообщения будут удалены без возможности восстановления.'
                }
                onOk={() => confirmDelete()}
                title="Удалить все сообщения"
                active={popupActive}
                onCancel={() => onCancel()}
                loading={deleteLoading}
            />
            <Left>
                <FooterButton
                    Icon={AiFillDelete}
                    text={'Удалить'}
                    danger={true}
                    border={true}
                    onClick={() => deleteHandler()}
                />
                {logged ? (
                    <FooterButton
                        Icon={CiStreamOn}
                        text={'Стрим'}
                        type={false}
                        onClick={streamState}
                        toggled={currentStream}
                        border={true}
                    />
                ) : (
                    <></>
                )}
            </Left>
            <Right>
                <FooterButton
                    Icon={VscDebugRestart}
                    text={'Заново'}
                    border={true}
                    onClick={() => restartHandler()}
                />
                <FooterButton
                    Icon={FaStop}
                    text={'Остановить'}
                    border={true}
                    onClick={() => stopHandler()}
                />
            </Right>
        </Main>
    )
}

const Main = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 30px;

    @media ${({ theme }) => theme.media.large} {
        display: ${({ active }) => (active ? 'flex' : 'none')};
        flex-wrap: wrap;
        gap: 10px;
    }
`

const Left = styled.div`
    height: 50px;
    display: flex;
    gap: 10px;
`

const Right = styled.div`
    height: 50px;
    display: flex;
    gap: 10px;
`
