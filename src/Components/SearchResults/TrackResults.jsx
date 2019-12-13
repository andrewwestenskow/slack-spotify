import React from 'react'
import spotify from '../../assets/spotify.png'
import PlayWidget from '../PlayWidget/PlayWidget'
import { Link } from 'react-router-dom'

const TrackResults = props => {
  const mappedTracks = props.results.items.map(element => {
    return (
      <li className="search-result" key={element.uri}>
        {element.album.images[0] ? (
          <div
            onClick={props.clearSearch}
            className="result-image"
            style={{ backgroundImage: `url(${element.album.images[0].url})` }}
          >
            <PlayWidget
              access_token={props.access_token}
              deviceId={props.deviceId}
              uri={[element.uri]}
              type="tracks"
            />
          </div>
        ) : (
          <div
            onClick={props.clearSearch}
            className="result-image"
            src={spotify}
            style={{ backgroundImage: `url(${spotify})` }}
          >
            <PlayWidget
              access_token={props.access_token}
              deviceId={props.deviceId}
              uri={[element.uri]}
              type="tracks"
            />
          </div>
        )}
        <div className="result-text">
          <Link
            onClick={props.clearSearch}
            to={`/user/spotify/album/${element.album.id}`}
            className="result-title"
          >
            {element.name}
          </Link>
          <Link
            to={`/user/spotify/artist/${element.artists[0].id}`}
            className="result-artist"
            onClick={props.clearSearch}
          >
            {element.artists[0].name}
          </Link>
        </div>
      </li>
    )
  })
  return (
    <div className="result-section">
      <p className="result-header">Tracks</p>
      <ul className="result-column">{mappedTracks}</ul>
    </div>
  )
}
export default TrackResults
