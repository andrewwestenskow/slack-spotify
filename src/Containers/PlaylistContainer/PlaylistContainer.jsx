import React, { useState, useEffect } from 'react'
import { getPlaylist } from '../../functions/fetch'
import { connect } from 'react-redux'
import Playlist from '../../Components/Playlist/Playlist'

const PlaylistContainer = props => {
  const [playlist, setPlaylist] = useState({})
  useEffect(() => {
    getPlaylist(props.access_token, props.match.params.id).then(res => {
      setPlaylist(res)
    })
  }, [props.access_token, props.match.params.id])
  return (
    <Playlist
      playlist={playlist}
      access_token={props.access_token}
      deviceId={props.deviceId}
    />
  )
}

const mapStateToProps = state => {
  return {
    access_token: state.auth.access_token,
    deviceId: state.spotify.deviceId,
  }
}
export default connect(mapStateToProps)(PlaylistContainer)
