const notificationReducer = (state = null, action) => {
  console.log('state now: NOTIFICATION', state)
  console.log('actionNOTIFICATION', action)

  switch (action.type) {
    case 'SET NOTIFICATION':
      return action.notification
    case 'REMOVE NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET NOTIFICATION',
      notification: notification
    })

    setTimeout(() => {
      dispatch({
        type: 'REMOVE NOTIFICATION',
        notification: null
      })
    }, 5 * 1000)
  }
}

export default notificationReducer
