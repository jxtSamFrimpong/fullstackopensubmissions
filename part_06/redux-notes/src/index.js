import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
//COMPONENTS
import App from './App'


//REDUX TOOLKIT
import store from './reducers/store'

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
