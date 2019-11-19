import React, { useState, useEffect } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { trackTime } from '../../functions/conversion'
import {
  togglePlayback,
  nextTrack,
  previousTrack,
  seek,
  toggleShuffle,
} from '../../functions/playback'
import * as Icon from 'react-feather'

const PlayerControls = props => {
  const { playerState } = props
  const [position, setPosition] = useState(0)
  const [seekInterval, setSeekInterval] = useState(0)
  const [repeat, setRepeat] = useState(<></>)
  const [repeatMode, setRepeatMode] = useState(0)
  const [shuffle, setShuffle] = useState(false)

  const handleSeek = e => {
    seek(props.player, e)
  }

  const handlePrevious = () => {
    if (position < 5000) {
      previousTrack(props.player)
    } else {
      seek(props.player, 0)
    }
  }

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

  useEffect(() => {
    setShuffle(playerState.shuffle)
  }, [playerState.shuffle])

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

  return (
    <div className="Player-Controls">
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
        <Icon.Shuffle
          className={`${!shuffle ? 'control-button' : 'control-button-active'}`}
          onClick={() =>
            toggleShuffle(props.access_token, props.deviceId, !shuffle)
          }
        />
        <Icon.SkipBack className="control-button" onClick={handlePrevious} />
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
  )
}
export default PlayerControls
