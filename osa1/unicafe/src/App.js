import React, { useState, useEffect } from 'react'

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
  const t = [{v: 1}, {v: 2}, {v: 3}]

 
 
 let h= t.map(o => o.v).sum
   /*   let c= t.map(o => {o.v}).reduce((s, o) => s + o, 0) 
      let e= t.map(o => o.v).reduce((s, o) => {s + o}, 0)
         let f= t.reduce((s, o) => { s + o.v }, 0)
           let g= t.map(o => o.v).reduce((s, o) => s + o.v, 0)  

 */

 
  console.log(h)

  const [x, setX] = useState(1)
  return (
    <button onClick={null}>
      press
    </button>
  )
}
export default App