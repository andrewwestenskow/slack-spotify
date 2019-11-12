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
    const fetch = async () => {
      const artist = await getArtist(props.access_token, id)
      setArtist(artist)
    }
    fetch()
  }, [id, props.access_token, change])

  const toggleChange = () => {
    setChange(!change)
  }

  if (artist.info) {
    return <Artist toggleChange={toggleChange} info={artist} />
  } else {
    return <SpotifyLoading />
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.auth.access_token,
  }
}

export default connect(mapStateToProps)(ArtistContainer)
