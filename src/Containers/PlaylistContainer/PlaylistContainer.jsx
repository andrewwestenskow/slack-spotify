import React, { useState, useEffect } from 'react'
import { getPlaylist } from '../../functions/fetch'
import { connect } from 'react-redux'
import Playlist from '../../Components/Playlist/Playlist'
import { SpotifyLoading } from '../../Components/Loading/Loading'

const PlaylistContainer = props => {
  const [playlist, setPlaylist] = useState({})
  useEffect(() => {
    getPlaylist(props.access_token, props.match.params.id).then(res => {
      setPlaylist(res)
    })
  }, [props.access_token, props.match.params.id])
  if (playlist.tracks) {
    return (
      <Playlist
        info={playlist}
        access_token={props.access_token}
        deviceId={props.deviceId}
      />
    )
  } else {
    return <SpotifyLoading />
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.auth.access_token,
    deviceId: state.spotify.deviceId,
  }
}
export default connect(mapStateToProps)(PlaylistContainer)
