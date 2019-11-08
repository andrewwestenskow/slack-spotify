import React from 'react'
import spotify from '../../assets/spotify.png'
import PlayWidget from '../PlayWidget/PlayWidget'

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
            style={{ backgroundImage: `url(${element.album.images[0].url})` }}
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
          <p className="result-title">{element.name}</p>
          <p className="result-artist">{element.artists[0].name}</p>
        </div>
      </li>
    )
  })
  return <ul className="result-column">{mappedTracks}</ul>
}
export default TrackResults
