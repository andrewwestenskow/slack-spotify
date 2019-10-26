import React from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const HandleCallback = props => {
  const urlQuery = new URLSearchParams(useLocation().search)
  const code = urlQuery.get('code')
  axios
    .post(`/callback?code=${code}`)
    .then(response => {
      console.log(response.data)
      localStorage.setItem('access_token', response.data.access_token)
      props.history.push('auth/dashboard')
    })
    .catch(error => {
      console.log(error)
      props.history.push('/')
    })
  return <div>Logging you in</div>
}
export default HandleCallback
