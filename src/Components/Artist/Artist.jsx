import React from 'react'
import TopTrack from './TopTrack'
import { connect } from 'react-redux'
import { handlePlay } from '../../functions/playback'
import ArtistAlbum from './ArtistAlbum'
import TopArtistResult from '../Dashboard/TopArtistResult'
import { addToLibrary, removeFromLibrary } from '../../functions/library'

const Artist = props => {
  const { info, albums, topTracks, relatedArtists } = props.info
  const topUris = topTracks.map(element => {
    return element.uri
  })

  const topMappedTracks = topTracks.map(element => {
    return <TopTrack top={topUris} key={element.id} info={element} />
  })

  const artistAlbumsMap = albums.map(element => {
    return (
      <ArtistAlbum
        toggleChange={props.toggleChange}
        key={element.id}
        info={element}
      />
    )
  })

  const relatedMap = relatedArtists.map(element => {
    return (
      <TopArtistResult
        access_token={props.access_token}
        deviceId={props.deviceId}
        key={element.id}
        info={element}
      />
    )
  })

  const handleLibraryChange = () => {
    if (info.inLibrary) {
      removeFromLibrary({
        id: info.id,
        access_token: props.access_token,
        type: 'artist',
      })
      props.toggleChange()
    } else {
      addToLibrary({
        id: info.id,
        access_token: props.access_token,
        type: 'artist',
      })
      props.toggleChange()
    }
  }
  return (
    <div className="Artist">
      <div className="artist-info">
        <div className="artist-info-main">
          <div className="artist-info-head">
            <img
              src={info.images[1].url}
              className="artist-info-image"
              alt=""
            />
            <div className="artist-info-head-text">
              <p className="artist-info-name">{info.name}</p>
              {/* <p className="artist-info-followers">
                {info.followers.total} Followers
              </p> */}
              <button
                onClick={() =>
                  handlePlay({
                    access_token: props.access_token,
                    deviceId: props.deviceId,
                    type: 'artist',
                    uri: info.uri,
                  })
                }
                className="play-button"
              >
                Play
              </button>
              <button onClick={handleLibraryChange} className="play-button">
                {info.inLibrary ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          </div>
          <div className="mobile-top-tracks">
            <p className="top-tracks-header">Top songs</p>
            {topMappedTracks}
          </div>
          <div className="artist-info-albums-hold">
            <p className="artist-albums-header">Albums</p>
            <div className="artist-info-albums">{artistAlbumsMap}</div>
          </div>
        </div>
        <div className="artist-info-top-tracks">
          <p className="top-tracks-header">Top songs</p>
          {topMappedTracks}
          <p className="top-tracks-header">Related Artists</p>
          <div className="artist-related-artists-hold">{relatedMap}</div>
        </div>
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

export default connect(mapStateToProps)(Artist)
