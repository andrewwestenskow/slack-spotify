import React from 'react'

const AlbumContainer = props => {
  return <div>{props.match.params.id}</div>
}
export default AlbumContainer
