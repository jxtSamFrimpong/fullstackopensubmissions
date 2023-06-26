import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'

import {BrowserRouter as Router} from 'react-router-dom'

import store from './reducers/store'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <App />
            </Provider>
        </QueryClientProvider>
    </Router>
)