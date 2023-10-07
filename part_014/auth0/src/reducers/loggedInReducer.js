import { createSlice } from '@reduxjs/toolkit'

const loggedIn = createSlice({
    name: 'loggedIn',
    initialState: false,
    reducers: {
        // eslint-disable-next-line no-unused-vars
        setLoggedInTrue(state, action) {
            return true;
        },
        // eslint-disable-next-line no-unused-vars
        setLoggedInFalse(state, action) {
            return false
        },
        setLoggedIn(state, action) {
            return action.payload
        }
    }
})

export const { setLoggedInTrue, setLoggedInFalse, setLoggedIn } = loggedIn.actions;
export default loggedIn.reducer;