import React from 'react'
import SpotifyNav from '../Navigation/SpotifyNav'
import LibraryAlbum from './LibraryAlbum'
import { SpotifyLoadingTransparent } from '../Loading/Loading'

const LibraryAlbums = props => {
  const { info } = props
  const mappedAlbums = info.map(element => {
    return <LibraryAlbum key={element.album.id} info={element.album} />
  })
  return (
    <div className="Library-Albums Library">
      <SpotifyNav />
      {info.length > 0 ? (
        <div>{mappedAlbums}</div>
      ) : (
        <SpotifyLoadingTransparent />
      )}
    </div>
  )
}
export default LibraryAlbums
