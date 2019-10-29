import React from 'react'
import { togglePlay, nextTrack, previousTrack } from '../../functions/playback'

const Player = props => {
  return (
    <div className="Player">
      <div className="control-button-hold">
        <button onClick={() => previousTrack(props.player)}>Previous</button>
        <button onClick={() => togglePlay(props.player)}>Play</button>
        <button onClick={() => nextTrack(props.player)}>Next</button>
      </div>
    </div>
  )
}
export default Player
