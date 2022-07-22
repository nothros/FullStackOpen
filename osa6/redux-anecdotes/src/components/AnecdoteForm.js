import React from "react"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'
 import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
                event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`Anecdote '${content}' successfully added`, 5))
      }


    return(

        <><h2>create new</h2><form onSubmit={addAnecdote}>
            <div><input name="anec" /></div>
            <button>create</button>
        </form></>
    )
}

export default AnecdoteForm
     