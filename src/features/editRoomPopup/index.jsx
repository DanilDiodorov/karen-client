import { useEffect, useRef, useState } from 'react'
import { Popup } from '../../shared/popup'
import { Input } from '../../shared/input'
import { TextArea } from '../../shared/textArea'
import { updateDataById } from '../../helpers/dbFetch'
import { useDispatch } from 'react-redux'
import { setNameAndSystem } from '../../store/slices/roomsSlice'
import { Error } from '../../shared/Error'
import { useNavigate } from 'react-router-dom'

export const EditRoomPopup = ({
    active,
    setActive,
    currentName,
    currentSystem,
    id,
}) => {
    const nameRef = useRef('')
    const systemRef = useRef('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        nameRef.current.value = currentName
        systemRef.current.value = currentSystem
    }, [currentName, currentSystem])

    const onOk = async () => {
        const name = nameRef.current.value.trim()
        const system = systemRef.current.value.trim()
        if (name.length < 4) {
            setError('Имя должно быть более 3 символов')
        } else if (name.length > 20) {
            setError('Имя должно быть менее 20 символов')
        } else {
            setLoading(true)
            const newRoom = await updateDataById('rooms', id, {
                name,
                system,
            })
            setError('')
            dispatch(setNameAndSystem({ id, name, system }))
            setLoading(false)
            setActive(false)
            return navigate('/room/' + newRoom.id)
        }
    }
    const onCancel = () => {
        setError('')
        nameRef.current.value = currentName
        systemRef.current.value = currentSystem
        setActive(false)
    }

    return (
        <Popup
            title="Редактировать чат"
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
