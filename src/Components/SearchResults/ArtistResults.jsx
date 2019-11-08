import React from 'react'
import spotify from '../../assets/spotify.png'
import PlayWidget from '../PlayWidget/PlayWidget'

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
          <p className="result-title">{element.name}</p>
        </div>
      </li>
    )
  })
  return <ul className="result-column">{mappedArtists}</ul>
}
export default ArtistResults
