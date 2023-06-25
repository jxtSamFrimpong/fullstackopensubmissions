import { createSlice } from '@reduxjs/toolkit'

const notifClassReducer = createSlice({
    name: 'notifClass',
    initialState: '',
    reducers: {
        setNotifClass(state, action){
            return action.payload
        },
        removeNotifClass(state, action){
            return ''
        },
    }
})


export const {setNotifClass, removeNotifClass} = notifClassReducer.actions
export default notifClassReducer.reducer