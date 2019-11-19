import React, { useState, useEffect, useCallback } from 'react'
import Slider from 'rc-slider'
import * as Icon from 'react-feather'
import { handleVolume } from '../../functions/playback'

const VolumeWidget = props => {
  const [volume, setVolume] = useState(100)
  const [icon, setIcon] = useState(<></>)

  const memoHandleVolume = useCallback(handleVolume, [volume, props.player])

  useEffect(() => {
    if (volume === 0) {
      setIcon(<Icon.VolumeX onClick={() => setVolume(100)} />)
    } else if (volume > 0 && volume < 33) {
      setIcon(<Icon.Volume onClick={() => setVolume(0)} />)
    } else if (volume >= 33 && volume <= 66) {
      setIcon(<Icon.Volume1 onClick={() => setVolume(0)} />)
    } else {
      setIcon(<Icon.Volume2 onClick={() => setVolume(0)} />)
    }

    if (props.player) {
      memoHandleVolume(props.player, volume)
    }
  }, [props.player, volume, memoHandleVolume])
  return (
    <div className="Volume-Widget">
      {icon}
      <Slider
        min={0}
        max={100}
        trackStyle={{ backgroundColor: '#18d860' }}
        handleStyle={{ backgroundColor: '#18d860', border: 'none' }}
        className="volume-slider"
        value={volume}
        onChange={e => setVolume(e)}
        onAfterChange={e => setVolume(e)}
      />
    </div>
  )
}
export default VolumeWidget
