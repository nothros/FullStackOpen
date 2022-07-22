import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

/* const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
        state.push({
          content: content,
          id: getId(),
          votes: 0
      })
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const updatedAnecdote = state.find(n => n.id === id)
      const changedAnecdote = {
        ...updatedAnecdote,
        votes: updatedAnecdote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)   
    },
    
    appendAnecdote(state, action) {
      state.push(action.payload)    
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
}) */

const anecdoteReducer = (state = [], action) => {
    console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data

    case 'VOTE': 
      const id = action.data.anecdote.id
      const updatedAnecdote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...updatedAnecdote,
        votes: updatedAnecdote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
      
    case 'NEW_ANECTODE':
      state = state.concat(...action.data)
        .sort((a1, a2) => (a2.votes - a1.votes))
        return state
      
    default: return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log("TÄMÄ IUUSI" , newAnecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      data: { anecdote: newAnecdote }
    })
  }
} 

//export const { createAnecdote, voteAnecdote, setAnecdotes , appendAnecdote} = anecdoteSlice.actions
//export default anecdoteSlice.reducer
export default anecdoteReducer