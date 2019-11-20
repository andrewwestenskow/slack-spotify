import React, { useState, useEffect } from 'react'
import LibraryAlbums from '../../Components/Library/LibraryAlbums'
import { connect } from 'react-redux'
import { getLibraryAlbums } from '../../functions/fetch'

const LibraryAlbumsContainer = props => {
  const [albums, setAlbums] = useState([])
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    getLibraryAlbums(props.access_token).then(res => {
      setAlbums(res.items)
    })
  }, [props.access_token, toggle])

  const toggleChange = () => {
    setToggle(!toggle)
  }
  return (
    <LibraryAlbums
      access_token={props.access_token}
      deviceId={props.deviceId}
      info={albums}
      toggleChange={toggleChange}
    />
  )
}

const mapStateToProps = state => {
  return {
    access_token: state.auth.access_token,
    deviceId: state.spotify.deviceId,
  }
}
export default connect(mapStateToProps)(LibraryAlbumsContainer)
