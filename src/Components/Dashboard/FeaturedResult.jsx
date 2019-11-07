import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'

const FeaturedResult = props => {
  const { info } = props
  return (
    <div className="result-hold">
      <div
        style={{ backgroundImage: `url(${info.images[0].url})` }}
        className="result"
      >
        <PlayWidget
          access_token={props.access_token}
          deviceId={props.deviceId}
          uri={info.uri}
          type="playlist"
          offset={0}
        />
      </div>
      <div className="result-details">
        <p className="result-details-text">{info.name}</p>
      </div>
    </div>
  )
}
export default FeaturedResult
