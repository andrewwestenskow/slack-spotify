import React from 'react'
import SpotifyNav from '../Navigation/SpotifyNav'
import TopArtistResult from '../Dashboard/TopArtistResult'

const LibraryArtists = props => {
  const { info } = props
  const mappedArtists = info.map(element => {
    return (
      <TopArtistResult
        style={{ padding: '10px' }}
        key={element.id}
        info={element}
      />
    )
  })
  return (
    <div className="Library-Artists Library">
      <SpotifyNav />
      <div className="library-artists-hold">{mappedArtists}</div>
    </div>
  )
}
export default LibraryArtists
