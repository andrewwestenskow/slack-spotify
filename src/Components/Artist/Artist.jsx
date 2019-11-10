import React from 'react'

const Artist = props => {
  const { info, albums, topTracks, relatedArtists } = props.info
  return (
    <div className="Artist">
      <h1>{info.name}</h1>
    </div>
  )
}
export default Artist
