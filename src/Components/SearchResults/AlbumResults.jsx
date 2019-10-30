import React from 'react'

const AlbumResults = props => {
  const mappedAlbums = props.results.items.map(element => {
    return (
      <li className="result" key={element.uri}>
        {element.name}
      </li>
    )
  })
  return <ul className="result-column">{mappedAlbums}</ul>
}
export default AlbumResults
