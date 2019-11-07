import React from 'react'
import { playArtist } from '../../functions/playback'

const TopArtistResult = props => {
  const { info } = props
  return (
    <div className="result-hold">
      <div
        onClick={() => playArtist(props.access_token, props.deviceId, info.uri)}
        style={{ backgroundImage: `url(${info.images[0].url})` }}
        className="result top-artist-result"
      ></div>
      <div className="result-details">
        <p className="result-details-text">{info.name}</p>
      </div>
    </div>
  )
}
export default TopArtistResult
