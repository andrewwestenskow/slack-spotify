import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'

const RecentResult = props => {
  const { info } = props
  console.log(info)
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
        <p className="result-details-text">{info.track.album.name}</p>
        <p className="result-details-text">{info.track.artists[0].name}</p>
      </div>
    </div>
  )
}
export default RecentResult
