import React from 'react'
import TopTrack from './TopTrack'

const Artist = props => {
  const { info, albums, topTracks, relatedArtists } = props.info
  const topUris = topTracks.map(element => {
    return element.uri
  })
  const topMappedTracks = topTracks.map(element => {
    return <TopTrack top={topUris} key={element.id} info={element} />
  })
  return (
    <div className="Artist">
      <div className="artist-info">
        <img src={info.images[1].url} className="artist-info-image" alt="" />
        <div className="artist-info-text">
          <p className="artist-info-name">{info.name}</p>
          <p className="artist-info-followers">
            {info.followers.total} Followers
          </p>
        </div>
        <div className="artist-info-top-tracks">
          <p className="top-tracks-header">Top songs</p>
          {topMappedTracks}
        </div>
      </div>
    </div>
  )
}
export default Artist
