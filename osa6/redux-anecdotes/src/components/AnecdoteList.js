
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if ( filter === null ) {
          return anecdotes
        }
        return anecdotes.filter(p => p.content.toLowerCase().startsWith(filter));
      })

    const byVotes = (b1, b2) => b2.votes - b1.votes
    return(
        anecdotes.sort(byVotes).map(anecdote => <Anecdote anecdote={anecdote} />)
      )
}

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()


const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
}



    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
        )
}

export default AnecdoteList