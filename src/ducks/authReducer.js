const initialState = {
  access_token: '',
  refresh_token: '',
}

const SET_AUTH = 'HANDLE_AUTH'
const REFRESH_AUTH = 'REFRESH_AUTH'
export const setAuth = response => {
  localStorage.setItem('access_token', response.data.access_token)
  localStorage.setItem('refresh_token', response.data.refresh_token)
  return {
    type: SET_AUTH,
    payload: '',
  }
}

export const refreshAuth = () => {
  return {
    type: REFRESH_AUTH,
    payload: '',
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
      }
    case REFRESH_AUTH:
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
      }
    default:
      return state
  }
}

export default authReducer
