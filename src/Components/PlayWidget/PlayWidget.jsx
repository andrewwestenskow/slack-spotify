import React from 'react'
import * as Icon from 'react-feather'
import { handlePlay } from '../../functions/playback'

const PlayWidget = props => {
  return (
    <div className="Play-Widget">
      <Icon.PlayCircle
        className="play-circle"
        onClick={() => handlePlay(props)}
        size={50}
      />
    </div>
  )
}
export default PlayWidget
