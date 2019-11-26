import React, { useState, useEffect, useCallback } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { trackTime } from '../../functions/conversion'
import {
  togglePlayback,
  nextTrack,
  previousTrack,
  seek,
  toggleShuffle,
  toggleRepeat,
} from '../../functions/playback'
import * as Icon from 'react-feather'
import RepeatOneSharp from '@material-ui/icons/RepeatOneSharp'
import RepeatSharp from '@material-ui/icons/RepeatSharp'
import WakeLock from 'react-wakelock-react16'

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

  const handleRepeat = () => {
    switch (repeatMode) {
      case 0:
        toggleRepeat(props.access_token, props.deviceId, 1)
        break
      case 1:
        toggleRepeat(props.access_token, props.deviceId, 2)
        break
      case 2:
        toggleRepeat(props.access_token, props.deviceId, 0)
        break
      default:
        toggleRepeat(props.access_token, props.deviceId, 0)
        break
    }
  }

  const memoHandleRepeat = useCallback(handleRepeat, [
    props.access_token,
    props.deviceId,
    repeatMode,
  ])

  useEffect(() => {
    if (playerState.paused === false && !seekInterval && playerState.duration) {
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
    // 0 = off
    // 1 = context
    // 2 = track
    switch (playerState.repeat_mode) {
      case 0:
        setRepeat(
          <RepeatSharp onClick={memoHandleRepeat} className="control-button" />
        )
        setRepeatMode(0)
        break
      case 1:
        setRepeat(
          <RepeatSharp
            onClick={memoHandleRepeat}
            className="control-button-active"
          />
        )
        setRepeatMode(1)
        break
      case 2:
        setRepeat(
          <RepeatOneSharp
            onClick={memoHandleRepeat}
            className="control-button-active"
          />
        )
        setRepeatMode(2)
        break
      default:
        setRepeat(
          <RepeatSharp onClick={memoHandleRepeat} className="control-button" />
        )
        setRepeatMode(0)
        break
    }
  }, [playerState.repeat_mode, repeatMode, memoHandleRepeat])

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
          <>
            <Icon.Pause
              className="control-button"
              onClick={() => togglePlayback(props.player)}
            />
            <WakeLock />
          </>
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
