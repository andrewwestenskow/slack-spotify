import React from 'react'
import { playTracks } from '../../functions/playback'

const TrackResults = props => {
  const handlePlay = element => {
    playTracks(props.access_token, props.deviceId, [element.uri])
    document.title = `${element.artists[0].name} - ${element.name}`
    props.clearSearch()
  }
  const mappedTracks = props.results.items.map(element => {
    console.log(element)
    return (
      <li className="result" key={element.uri}>
        <img
          onClick={() => handlePlay(element)}
          className="result-image"
          src={element.album.images[0].url}
          alt=""
        />
        <div className="track-detail">
          <p className="track-title">{element.name}</p>
          <p className="track-artist">{element.artists[0].name}</p>
        </div>
      </li>
    )
  })
  return <ul className="result-column">{mappedTracks}</ul>
}
export default TrackResults
