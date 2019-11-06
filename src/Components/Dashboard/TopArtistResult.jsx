import React from 'react'
import { playArtist } from '../../functions/playback'

const TopArtistResult = props => {
  const { info } = props
  return (
    <div
      onClick={() => playArtist(props.access_token, props.deviceId, info.uri)}
      style={{ backgroundImage: `url(${info.images[0].url})` }}
      className="result"
    ></div>
  )
}
export default TopArtistResult
