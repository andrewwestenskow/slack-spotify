import React, { useState, useEffect } from 'react'
import { getAlbum } from '../../functions/fetch'
import { connect } from 'react-redux'
import Album from '../../Components/Album/Album'
import { SpotifyLoading } from '../../Components/Loading/Loading'

const AlbumContainer = props => {
  const { id } = props.match.params
  const [album, setAlbum] = useState({})
  const [change, setChange] = useState(false)
  useEffect(() => {
    props.access_token &&
      getAlbum(props.access_token, props.refresh_token, id).then(res => {
        setAlbum(res)
      })
  }, [id, props.access_token, change, props.refresh_token])

  const toggleChange = () => {
    setChange(!change)
  }

  // console.log(album)

  if (album.tracks) {
    return (
      <Album
        toggleChange={toggleChange}
        access_token={props.access_token}
        deviceId={props.deviceId}
        info={album}
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
  }
}

export default connect(mapStateToProps)(AlbumContainer)
