import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
    // if (action.type === 'NEW_NOTE') {
    //     return state.concat(action.payload)
    // }
    // if (action.type === 'ALL_FETCH') {
    //     state = action.payload
    //     return state
    // }

    // return state

    switch (action.type) {
        case 'NEW_NOTE':
            return state.concat(action.payload)
        case 'ALL_FETCH':
            //state = action.payload
            return action.payload
        case 'TOGGLE_IMPORTANCE':
            const id = action.payload.id
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        default:
            return state
    }
}

// const store = createStore(noteReducer)

export default noteReducer