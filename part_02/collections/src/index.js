import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App'

// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'and POST are the most important methods of HTTP protocol',
//     important: true
//   }
// ]

// axios.get('http://localhost:3001/notes')
//   .then((response) => {
//     console.log('response data onSuccess', response.data)
//     const root = ReactDOM.createRoot(document.getElementById('root'));
//     root.render(
//       <React.StrictMode>
//         <App notes={response.data} />
//       </React.StrictMode>
//     );
//   })
//   .catch((reason) => {
//     console.log('reason for onFailure', reason)
//     const root = ReactDOM.createRoot(document.getElementById('root'));
//     root.render(
//       <React.StrictMode>
//         <App notes={notes} />
//       </React.StrictMode>
//     );
//   })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// console.log('notes inside index after rendering', notes);