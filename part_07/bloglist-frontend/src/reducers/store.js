import { configureStore } from '@reduxjs/toolkit'
//import anecdoteReducer from './anecdoteReducer'
//import filterReducer from './filterReducer'
import notifReducer from './notifReducer'
import notifClass from './notifClass'
import userReducer from './userReducer'
import blogReducer from './blogReducer'


const store = configureStore({
  reducer: {
    notification: notifReducer,
    notifClass: notifClass,
    user: userReducer,
    blogs: blogReducer
  }
}) 

export default store