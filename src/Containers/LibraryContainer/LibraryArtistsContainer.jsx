import React, { useState, useEffect } from 'react'
import LibraryArtists from '../../Components/Library/LibraryArtists'
import { connect } from 'react-redux'
import { SpotifyLoading } from '../../Components/Loading/Loading'
import { getFollowedArtists } from '../../functions/fetch'

const LibraryArtistsContainer = (props) => {
  const [artists, setArtists] = useState([])
  useEffect(() => {
    getFollowedArtists(props.access_token, props.refresh_token).then((res) => {
      setArtists(res)
    })
  }, [props.access_token, props.refresh_token])

  if (artists.length > 0) {
    return <LibraryArtists info={artists} />
  } else {
    return <SpotifyLoading />
  }
}

const mapStateToProps = (state) => {
  return {
    access_token: state.auth.access_token,
    refresh_token: state.auth.refresh_token,
    deviceId: state.spotify.deviceId,
  }
}
export default connect(mapStateToProps)(LibraryArtistsContainer)
