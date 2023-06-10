import { createSlice } from '@reduxjs/toolkit'

// const filterReducer = (state = '', action) => {
//     switch (action.type) {
//         case 'SET_FILTER':
//             return action.payload
//         default:
//             return state
//     }
// }

export const filterChange = filter => {
    return {
        type: 'filter/set',
        payload: filter,
    }
}

const filterReducer = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        set(state, action){
            return action.payload
        }
    }
})

// export default filterReducer
export const { set } = filterReducer.actions
export default filterReducer.reducer