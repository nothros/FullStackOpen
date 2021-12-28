import React, { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Heading = ({text}) => {
  return(
  <h1>
    {text}
  </h1>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}


const HasVotes = ({votes, selected}) => {
  const amount = votes[selected]
  return(
    <p>
      has {amount} votes
    </p>

  )
}

const MostVotes = ({anecdotes, votes}) => {
  const max = Math.max.apply(Math, votes.map((i) => i));
  const maxIdx = votes.indexOf(max);
  if (max == 0){
    return(
      <p>
        No anecdotes have been voted on yet.
      </p>
    )
  }
  return (
    <>
    {anecdotes[maxIdx]}
    <HasVotes votes={votes} selected={maxIdx} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const anecdoteAmount = anecdotes.length
  const [votes, setVotes] = useState(new Array(anecdoteAmount).fill(0))
  const [selected, setSelected] = useState(0)
  const [maxAnecdote, setMax] = useState(0)

  const getNext = () => {
    setSelected(getRandomInt(anecdoteAmount))
  }

  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected]+=1
    setVotes(newVotes)
  }




  return (
    <div>
    <Heading text={"Anecdote of the day"} />
    {anecdotes[selected]}
    <HasVotes votes={votes} selected={selected} />
    <Button
        handleClick={vote}
        text='vote'
      />
      <Button
        handleClick={getNext}
        text='next anecdote'
      />
    <Heading text={"Anecdote with most votes"} />
    <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
