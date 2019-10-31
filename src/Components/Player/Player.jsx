import React, { useEffect, useState } from 'react'
import { togglePlay, nextTrack, previousTrack } from '../../functions/playback'
import { connect } from 'react-redux'
import analyze from 'rgbaster'
import spotify from '../../assets/spotify.png'
import * as Icon from 'react-feather'

const Player = props => {
  const [gradient, setGradient] = useState('#000000')

  const style = {
    background: `rgb(0,0,0)`,
    backgroundImage: `linear-gradient(312deg, rgba(0,0,0,1) 80%, ${gradient} 99%)`,
  }

  useEffect(() => {
    if (props.current.album) {
      analyze(props.current.album.images[0].url, { scale: 0.5 }).then(
        result => {
          setGradient(result[0].color)
        },
      )
    }
  }, [gradient, props])
  return (
    <div className="Player" style={{ ...style }}>
      {props.current.album ? (
        <img
          src={props.current.album.images[0].url}
          alt=""
          className="album-art"
        />
      ) : (
        <img src={spotify} alt="" className="album-art" />
      )}
      {props.current.name ? (
        <div className="track-info-hold">
          <p className="player-title">{props.current.name}</p>
          <p className="player-artist">{props.current.artists[0].name}</p>
        </div>
      ) : (
        <div className="track-info-hold">
          <p>Play something already</p>
        </div>
      )}
      <div className="control-button-hold">
        <Icon.SkipBack onClick={() => previousTrack(props.player)} />
        {!props.playerState.paused ? (
          <Icon.Play onClick={() => togglePlay(props.player)} />
        ) : (
          <Icon.Pause onClick={() => togglePlay(props.player)} />
        )}
        <Icon.SkipForward onClick={() => nextTrack(props.player)} />
      </div>
      <div className="volume-options-hold">
        <p>YUH</p>
      </div>
      <div className="device-info-hold">
        <p>YUH</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return state.nowPlaying
}

export default connect(mapStateToProps)(Player)
