import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'

const LibraryAlbum = props => {
  const { info } = props
  return (
    <div className="Library-Album">
      <div
        style={{ backgroundImage: `url(${info.images[1].url})` }}
        className="library-album-art"
      >
        <PlayWidget
          id={info.id}
          inLibrary={info.inLibrary}
          showMore={true}
          toggleChange={props.toggleChange}
          access_token={props.access_token}
          deviceId={props.deviceId}
          type="album"
          offset={0}
          uri={info.uri}
        />
      </div>
    </div>
  )
}
export default LibraryAlbum
