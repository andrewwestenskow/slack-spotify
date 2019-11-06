import React from 'react'
import { playAlbum } from '../../functions/playback'

const RecentResult = props => {
  const { info } = props
  console.log(info)
  return (
    <div className="result-hold">
      <div
        onClick={() =>
          playAlbum(props.access_token, props.deviceId, info.track.album.uri, 0)
        }
        style={{ backgroundImage: `url(${info.track.album.images[0].url}` }}
        className="result"
      ></div>
      <div className="result-details">
        <p className="result-details-text">{info.track.album.name}</p>
        <p className="result-details-text">{info.track.artists[0].name}</p>
      </div>
    </div>
  )
}
export default RecentResult
