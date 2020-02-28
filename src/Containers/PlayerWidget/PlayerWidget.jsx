import React from 'react'
import Player from '../../Components/Player/Player'
import { connect } from 'react-redux'
import { setPlayer } from '../../ducks/spotifyReducer'
import { setNowPlaying } from '../../ducks/nowPlaingReducer'
import { refreshAuth } from '../../ducks/authReducer'

const PlayerWidget = props => {
  const [player, setPlayer] = React.useState(undefined)
  const [playerState, setPlayerState] = React.useState({})
  const { access_token, socket, userId, refresh_token } = props

  const checkForPlayer = () => {
    if (window.Spotify !== null && !player && access_token) {
      const newPlayer = new window.Spotify.Player({
        name: 'Carve',
        getOAuthToken: cb => {
          cb(access_token)
        },
      })
      // finally, connect!
      clearInterval(checkInterval)
      newPlayer
        .connect()
        .then(success => {})
        .catch(err => {
          console.log(err)
        })

      newPlayer.on('ready', data => {
        console.log('player ready')
        setPlayer(newPlayer)
        props.setPlayer({ player: newPlayer, deviceId: data.device_id })
      })

      // this.createEventHandlers();
      newPlayer.on('initialization_error', e => {
        console.error(e)
        console.log('INITIALIZATION ERROR')
      })
      newPlayer.on('authentication_error', e => {
        console.error(e)
        console.log('AUTHENTICATION ERROR FIX THIS BUG')
        socket.emit('auth error', { userId, access_token, refresh_token })
      })
      newPlayer.on('account_error', e => {
        console.error(e)
        console.log('ACCOUNT ERROR')
      })
      newPlayer.on('playback_error', e => {
        console.error(e)
        console.log('PLAYBACK ERROR')
        socket.emit('auth error', { userId, access_token, refresh_token })
      })

      // Playback status updates
      newPlayer.on('player_state_changed', state => {
        if (state) {
          document.title = `${state.track_window.current_track.artists[0].name} - ${state.track_window.current_track.name}`
          let favicon = document.querySelector("link[rel*='icon']")
          favicon.href = state.track_window.current_track.album.images[0].url
          setPlayerState(state)
          if (state.track_window) {
            props.setNowPlaying(state.track_window)
          } else {
            props.setNowPlaying({})
          }
        }
      })
    }
  }

  const checkInterval = setInterval(() => {
    checkForPlayer()
  }, 1000)

  return (
    <div style={{ position: 'fixed', bottom: 0 }}>
      {props.children}
      <button onClick={() => socket.emit('test', userId)}>TEST SOCKET</button>
      <Player
        access_token={props.access_token}
        nowPlaying={props.nowPlaying}
        playerState={playerState}
        player={player}
        deviceId={props.deviceId}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    access_token: state.auth.access_token,
    refresh_token: state.auth.refresh_token,
    deviceId: state.spotify.deviceId,
    nowPlaying: state.nowPlaying,
    userId: state.user.id,
    socket: state.socket.socket,
  }
}
export default connect(mapStateToProps, {
  setPlayer,
  setNowPlaying,
  refreshAuth,
})(PlayerWidget)
