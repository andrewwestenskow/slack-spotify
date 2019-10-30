import React from 'react'
import Player from '../../Components/Player/Player'
import { connect } from 'react-redux'
import { setPlayer } from '../../ducks/spotifyReducer'
import { setNowPlaying } from '../../ducks/nowPlaingReducer'

const PlayerWidget = props => {
  const [player, setPlayer] = React.useState(undefined)
  const checkForPlayer = () => {
    const { access_token } = props

    if (window.Spotify !== null && !player) {
      const newPlayer = new window.Spotify.Player({
        name: 'Carve',
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
        document.title = `${state.track_window.current_track.artists[0].name} - ${state.track_window.current_track.name}`
        console.log(state)
        if (state.track_window) {
          props.setNowPlaying(state.track_window)
        } else {
          props.setNowPlaying({})
        }
      })
      // finally, connect!
      clearInterval(checkInterval)
      newPlayer.connect()
      newPlayer.on('ready', data => {
        console.log(data)
        setPlayer(newPlayer)
        props.setPlayer({ player: newPlayer, deviceId: data.device_id })
      })
    }
  }

  const checkInterval = setInterval(() => {
    checkForPlayer()
  }, 1000)

  return (
    <div style={{ position: 'fixed', bottom: 0 }}>
      {props.children}
      <Player player={player} />
    </div>
  )
}

const mapStateToProps = state => {
  return state.auth
}
export default connect(
  mapStateToProps,
  { setPlayer, setNowPlaying },
)(PlayerWidget)
