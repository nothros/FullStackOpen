
const notificationReducer = (state = null, action) => {

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (notification, displayTime) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        notification: null
      })
    }, displayTime * 1000)
  }
}

export default notificationReducer