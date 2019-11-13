import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'
import { Link } from 'react-router-dom'

const RecentResult = props => {
  const { info } = props
  return (
    <div className="result-hold">
      <div
        style={{ backgroundImage: `url(${info.track.album.images[0].url}` }}
        className="result"
      >
        <PlayWidget
          toggleChange={props.toggleChange}
          id={info.track.album.id}
          inLibrary={info.inLibrary}
          access_token={props.access_token}
          deviceId={props.deviceId}
          type="album"
          uri={info.track.album.uri}
          offset={0}
          showMore={true}
        />
      </div>
      <div className="result-details">
        <Link
          to={`/user/spotify/album/${info.track.album.id}`}
          className="result-details-text"
        >
          {info.track.album.name}
        </Link>
        <Link
          to={`/user/spotify/artist/${info.track.artists[0].id}`}
          className="result-details-text"
        >
          {info.track.artists[0].name}
        </Link>
      </div>
    </div>
  )
}
export default RecentResult
