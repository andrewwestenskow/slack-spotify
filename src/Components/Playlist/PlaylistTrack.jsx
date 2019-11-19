import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'
import { trackTime } from '../../functions/conversion'

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
          <p className="playlist-track-artist">{info.artists[0].name} </p>
          <p className="playlist-track-album">{info.album.name}</p>
        </div>
      </div>
      <div className="playlist-track-track-time">
        {trackTime(info.duration_ms)}
      </div>
    </div>
  )
}
export default PlaylistTrack
