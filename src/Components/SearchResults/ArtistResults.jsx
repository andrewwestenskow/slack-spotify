import React from 'react'

const ArtistResults = props => {
  const mappedArtists = props.results.items.map(element => {
    return (
      <li className="result" key={element.uri}>
        {element.name}
      </li>
    )
  })
  return <ul className="result-column">{mappedArtists}</ul>
}
export default ArtistResults
