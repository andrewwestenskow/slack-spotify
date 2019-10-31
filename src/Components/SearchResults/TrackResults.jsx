import React from 'react'
import { playTracks } from '../../functions/playback'
import spotify from '../../assets/spotify.png'

const TrackResults = props => {
  const handlePlay = element => {
    playTracks(props.access_token, props.deviceId, [element.uri])
    props.clearSearch()
  }
  const mappedTracks = props.results.items.map(element => {
    return (
      <li className="result" key={element.uri}>
        {element.album.images[0] ? (
          <img
            onClick={() => handlePlay(element)}
            className="result-image"
            src={element.album.images[0].url}
            alt=""
          />
        ) : (
          <img
            onClick={() => handlePlay(element)}
            className="result-image"
            src={spotify}
            alt=""
          />
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
