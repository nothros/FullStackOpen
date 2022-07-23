import React from "react"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
                event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        props.createAnecdote(content)
        props.setNotification(`Anecdote '${content}' added`, 5)
      }


    return(

        <><h2>create new</h2><form onSubmit={addAnecdote}>
            <div><input name="anec" /></div>
            <button>create</button>
        </form></>
    )
}

export default connect(
    null, { createAnecdote, setNotification }
  )(AnecdoteForm)     