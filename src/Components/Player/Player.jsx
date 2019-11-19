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
import { trackTime } from '../../functions/conversion'

const Player = props => {
  const { playerState } = props
  const [gradient, setGradient] = useState('#000000')
  const [position, setPosition] = useState(0)
  const [seekInterval, setSeekInterval] = useState(0)
  const [repeat, setRepeat] = useState(<></>)
  const [repeatMode, setRepeatMode] = useState(0)
  const [shuffle, setShuffle] = useState(false)

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
    switch (repeatMode) {
      case 0:
        setRepeat(<Icon.Repeat className="control-button" />)
        break
      case 1:
        setRepeat(<Icon.Repeat className="control-button" />)
        break
      case 2:
        setRepeat(<Icon.Repeat className="control-button" />)
        break
      default:
        setRepeat(<Icon.Repeat className="control-button" />)
        break
    }
  }, [repeatMode])

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

  console.log(playerState)

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
        <div className="track-info-hold"></div>
      )}
      <div className="player-controls-hold">
        <div className="player-controls-slider-hold">
          <p className="player-controls-slider-time">{trackTime(position)}</p>
          <Slider
            value={position}
            min={0}
            max={playerState.duration}
            className="seek-bar-hold"
            onAfterChange={e => handleSeek(e)}
            onChange={e => setPosition(e)}
            trackStyle={{ backgroundColor: '#18d860' }}
            handleStyle={{ backgroundColor: '#18d860', border: 'none' }}
          />
          <p className="player-controls-slider-time">
            {playerState.duration ? trackTime(playerState.duration) : '0:00'}
          </p>
        </div>
        <div className="control-button-hold">
          <Icon.Shuffle className="control-button" />
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
          {repeat}
        </div>
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
