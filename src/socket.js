import { io } from 'socket.io-client'

const socket = io(
    process.env.NODE_ENV === 'production'
        ? 'https://karengpt-api.onrender.com'
        : 'http://192.168.0.106:10000',
    {
        reconnection: true,
        reconnectionDelay: 500,
    }
)

export default socket
