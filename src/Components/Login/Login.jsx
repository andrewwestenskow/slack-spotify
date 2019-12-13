import React from 'react'
import axios from 'axios'
import AvailableApp from './AvailableApp'
import spotify_login from '../../assets/spotify_login.png'
import slack_login from '../../assets/slack_login.png'
import discord_login from '../../assets/discord_login.png'

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
      {/* <div className="login-available-apps">
        <AvailableApp name="Spotify" image={spotify_login} />
        <AvailableApp name="Slack" image={slack_login} />
        <AvailableApp name="Discord" image={discord_login} />
      </div> */}
    </div>
  )
}

export default Login
