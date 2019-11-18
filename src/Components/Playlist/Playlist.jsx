import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'
// import { Link } from 'react-router-dom'

const Playlist = props => {
  const { info } = props
  console.log(info)
  return (
    <div className="Playlist">
      <div className="playlist-info">
        <div
          className="playlist-info-image"
          style={{ backgroundImage: `url(${info.images[0].url})` }}
          alt=""
        >
          <PlayWidget inLibrary={info.inLibrary} showMore={true} />
        </div>
        <div className="playlist-info-text">
          <div className="playlist-info-top">
            <p className="playlist-info-title">{info.name}</p>
          </div>
          <div className="playlist-info-bottom">
            <p className="playlist-info-owner">By: {info.owner.display_name}</p>
            <p className="playlist-info-track-count">{`${
              info.tracks.items.length
            } track${info.tracks.items.length === 1 ? '' : 's'}`}</p>
            <p className="playlist-info-length">{info.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Playlist
