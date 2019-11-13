import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'
import { trackTime } from '../../functions/conversion'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const TopTrack = props => {
  const { info } = props
  return (
    <div className="Top-Track">
      <div
        className="top-track-album"
        style={{ backgroundImage: `url(${info.album.images[0].url})` }}
      >
        <PlayWidget
          access_token={props.access_token}
          deviceId={props.deviceId}
          uri={props.top}
          offset={info.uri}
          type="tracks"
        />
      </div>
      <Link
        to={`/user/spotify/album/${info.album.id}`}
        className="top-track-title"
      >
        {info.name}
      </Link>
      <p className="top-track-length">{trackTime(info.duration_ms)}</p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    access_token: state.auth.access_token,
    deviceId: state.spotify.deviceId,
  }
}
export default connect(mapStateToProps)(TopTrack)
