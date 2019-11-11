import React from 'react'
import spotify from '../../assets/spotify.png'
import PlayWidget from '../PlayWidget/PlayWidget'
import { Link } from 'react-router-dom'

const ArtistResults = props => {
  const mappedArtists = props.results.items.map(element => {
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
              type="artist"
              uri={element.uri}
            />
          </div>
        ) : (
          <div
            onClick={props.clearSearch}
            className="result-image"
            style={{ backgroundImage: `url(${spotify})` }}
          >
            <PlayWidget
              access_token={props.access_token}
              deviceId={props.deviceId}
              type="artist"
              uri={element.uri}
            />
          </div>
        )}
        <div className="result-text">
          <Link
            to={`/user/spotify/artist/${element.id}`}
            className="result-artist"
            onClick={props.clearSearch}
          >
            {element.name}
          </Link>
        </div>
      </li>
    )
  })
  return (
    <div className="result-section">
      <p className="result-header">Artists</p>
      <ul className="result-column">{mappedArtists}</ul>
    </div>
  )
}
export default ArtistResults
