import React from 'react'
import { playArtist } from '../../functions/playback'
import spotify from '../../assets/spotify.jpg'

const ArtistResults = props => {
  const handlePlay = element => {
    playArtist(props.access_token, props.deviceId, element.uri)
  }
  const mappedArtists = props.results.items.map(element => {
    return (
      <li className="result" key={element.uri}>
        {element.images[0] ? (
          <img
            onClick={() => handlePlay(element)}
            className="result-image"
            src={element.images[0].url}
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
        </div>
      </li>
    )
  })
  return <ul className="result-column">{mappedArtists}</ul>
}
export default ArtistResults
