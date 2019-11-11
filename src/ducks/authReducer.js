const axios = require('axios')

const initialState = {
  access_token: '',
  refresh_token: '',
}

const SET_AUTH = 'SET_AUTH'
const REFRESH_AUTH = 'REFRESH_AUTH'
export const setAuth = response => {
  localStorage.setItem('access_token', response.data.access_token)
  localStorage.setItem('refresh_token', response.data.refresh_token)
  return {
    type: SET_AUTH,
    payload: {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
    },
  }
}

export const refreshAuth = async () => {
  console.log('refreshing')
  const access_token = localStorage.getItem('access_token')
  const refresh_token = localStorage.getItem('refresh_token')
  const refreshAuth = await axios.post('/refresh', {
    access_token,
    refresh_token,
  })
  localStorage.setItem('access_token', refreshAuth.data.access_token)
  if (refreshAuth.data.refresh_token) {
    localStorage.setItem('refresh_token', refreshAuth.data.refresh_token)
  }
  return {
    type: REFRESH_AUTH,
    payload: {
      access_token: refreshAuth.data.access_token,
      refresh_token: refreshAuth.data.access_token || refresh_token,
    },
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
