import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import analyze from 'rgbaster'
import spotify from '../../assets/spotify.png'
import PlayerControls from './PlayerControls'
import VolumeWidget from './VolumeWidget'

const Player = props => {
  const { playerState } = props
  const [gradient, setGradient] = useState('#000000')

  const style = {
    background: `rgb(0,0,0)`,
    backgroundImage: `linear-gradient(312deg, rgba(0,0,0,1) 80%, ${gradient} 99%)`,
  }

  useEffect(() => {
    if (props.current.album) {
      analyze(props.current.album.images[0].url, { scale: 0.5 }).then(
        result => {
          let currentIndex = 0
          while (
            +result[currentIndex].color.match(/\d+/g)[0] < 50 ||
            +result[currentIndex].color.match(/\d+/g)[1] < 50 ||
            +result[currentIndex].color.match(/\d+/g)[2] < 50
          ) {
            currentIndex++
          }
          setGradient(result[currentIndex].color)
        }
      )
    }
  }, [gradient, props])

  return (
    <div className="Player" style={{ ...style }}>
      {props.current.name ? (
        <div className="track-info-hold">
          {props.current.album ? (
            <img
              src={props.current.album.images[0].url}
              alt=""
              className="album-art"
            />
          ) : (
            <img src={spotify} alt="" className="album-art" />
          )}
          <div className="track-info-text-hold">
            <p className="player-title">{props.current.name}</p>
            <p className="player-artist">{props.current.artists[0].name}</p>
          </div>
        </div>
      ) : (
        <div className="track-info-hold"></div>
      )}
      <PlayerControls
        current={props.current}
        player={props.player}
        playerState={playerState}
        access_token={props.access_token}
        deviceId={props.deviceId}
      />
      <VolumeWidget player={props.player} playerState={playerState} />
      {/* <div className="device-info-hold">
        <p>YUH</p>
      </div> */}
    </div>
  )
}

const mapStateToProps = state => {
  return state.nowPlaying
}

export default connect(mapStateToProps)(Player)
