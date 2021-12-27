import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <>
      <tr>
        <td> {text} </td>
        <td> {value} </td>
      </tr>
    </>
  )

}
const Statistics = ({good,neutral,bad,all}) => {
  if (all == 0){
    return(
      <p>
        No feedback given
      </p>
    )
  }
  const average = (good-bad)/all
  const positive = (good/all)*100
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value = {good} />
        <StatisticLine text="neutral" value ={neutral}/>
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={positive +'%'} />
      </tbody>
    </table>

  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good+neutral+bad

  const voteGood = () => {
    setGood(good+1)
  }
  const voteNeutral = () => {
    setNeutral(neutral+1)
  }
  const voteBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1> give feeback </h1>
      <Button
        handleClick={voteGood}
        text='good'
      />
       <Button
        handleClick={voteNeutral}
        text='neutral'
      />
       <Button
        handleClick={voteBad}
        text='bad'
      />
       <h1> statistics </h1>
       <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App