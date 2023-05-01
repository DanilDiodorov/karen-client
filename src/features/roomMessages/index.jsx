import styled from 'styled-components'
import { Message } from '../../shared/message'
import { ProfileInfo } from '../../shared/profileInfo'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Loader from '../../shared/loader'
import { animateScroll } from 'react-scroll'

export const RoomMessages = ({
    id,
    messages,
    recieveWaiting,
    resized,
    stop,
    currentMid,
    typing,
    currentName,
}) => {
    const user = useSelector((state) => state.user)
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stop])

    useEffect(() => {
        let block = document.querySelector('#ContainerElementID')
        if (block.scrollHeight - (block.clientHeight + block.scrollTop) < 100) {
            animateScroll.scrollToBottom({
                smooth: true,
                duration: 100,
                containerId: 'ContainerElementID',
            })
        }
    }, [resized])

    useEffect(() => {
        if (user.currentRoom === id && messages.length > 0 && flag) {
            let block = document.querySelector('#ContainerElementID')
            if (block.clientHeight < block.scrollHeight) {
                animateScroll.scrollToBottom({
                    smooth: true,
                    duration: 0,
                    containerId: 'ContainerElementID',
                })
                setFlag(false)
            }
        }
    }, [id, user.currentRoom, messages, flag])

    useEffect(() => {
        setFlag(true)
    }, [user.currentRoom])

    return (
        <Main id="ContainerElementID">
            {messages.map((message, index) => (
                <Message
                    key={index}
                    text={message.content}
                    isMy={message.role === 'user' ? true : false}
                    typing={typing && currentMid === message.mid ? true : false}
                >
                    <ProfileInfo
                        def={message.role === 'user' ? true : false}
                        ava={null}
                        name={message.role === 'user' ? user.name : currentName}
                        text={message.time}
                    />
                </Message>
            ))}
            {recieveWaiting ? (
                <Message isMy={false} loader={<Loader />}>
                    <ProfileInfo ava={null} name={'Karen'} text={''} />
                </Message>
            ) : (
                <></>
            )}
        </Main>
    )
}

const Main = styled.div`
    padding-top: 10px;
    flex: 1;
    gap: 10px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`
