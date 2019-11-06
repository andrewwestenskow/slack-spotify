import React from 'react'
import { playPlaylist } from '../../functions/playback'

const FeaturedResult = props => {
  const { info } = props
  return (
    <div
      onClick={() =>
        playPlaylist(props.access_token, props.deviceId, info.uri, 0)
      }
      style={{ backgroundImage: `url(${info.images[0].url})` }}
      className="result"
    ></div>
  )
}
export default FeaturedResult
