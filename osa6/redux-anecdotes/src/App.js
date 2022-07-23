import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import React, {useEffect} from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'

const App = (props) => {

  useEffect(() => {
    props.initializeAnecdotes()
  }, [props])


  return (
    <div>

      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      < AnecdoteList />
      <AnecdoteForm />

    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)