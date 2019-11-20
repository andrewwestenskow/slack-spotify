import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'
import { Link } from 'react-router-dom'

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
      <div className="library-album-text-hold">
        <Link
          className="library-album-album"
          to={`/user/spotify/album/${info.id}`}
        >
          {info.name}
        </Link>
        <Link
          className="library-album-artist"
          to={`/user/spotify/artist/${info.artists[0].id}`}
        >
          {info.artists[0].name}
        </Link>
      </div>
    </div>
  )
}
export default LibraryAlbum
