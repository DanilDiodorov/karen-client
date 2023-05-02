import styled from 'styled-components'
import { TextArea } from '../../shared/textArea'
import { Send } from '../../shared/send'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { addMessage, setCanSend } from '../../store/slices/roomsSlice'
import { animateScroll } from 'react-scroll'
import randomstring from 'randomstring'
import { setData } from '../../helpers/dbFetch'

let shift = false

export const RoomFooter = ({ id, canSend, waiting }) => {
    const user = useSelector((state) => state.user)
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const sendHandler = () => {
        if (canSend) {
            let newMessage = {
                mid: randomstring.generate(10),
                role: 'user',
                content: text,
                time2: Date.now(),
            }
            dispatch(
                addMessage({
                    id,
                    message: newMessage,
                })
            )
            newMessage = {
                ...newMessage,
                roomID: id,
            }
            if (user.logged) {
                setData('messages', newMessage.mid, newMessage)
            }
            setText('')
            setTimeout(() => {
                animateScroll.scrollToBottom({
                    smooth: true,
                    duration: 100,
                    containerId: 'ContainerElementID',
                })
            }, 100)
        }
    }

    const keyDownHandler = (e) => {
        if (e.keyCode === 16) {
            shift = true
        }
        if (e.keyCode === 13 && !shift) {
            e.preventDefault()
            sendHandler()
        }
    }

    const keyUpHandler = (e) => {
        if (e.keyCode === 16) {
            shift = false
        }
    }

    useEffect(() => {
        const textarea = document.querySelector('.input')
        if (textarea.scrollHeight > textarea.offsetHeight) {
            let height = textarea.scrollHeight
            if (textarea.scrollHeight > 150) {
                height = 140
            } else {
                textarea.style.height = 'auto'
            }
            textarea.style.height = height - 15 + 'px'
        } else {
            textarea.style.height = 'auto'
            textarea.style.height = textarea.scrollHeight - 15 + 'px'
        }
    }, [text])

    useEffect(() => {
        if (text.length > 0 && waiting === false)
            dispatch(setCanSend({ id, canSend: true }))
        else dispatch(setCanSend({ id, canSend: false }))
    }, [dispatch, id, text, waiting])

    return (
        <Main>
            <TextArea
                placeholder="Сообщение"
                className="input"
                value={text}
                onChange={(data) => setText(data.target.value)}
                onKeyDown={(e) => keyDownHandler(e)}
                onKeyUp={(e) => keyUpHandler(e)}
            />
            <Send active={canSend} send={() => sendHandler()} />
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 30px;
    gap: 10px;
    align-items: flex-end;

    @media ${({ theme }) => theme.media.large} {
        margin-right: 10px;
        margin-top: 5px;
    }
`
