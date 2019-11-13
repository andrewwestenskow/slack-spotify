import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'
import { connect } from 'react-redux'

const ArtistAlbum = props => {
  const { info } = props
  return (
    <div className="Artist-Album">
      <div
        style={{ backgroundImage: `url(${info.images[0].url})` }}
        className="artist-album-art"
      >
        <PlayWidget
          toggleChange={props.toggleChange}
          id={info.id}
          inLibrary={info.inLibrary}
          access_token={props.access_token}
          deviceId={props.deviceId}
          type="album"
          uri={info.uri}
          offset={0}
          showMore={true}
        />
      </div>
      <div className="artist-album-info">
        <p className="artist-album-name">{info.name}</p>
        <p className="artist-album-release">{info.release_date.slice(0, 4)}</p>
        <p className="artist-album-tracks">{`${info.total_tracks} track${
          info.total_tracks > 1 ? 's' : ''
        }`}</p>
        <p className="artist-album-tracks">{info.album_group}</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    access_token: state.auth.access_token,
    deviceId: state.spotify.deviceId,
  }
}
export default connect(mapStateToProps)(ArtistAlbum)
