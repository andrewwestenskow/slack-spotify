import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'

const TopArtistResult = props => {
  const { info } = props
  return (
    <div className="result-hold">
      <div
        style={{ backgroundImage: `url(${info.images[0].url})` }}
        className="result top-artist-result"
      >
        <PlayWidget
          access_token={props.access_token}
          deviceId={props.deviceId}
          type="artist"
          uri={info.uri}
        />
      </div>
      <div className="result-details">
        <p className="result-details-text">{info.name}</p>
      </div>
    </div>
  )
}
export default TopArtistResult
