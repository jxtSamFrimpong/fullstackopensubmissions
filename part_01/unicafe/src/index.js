import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore } from 'redux'
import feedReducer from './reducers/feedReducer';

const store = createStore(feedReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(
    <App store={store} />
  );
}

renderApp()
store.subscribe(
  renderApp
);