import React from 'react'
import ReactDOM from 'react-dom/client'
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'
import store from './store'
import anecdoteService from './services/anecdotes'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
