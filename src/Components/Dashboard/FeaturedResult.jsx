import React from 'react'
import spotify from '../../assets/spotify.png'
import PlayWidget from '../PlayWidget/PlayWidget'
import { Link } from 'react-router-dom'

const FeaturedResult = (props) => {
  const { info } = props
  return (
    <div className="result-hold">
      <div
        style={{
          backgroundImage: info.images[0]
            ? `url(${info.images[0].url})`
            : spotify,
        }}
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
        <Link
          to={`/user/spotify/playlist/${info.id}`}
          className="result-details-text"
        >
          {info.name}
        </Link>
      </div>
    </div>
  )
}
export default FeaturedResult
