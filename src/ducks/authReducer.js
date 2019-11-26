const axios = require('axios')

const initialState = {
  access_token: '',
  refresh_token: '',
}

const SET_AUTH = 'SET_AUTH'
const REFRESH_AUTH = 'REFRESH_AUTH'
export const setAuth = response => {
  localStorage.setItem('access_token', response.access_token)
  localStorage.setItem('refresh_token', response.refresh_token)
  return {
    type: SET_AUTH,
    payload: {
      access_token: response.access_token,
      refresh_token: response.refresh_token,
    },
  }
}

export const refreshAuth = () => {
  console.log('refreshing')
  const access_token = localStorage.getItem('access_token')
  const refresh_token = localStorage.getItem('refresh_token')
  const refreshAuth = axios.post('/refresh', {
    access_token,
    refresh_token,
  })

  return {
    type: REFRESH_AUTH,
    payload: refreshAuth,
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
    case `${REFRESH_AUTH}_PENDING`:
      return {
        ...state,
      }
    case `${REFRESH_AUTH}_FULFILLED`:
      const { refreshSpotifyAuth: auth } = action.payload.data
      localStorage.setItem('access_token', auth.access_token)
      if (auth.refresh_token) {
        localStorage.setItem('refresh_token', auth.refresh_token)
        return {
          ...state,
          access_token: auth.access_token,
          refresh_token: auth.refresh_token,
        }
      } else {
        return {
          ...state,
          access_token: auth.access_token,
        }
      }
    case `${REFRESH_AUTH}_REJECTED`:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default authReducer
