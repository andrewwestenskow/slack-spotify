import React from 'react'

const LibraryAlbum = props => {
  const { info } = props
  return <div className="Library-Album">{info.name}</div>
}
export default LibraryAlbum
