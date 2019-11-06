import React from 'react'
import { playAlbum } from '../../functions/playback'

const RecentResult = props => {
  const { info } = props
  return (
    <div
      onClick={() =>
        playAlbum(props.access_token, props.deviceId, info.track.album.uri, 0)
      }
      style={{ backgroundImage: `url(${info.track.album.images[0].url}` }}
      className="result"
    ></div>
  )
}
export default RecentResult
