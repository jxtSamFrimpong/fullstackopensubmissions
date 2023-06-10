import React from 'react'
import ReactDOM from 'react-dom/client'

//ACTUAL REDUCER
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
//COMPONENTS
import App from './App'

//REDUCERS
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'

//REDUX TOOLKIT
import { configureStore } from '@reduxjs/toolkit'

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// })
// const store = createStore(reducer)
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'the app state is in redux store',
//     important: true,
//     id: 1
//   }
// })

// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'state changes are made with actions',
//     important: false,
//     id: 2
//   }
// })

store.subscribe(() => console.log(store.getState()))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

// store.dispatch(filterChange('ALL'))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <div />
//   </Provider>
// )
