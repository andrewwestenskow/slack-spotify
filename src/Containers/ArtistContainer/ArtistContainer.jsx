import React, { useState, useEffect } from 'react'
import Artist from '../../Components/Artist/Artist'
import { connect } from 'react-redux'
import { getArtist } from '../../functions/fetch'

const ArtistContainer = props => {
  const { id } = props.match.params
  const [artist, setArtist] = useState({})
  useEffect(() => {
    const fetch = async () => {
      const artist = await getArtist(props.access_token, id)
      setArtist(artist)
    }
    fetch()
  }, [id, props.access_token])
  return <Artist info={artist} />
}

const mapStateToProps = state => {
  return {
    access_token: state.auth.access_token,
  }
}

export default connect(mapStateToProps)(ArtistContainer)
