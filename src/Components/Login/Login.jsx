import React from 'react'
import axios from 'axios'

const Login = props => {
  const login = async () => {
    const response = await axios.get('/login')
    window.location.href = response.data
  }

  const access_token = localStorage.getItem('access_token')
  if (access_token) {
    props.history.push('auth/dashboard')
    return <div></div>
  } else {
    return (
      <div>
        <button onClick={login}>LOG IN HERE</button>
      </div>
    )
  }
}
export default Login
