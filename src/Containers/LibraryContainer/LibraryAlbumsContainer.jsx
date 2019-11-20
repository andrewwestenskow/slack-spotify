import React, { useState, useEffect } from 'react'
import LibraryAlbums from '../../Components/Library/LibraryAlbums'
import { connect } from 'react-redux'
import { getLibraryAlbums } from '../../functions/fetch'

const LibraryAlbumsContainer = props => {
  const [albums, setAlbums] = useState([])
  useEffect(() => {
    getLibraryAlbums(props.access_token).then(res => {
      setAlbums(res.items)
    })
  }, [props.access_token])
  return <LibraryAlbums info={albums} />
}

const mapStateToProps = state => {
  return {
    access_token: state.auth.access_token,
  }
}
export default connect(mapStateToProps)(LibraryAlbumsContainer)
