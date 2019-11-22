import React from 'react'
import * as Icon from 'react-feather'
import { handlePlay } from '../../functions/playback'
import { addToLibrary, removeFromLibrary } from '../../functions/library'

const PlayWidget = props => {
  const handleChange = action => {
    if (action === 'add') {
      addToLibrary(props).then(() => {
        props.toggleChange()
      })
      return
    } else {
      removeFromLibrary(props).then(() => {
        props.toggleChange()
      })
      return
    }
  }
  return (
    <div style={{ ...props.style }} className="Play-Widget">
      {props.inLibrary !== undefined ? (
        !props.inLibrary ? (
          <Icon.PlusCircle
            onClick={() => handleChange('add')}
            size={30}
            className="play-circle"
          />
        ) : (
          <Icon.MinusCircle
            onClick={() => handleChange('remove')}
            size={30}
            className="play-circle"
          />
        )
      ) : null}
      <Icon.PlayCircle
        className="play-circle"
        onClick={() => handlePlay(props)}
        size={50}
      />
      {props.showMore ? (
        <Icon.MoreHorizontal size={30} className="play-circle" />
      ) : null}
    </div>
  )
}
export default PlayWidget
