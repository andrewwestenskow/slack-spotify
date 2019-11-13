import React from 'react'
import { Link } from 'react-router-dom'
import PlayWidget from '../PlayWidget/PlayWidget'

const Album = props => {
  const { info } = props
  console.log(info)
  return (
    <div className="Album">
      <div className="album-info">
        <div
          className="album-info-image"
          style={{ backgroundImage: `url(${info.images[0].url})` }}
          alt=""
        >
          <PlayWidget inLibrary={info.inLibrary} showMore={true} />
        </div>
        <div className="album-info-text">
          <div className="album-info-top">
            <p className="album-info-title">{info.name}</p>
            <Link
              to={`/user/spotify/artist/${info.artists[0].id}`}
              className="album-info-artist"
            >
              {info.artists[0].name}
            </Link>
          </div>
          <div className="album-info-bottom">
            <p className="album-info-release">
              {info.release_date.slice(0, 4)}
            </p>
            <p className="album-info-track-count">{`${
              info.tracks.items.length
            } track${info.tracks.items.length === 1 ? '' : 's'}`}</p>
            <p className="album-info-length">{info.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Album
