import React from 'react'
import spotify from '../../assets/spotify.png'
import PlayWidget from '../PlayWidget/PlayWidget'
import { Link } from 'react-router-dom'

const AlbumResults = props => {
  const mappedAlbums = props.results.items.map(element => {
    return (
      <li className="search-result" key={element.uri}>
        {element.images[0] ? (
          <div
            onClick={props.clearSearch}
            className="result-image"
            style={{ backgroundImage: `url(${element.images[0].url})` }}
          >
            <PlayWidget
              access_token={props.access_token}
              deviceId={props.deviceId}
              uri={element.uri}
              type="album"
              offset={0}
            />
          </div>
        ) : (
          <div
            className="result-image"
            style={{ backgroundImage: `url(${spotify})` }}
          >
            <PlayWidget
              access_token={props.access_token}
              deviceId={props.deviceId}
              uri={element.uri}
              type="album"
              offset={0}
            />
          </div>
        )}
        <div className="result-text">
          <Link
            to={`/user/spotify/artist/${element.artists[0].id}`}
            className="result-artist"
            onClick={props.clearSearch}
          >
            {element.artists[0].name}
          </Link>
          <Link
            onClick={props.clearSearch}
            to={`/user/spotify/album/${element.id}`}
            className="result-title"
          >
            {element.name}
          </Link>
        </div>
      </li>
    )
  })
  return (
    <div className="result-section">
      <p className="result-header">Albums</p>
      <ul className="result-column">{mappedAlbums}</ul>
    </div>
  )
}
export default AlbumResults
