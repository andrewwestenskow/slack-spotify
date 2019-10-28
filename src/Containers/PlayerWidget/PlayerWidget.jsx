import React from 'react'
import Player from '../../Components/Player/Player'
import { connect } from 'react-redux'

const PlayerWidget = props => {
  const [player, setPlayer] = React.useState(undefined)
  const checkForPlayer = () => {
    const { access_token } = props

    if (window.Spotify !== null && !player) {
      const newPlayer = new window.Spotify.Player({
        name: 'Andrews fun biznach',
        getOAuthToken: cb => {
          cb(access_token)
        },
      })
      // this.createEventHandlers();
      newPlayer.on('initialization_error', e => {
        console.error(e)
      })
      newPlayer.on('authentication_error', e => {
        console.error(e)
      })
      newPlayer.on('account_error', e => {
        console.error(e)
      })
      newPlayer.on('playback_error', e => {
        console.error(e)
      })

      // Playback status updates
      newPlayer.on('player_state_changed', state => {
        console.log(state)
      })
      // finally, connect!
      clearInterval(checkInterval)
      newPlayer.connect()
      newPlayer.on('ready', data => {
        console.log(data)
        setPlayer(newPlayer)
      })
    }
  }

  const checkInterval = setInterval(() => {
    checkForPlayer()
  }, 1000)

  return (
    <div style={{ position: 'fixed', bottom: 0 }}>
      {props.children}
      <Player />
    </div>
  )
}

const mapStateToProps = state => {
  return state.auth
}
export default connect(mapStateToProps)(PlayerWidget)
