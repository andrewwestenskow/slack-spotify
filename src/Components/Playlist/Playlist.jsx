import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'
import PlaylistTrack from './PlaylistTrack'
import PersonSharp from '@material-ui/icons/PersonSharp'
import Album from '@material-ui/icons/Album'
import MusicNoteSharp from '@material-ui/icons/MusicNoteSharp'
import AccessTimeSharp from '@material-ui/icons/AccessTimeSharp'

const Playlist = props => {
  const { info } = props
  const mappedTracks = info.tracks.items.map((element, index) => {
    return (
      <PlaylistTrack
        access_token={props.access_token}
        deviceId={props.deviceId}
        context={info.uri}
        info={element.track}
        key={element.track.id}
        position={index}
      />
    )
  })
  return (
    <div className="Playlist">
      <div className="playlist-info">
        <div
          className="playlist-info-image"
          style={{ backgroundImage: `url(${info.images[0].url})` }}
          alt=""
        >
          <PlayWidget
            id={info.id}
            toggleChange={props.toggleChange}
            access_token={props.access_token}
            deviceId={props.deviceId}
            inLibrary={info.inLibrary}
            uri={info.uri}
            showMore={true}
            type="playlist"
            offset={0}
          />
        </div>
        <div className="playlist-info-text">
          <div className="playlist-info-top">
            <p className="playlist-info-title">{info.name}</p>
          </div>
          <div className="playlist-info-bottom">
            <p className="playlist-info-owner">By: {info.owner.display_name}</p>
            <p className="playlist-info-track-count">{`${
              info.tracks.items.length
            } track${info.tracks.items.length === 1 ? '' : 's'}`}</p>
            <p className="playlist-info-length">{info.length}</p>
          </div>
        </div>
      </div>
      <div className="playlist-tracks-header">
        <div className="playlist-tracks-header-left">
          <div className="album-art-hold"></div>
          <div className="playlist-tracks-header-icon-hold">
            <MusicNoteSharp />
          </div>
          <div className="playlist-tracks-header-icon-hold">
            <PersonSharp />
          </div>
          <div className="playlist-tracks-header-icon-hold">
            <Album />
          </div>
        </div>
        <div className="playlist-tracks-header-time-hold">
          <AccessTimeSharp />
        </div>
      </div>
      <div className="playlist-tracks-hold">{mappedTracks}</div>
    </div>
  )
}
export default Playlist
