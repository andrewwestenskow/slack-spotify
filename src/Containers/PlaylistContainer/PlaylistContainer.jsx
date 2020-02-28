import React, { useState, useEffect } from 'react'
import { getPlaylist } from '../../functions/fetch'
import { connect } from 'react-redux'
import Playlist from '../../Components/Playlist/Playlist'
import { SpotifyLoading } from '../../Components/Loading/Loading'

const PlaylistContainer = props => {
  const [playlist, setPlaylist] = useState({})
  const [change, setChange] = useState(false)
  useEffect(() => {
    getPlaylist(
      props.access_token,
      props.refresh_token,
      props.match.params.id,
      props.userId
    ).then(res => {
      setPlaylist(res)
    })
  }, [
    props.access_token,
    props.refresh_token,
    props.match.params.id,
    props.userId,
    change,
  ])

  const toggleChange = () => {
    setChange(!change)
  }

  if (playlist.tracks) {
    return (
      <Playlist
        toggleChange={toggleChange}
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
    refresh_token: state.auth.refresh_token,
    deviceId: state.spotify.deviceId,
    userId: state.user.id,
  }
}
export default connect(mapStateToProps)(PlaylistContainer)
