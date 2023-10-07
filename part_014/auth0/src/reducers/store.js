import { configureStore } from '@reduxjs/toolkit'

import loggedInReducer from './loggedInReducer'
import userReducer from './userReducer'

const store = configureStore({
    reducer: {
        user: userReducer,
        loggedIn: loggedInReducer,
    }
})

export default store