const initialState = {}

const SET_USER = 'SET_USER'

export const setUser = payload => {
  return {
    type: SET_USER,
    payload: payload,
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    default:
      return state
  }
}

export default userReducer
