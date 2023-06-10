import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotif(state, action){
            return action.payload
        },
        removeNotif(state, action){
            return ''
        }
    }
})

export const {setNotif, removeNotif} = notificationReducer.actions
export default notificationReducer.reducer