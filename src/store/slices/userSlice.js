import { createSlice } from '@reduxjs/toolkit'
import randomstring from 'randomstring'
import { updateDataById } from '../../helpers/dbFetch'

const random = randomstring.generate(10)

const initialState = {
    uid: random,
    email: '',
    name: 'user' + random,
    ava: null,
    dark: false,
    status: 0,
    currentRoom: '',
    menu: false,
    statusText: 'Временный пользователь',
    logged: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            let statusText = ''
            switch (action.payload.status) {
                case 1:
                    statusText = 'Обычный пользователь'
                    break
                case 2:
                    statusText = 'Премиум пользователь'
                    break
                case 3:
                    statusText = 'Администратор'
                    break
                default:
                    statusText = 'Временный пользователь'
            }
            state = {
                uid: action.payload.uid,
                email: action.payload.email,
                name: action.payload.name,
                ava: action.payload.ava,
                dark: action.payload.dark,
                status: action.payload.status,
                statusText,
                logged: true,
                menu: false,
            }
            return state
        },
        deleteUser: (state) => {
            state = initialState
            return state
        },
        openMenu: (state) => {
            state.menu = true
            return state
        },
        closeMenu: (state) => {
            state.menu = false
            return state
        },
        setCurrentRoom: (state, action) => {
            state.currentRoom = action.payload
        },
        setDark: (state, action) => {
            state.dark = action.payload
            if (state.logged) {
                updateDataById('users', state.uid, { dark: state.dark })
            }
        },
    },
})

export const {
    setUser,
    deleteUser,
    setCurrentRoom,
    setDark,
    openMenu,
    closeMenu,
} = userSlice.actions

export default userSlice.reducer
