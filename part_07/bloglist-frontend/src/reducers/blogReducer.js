import { createSlice } from '@reduxjs/toolkit'

const blogs = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action){
            return action.payload
        },
        addBlog(state, action){
            return state.concat(action.payload)
        },
        upvoteBlog(state, action){
            return state.map(b => b.id !== action.payload.id ? b : action.payload)
        },
        removeBlog(state, action){
            return state.filter(blog => blog.id !== action.payload)
        },
        ascSort(state, action){
            return state.sort((a, b) => a.likes - b.likes)
        },
        dscSort(state, action){
            return state.sort((a, b) => b.likes - a.likes)
        }
    }
})


// export const notifThunk = (message, delay)=>{
//     return (dispatch)=>{
//         dispatch(setNotif(message))
//         setTimeout(()=>{
//             dispatch(removeNotif())
//         }, delay || 5000)
//     }
// }

export const { setBlogs, addBlog, upvoteBlog, removeBlog, ascSort, dscSort} = blogs.actions
export default blogs.reducer