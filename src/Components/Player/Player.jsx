import React, { useEffect, useState } from 'react'
import {
  togglePlayback,
  nextTrack,
  previousTrack,
  seek,
} from '../../functions/playback'
import { connect } from 'react-redux'
import analyze from 'rgbaster'
import spotify from '../../assets/spotify.png'
import * as Icon from 'react-feather'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const Player = props => {
  const { playerState } = props
  const [gradient, setGradient] = useState('#000000')
  const [position, setPosition] = useState(0)
  const [seekInterval, setSeekInterval] = useState(0)

  const style = {
    background: `rgb(0,0,0)`,
    backgroundImage: `linear-gradient(312deg, rgba(0,0,0,1) 80%, ${gradient} 99%)`,
  }

  const handleSeek = e => {
    seek(props.player, e)
  }

  useEffect(() => {
    if (props.current.album) {
      analyze(props.current.album.images[0].url, { scale: 0.5 }).then(
        result => {
          setGradient(result[0].color)
        }
      )
    }
  }, [gradient, props])

  useEffect(() => {
    if (playerState.paused === false && !seekInterval && playerState.duration) {
      console.log('NEW INTERVAL')
      const newInterval = setInterval(() => {
        props.player.getCurrentState().then(newState => {
          if (newState) {
            setPosition(newState.position)
          }
        })
      }, 1000)
      setSeekInterval(newInterval)
    } else if (playerState.paused) {
      clearInterval(seekInterval)
      setSeekInterval(0)
    }
  }, [playerState, seekInterval, props.player])

  return (
    <div className="Player" style={{ ...style }}>
      {playerState.duration && (
        <Slider
          value={position}
          min={0}
          max={playerState.duration}
          className="seek-bar-hold"
          onAfterChange={e => handleSeek(e)}
          onChange={e => setPosition(e)}
        />
      )}
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
        <div className="track-info-hold"></div>
      )}
      <div className="control-button-hold">
        <Icon.SkipBack
          className="control-button"
          onClick={() => previousTrack(props.player)}
        />
        {props.playerState.paused || !props.current.name ? (
          <Icon.Play
            className="control-button"
            onClick={() => togglePlayback(props.player)}
          />
        ) : (
          <Icon.Pause
            className="control-button"
            onClick={() => togglePlayback(props.player)}
          />
        )}
        <Icon.SkipForward
          className="control-button"
          onClick={() => nextTrack(props.player)}
        />
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
