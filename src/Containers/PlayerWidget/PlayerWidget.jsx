import React from 'react'
import Player from '../../Components/Player/Player'

const PlayerWidget = props => {
  return (
    <div style={{ position: 'fixed', bottom: 0 }}>
      {props.children}
      <Player />
    </div>
  )
}
export default PlayerWidget
