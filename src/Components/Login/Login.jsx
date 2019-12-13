import React from 'react'
import axios from 'axios'

const Login = props => {
  const login = async () => {
    const response = await axios.get('/login')
    console.log(response.data)
    window.location.href = response.data
  }

  return (
    <div className="Login">
      <div className="login-info-hold">
        <h1>
          Spotify...
          <br />
          simplified
        </h1>
      </div>
      <button className="login-button" onClick={login}>
        Log in with Spotify
      </button>
      <h2 className="login-currently-supported">
        A Spotify app broken down to basics.
      </h2>
    </div>
  )
}

export default Login
