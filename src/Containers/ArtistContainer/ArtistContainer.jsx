import React, { useState, useEffect } from 'react'
import Artist from '../../Components/Artist/Artist'
import { connect } from 'react-redux'
import { getArtist } from '../../functions/fetch'
import { SpotifyLoading } from '../../Components/Loading/Loading'

const ArtistContainer = props => {
  const { id } = props.match.params
  const [artist, setArtist] = useState({})
  const [change, setChange] = useState(false)
  useEffect(() => {
    getArtist(props.access_token, id).then(res => {
      setArtist(res)
    })
  }, [id, props.access_token, change])

  const toggleChange = () => {
    setChange(!change)
  }

  if (artist.info) {
    return (
      <Artist
        access_token={props.access_token}
        deviceId={props.deviceId}
        toggleChange={toggleChange}
        info={artist}
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

export default connect(mapStateToProps)(ArtistContainer)
