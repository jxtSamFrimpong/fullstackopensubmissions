import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

//let courses = []
//console.log('promise', promise)
// promise.then(
//     (response) => {
//         console.log('promise response', response)
//     }
// )
// const promise2 = axios.get('http://localhost:3001/foobar').then(response => {
//     console.log('actual promise2 response', response)
// })
// //console.log('promise2', promise2)
// promise2.then((response) => {
//     console.log('response2', response)
// }).catch((reason) => {
//     console.log('reason for rejection', reason.response.status)
// })

ReactDOM.createRoot(document.getElementById('root')).render(<App />)