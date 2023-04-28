import { io } from 'socket.io-client'

const socket = io(
    process.env.NODE_ENV === 'production'
        ? 'https://simplechatgpt-api.onrender.com'
        : 'http://localhost:10000',
    {
        reconnection: true,
        reconnectionDelay: 500,
    }
)

export default socket
