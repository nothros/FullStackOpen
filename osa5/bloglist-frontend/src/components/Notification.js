import React from 'react'

const Notification = ({ message, type }) => {

  if (message === null) {
    return (<div></div>)
  }
  return (
    <div className={type} id='notify'>
      {message}
    </div>
  )
}

export default Notification