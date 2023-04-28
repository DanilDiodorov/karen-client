import { configureStore } from '@reduxjs/toolkit'
import roomsReducer from './slices/roomsSlice'
import userReducer from './slices/userSlice'

export default configureStore({
    reducer: {
        rooms: roomsReducer,
        user: userReducer,
    },
})
