import React from 'react'
import Player from '../../Components/Player/Player'

const PlayerWidget = props => {
  return (
    <div>
      {props.children}
      <Player />
    </div>
  )
}
export default PlayerWidget
