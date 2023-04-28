import { useRef, useState } from 'react'
import { Popup } from '../../shared/popup'
import { Input } from '../../shared/input'
import { TextArea } from '../../shared/textArea'
import { addData } from '../../helpers/dbFetch'
import { useDispatch, useSelector } from 'react-redux'
import { addRoom } from '../../store/slices/roomsSlice'
import { Error } from '../../shared/Error'
import { useNavigate } from 'react-router-dom'

export const AddRoomPopup = ({ active, setActive }) => {
    const nameRef = useRef('')
    const systemRef = useRef('')
    const user = useSelector((state) => state.user)
    const rooms = useSelector((state) => state.rooms)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const onOk = async () => {
        const name = nameRef.current.value.trim()
        const system = systemRef.current.value.trim()
        if (user.status === 1 && rooms.length >= 3) {
            setError('Ваше текущий статус не позволаят создавать более 3 чатов')
        } else if (user.status === 2 && rooms.length >= 7) {
            setError('Ваше текущий статус не позволаят создавать более 7 чатов')
        }
        if (name.length < 4) {
            setError('Имя должно быть более 3 символов')
        } else if (name.length > 20) {
            setError('Имя должно быть менее 20 символов')
        } else {
            setLoading(true)
            const newRoom = await addData('rooms', {
                uid: user.uid,
                type: 'text',
                name,
                system,
                stream: true,
                canEdit: true,
                createdAt: Date.now(),
                lastMessage: {},
                messages: [],
            })
            setError('')
            nameRef.current.value = ''
            systemRef.current.value = ''
            dispatch(addRoom(newRoom))
            setLoading(false)
            setActive(false)
            return navigate('/room/' + newRoom.id)
        }
    }
    const onCancel = () => {
        setError('')
        nameRef.current.value = ''
        nameRef.current.value = ''
        setActive(false)
    }

    return (
        <Popup
            title="Добавить чат"
            active={active}
            onOk={onOk}
            onCancel={onCancel}
            loading={loading}
            type="default"
        >
            {error !== '' ? <Error>{error}</Error> : <></>}
            <Input ref={nameRef} placeholder="Название" />
            <TextArea
                ref={systemRef}
                rows="4"
                placeholder="Системное сообщение. Например: 'Представь, что ты психолог'. Это поле можно пропустить"
            />
        </Popup>
    )
}
