import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'
import { trackTime } from '../../functions/conversion'
import { Link } from 'react-router-dom'

const PlaylistTrack = props => {
  const { info } = props
  console.log(info)
  return (
    <div className="Playlist-Track">
      <div className="playlist-track-left-side">
        <div
          style={{ backgroundImage: `url(${info.album.images[0].url})` }}
          className="playlist-track-album-art"
        >
          <PlayWidget />
        </div>
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
export default PlaylistTrack
