const initialState = {
  socket: {},
  connectionConfirmed: false,
}

const SET_SOCKET = 'SET_SOCKET'
const SET_CONNECTION_CONFIRMED = 'SET_CONNECTION_CONFIRMED'

export const setSocket = socket => {
  return {
    type: SET_SOCKET,
    payload: socket,
  }
}

export const setConnectionConfirmed = status => {
  return {
    type: SET_CONNECTION_CONFIRMED,
    payload: status,
  }
}

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      }
    case SET_CONNECTION_CONFIRMED:
      return {
        ...state,
        connectionConfirmed: action.payload,
      }

    default:
      return state
  }
}

export default socketReducer
