import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import configs from './utils/config.js'

import store from './reducers/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={configs.VITE_AUTH0_DOMAIN}
      clientId={configs.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: configs.VITE_AUTH0_REDIRECT_URI
      }}
    >
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
)
