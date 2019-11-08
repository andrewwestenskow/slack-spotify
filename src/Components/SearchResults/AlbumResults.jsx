import React from 'react'
import spotify from '../../assets/spotify.png'
import PlayWidget from '../PlayWidget/PlayWidget'

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
          <p className="result-artist">{element.artists[0].name}</p>
          <p className="result-title">{element.name}</p>
        </div>
      </li>
    )
  })
  return <ul className="result-column">{mappedAlbums}</ul>
}
export default AlbumResults
