import { createSlice } from '@reduxjs/toolkit'
import randomstring from 'randomstring'
import socket from '../../socket'
import { currentTime } from '../../helpers/getTime'
import { deleteData, setData, updateDataById } from '../../helpers/dbFetch'

const initialState = [
    {
        uid: null,
        id: randomstring.generate(10),
        type: 'text',
        name: 'Karen',
        system: '',
        stream: true,
        canEdit: false,
        canSend: false,
        waiting: false,
        stop: true,
        recieveWaiting: false,
        typing: false,
        tools: false,
        fullMessage: '',
        currentMid: '',
        lastMessage: {},
        messages: [],
    },
]

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRooms: (state, action) => {
            state = action.payload
            return state
        },
        addRoom: (state, action) => {
            state = [
                ...state,
                {
                    id: action.payload.id,
                    uid: action.payload.uid,
                    type: action.payload.type,
                    name: action.payload.name,
                    system: action.payload.system,
                    stream: action.payload.stream,
                    canEdit: action.payload.canEdit,
                    canSend: false,
                    waiting: false,
                    stop: true,
                    tools: false,
                    recieveWaiting: false,
                    createdAt: action.payload.createdAt,
                    lastMessage: {},
                    messages: [],
                },
            ]
            return state
        },
        deleteRoom: (state, action) => {
            state = state.filter((room) => {
                return room.id !== action.payload
            })
            return state
        },
        deleteRooms: (state) => {
            state = initialState
            return state
        },
        addMessage: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload.id) {
                    action.payload.message.time = currentTime()
                    room.messages = [...room.messages, action.payload.message]
                    if (action.payload.message.role === 'user') {
                        room.lastMessage = {
                            id: room.id,
                            mid: randomstring.generate(10),
                            stream: room.stream,
                            system: room.system,
                            messages: room.messages,
                        }
                        room.waiting = true
                        room.recieveWaiting = true
                        room.canSend = false
                        room.stop = false
                        socket.emit('message', room.lastMessage)
                    }
                }
                return room
            })
            return state
        },
        fillMessage: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload.id) {
                    room.messages[room.messages.length - 1].content +=
                        action.payload.content
                }
                return state
            })

            return state
        },
        setMessages: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload.id) {
                    room.messages = action.payload.messages
                    room.lastMessage = {
                        id: room.id,
                        mid: randomstring.generate(10),
                        stream: room.stream,
                        messages: room.messages,
                    }
                }
                return state
            })

            return state
        },
        deleteMessages: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload) {
                    room.messages = []
                }
                return state
            })

            return state
        },
        setCanSend: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload.id)
                    room.canSend = action.payload.canSend
                return room
            })
            return state
        },
        setWaiting: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload.id) {
                    room.waiting = action.payload.waiting
                    if (room.waiting) room.canSend = false
                }
                return room
            })
            return state
        },
        setRecieveWaiting: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload.id) {
                    room.recieveWaiting = action.payload.recieveWaiting
                    if (room.waiting) room.canSend = false
                }
                return room
            })
            return state
        },
        setStream: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload.id) {
                    room.stream = action.payload.stream
                    updateDataById('rooms', room.id, { stream: room.stream })
                }
                return room
            })
            return state
        },
        setTyping: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload.id) {
                    room.typing = action.payload.typing
                }
                return room
            })
            return state
        },
        setFullMessage: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload.id) {
                    room.fullMessage = action.payload.fullMessage
                }
                return room
            })
            return state
        },
        setCurrentMid: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload.id) {
                    room.currentMid = action.payload.currentMid
                }
                return room
            })
            return state
        },
        setStop: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload.id) {
                    room.stop = action.payload.stop
                    if (room.stop && room.waiting) {
                        room.waiting = false
                        room.recieveWaiting = false
                        room.canSend = true
                        socket.emit('stop', room.lastMessage.mid)
                    }
                    if (room.stop) {
                        room.typing = false
                        if (room.fullMessage !== '')
                            setData('messages', room.currentMid, {
                                mid: room.currentMid,
                                roomID: room.id,
                                role: 'assistant',
                                content: room.fullMessage,
                                time: currentTime(),
                                time2: Date.now(),
                            })
                        setFullMessage('')
                    }
                }
                return room
            })
            return state
        },
        setNameAndSystem: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload.id) {
                    room.name = action.payload.name
                    room.system = action.payload.system
                }
                return room
            })
            return state
        },
        restart: (state, action) => {
            state.map((room) => {
                if (
                    room.id === action.payload &&
                    room.lastMessage !== {} &&
                    room.messages.length > 0
                ) {
                    if (
                        room.messages[room.messages.length - 1].role ===
                        'assistant'
                    ) {
                        room.messages.pop()
                        deleteData(
                            'messages',
                            'mid',
                            room.messages[room.messages.length - 1].mid
                        )
                    }
                    room.waiting = true
                    room.recieveWaiting = true
                    room.canSend = false
                    room.stop = false
                    room.lastMessage.stream = room.stream
                    room.lastMessage.system = room.system
                    room.lastMessage.mid = randomstring.generate(10)
                    socket.emit('message', room.lastMessage)
                }
                return room
            })
            return state
        },
        openTools: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload) {
                    room.tools = true
                }
                return room
            })
            return state
        },
        closeTools: (state, action) => {
            state.map((room) => {
                if (room.id === action.payload) {
                    room.tools = false
                }
                return room
            })
            return state
        },
    },
})

export const {
    setRooms,
    addRoom,
    deleteRoom,
    deleteRooms,
    addMessage,
    fillMessage,
    setMessages,
    setWaiting,
    setRecieveWaiting,
    setCanSend,
    setStream,
    setStop,
    restart,
    deleteMessages,
    setNameAndSystem,
    setFullMessage,
    setCurrentMid,
    setTyping,
    openTools,
    closeTools,
} = roomsSlice.actions

export default roomsSlice.reducer
