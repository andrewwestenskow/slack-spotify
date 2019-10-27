import React from 'react'
import axios from 'axios'

const Login = props => {
  const login = async () => {
    const response = await axios.get('/login')
    window.location.href = response.data
  }

  return (
    <div>
      <button onClick={login}>LOG IN HERE</button>
    </div>
  )
}

export default Login
