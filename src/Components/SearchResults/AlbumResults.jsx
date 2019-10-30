import React from 'react'
import spotify from '../../assets/spotify.jpg'
import { playAlbum } from '../../functions/playback'

const AlbumResults = props => {
  const handlePlay = element => {
    playAlbum(props.access_token, props.deviceId, element.uri, 0)
    props.clearSearch()
  }
  const mappedAlbums = props.results.items.map(element => {
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
          <p className="result-artist">{element.artists[0].name}</p>
          <p className="result-title">{element.name}</p>
        </div>
      </li>
    )
  })
  return <ul className="result-column">{mappedAlbums}</ul>
}
export default AlbumResults
