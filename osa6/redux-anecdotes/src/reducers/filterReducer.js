const initialState = { text: null }

const filterReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_FILTER':
      return { text: action.text }
    default:
      return state
  }
}

export const filterChange = text => {
  return {
    type: 'SET_FILTER',
    text: text
  }
}



export default filterReducer