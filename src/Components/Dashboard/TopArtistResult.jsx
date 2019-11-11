import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'
import { Link } from 'react-router-dom'

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
        <Link
          to={`/user/spotify/artist/${info.id}`}
          className="result-details-text"
        >
          {info.name}
        </Link>
      </div>
    </div>
  )
}
export default TopArtistResult
