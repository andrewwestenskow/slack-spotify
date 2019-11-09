import React from 'react'

const Artist = props => {
  const { info, albums, topTracks, relatedArtists } = props.info
  if (info) {
    return (
      <div className="Artist">
        <h1>{info.name}</h1>
      </div>
    )
  } else {
    return <div className="Artist">Loading</div>
  }
}
export default Artist
