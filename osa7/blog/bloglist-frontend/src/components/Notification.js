import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
const Notification = () => {
  const message = useSelector((state) => state.notification)
  console.log(message)

  if (message === null) {
    return null
  }

  

  return (
    <Alert variant="outlined" severity="success">
  {message}
</Alert>
  )
}

export default Notification
