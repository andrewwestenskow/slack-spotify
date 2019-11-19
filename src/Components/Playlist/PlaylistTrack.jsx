import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'
import { trackTime } from '../../functions/conversion'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Lottie from 'react-lottie'
import nowPlayingData from '../../assets/lotties/lf30_editor_wx9nP7.json'

const PlaylistTrack = props => {
  const { info } = props
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: nowPlayingData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div className="Playlist-Track">
      <div className="playlist-track-left-side">
        {props.nowPlaying === info.name ? (
          <Lottie options={defaultOptions} height={50} width={50} />
        ) : (
          <div
            style={{ backgroundImage: `url(${info.album.images[0].url})` }}
            className="playlist-track-album-art"
          >
            <PlayWidget
              access_token={props.access_token}
              deviceId={props.deviceId}
              uri={props.context}
              type="playlist"
              offset={props.position}
            />
          </div>
        )}
        <div className="playlist-track-track-info">
          <p className="playlist-track-track-name">{info.name}</p>
          <Link
            to={`/user/spotify/artist/${info.artists[0].id}`}
            className="playlist-track-artist"
          >
            {info.artists[0].name}{' '}
          </Link>
          <Link
            to={`/user/spotify/album/${info.album.id}`}
            className="playlist-track-album"
          >
            {info.album.name}
          </Link>
        </div>
      </div>
      <div className="playlist-track-track-time">
        {trackTime(info.duration_ms)}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    nowPlaying: state.nowPlaying.current.name,
  }
}
export default connect(mapStateToProps)(PlaylistTrack)
