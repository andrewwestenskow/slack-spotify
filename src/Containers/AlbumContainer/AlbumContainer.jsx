import React, { useState, useEffect } from 'react'
import { getAlbum } from '../../functions/fetch'
import { connect } from 'react-redux'

const AlbumContainer = props => {
  const { id } = props.match.params
  const [album, setAlbum] = useState({})
  useEffect(() => {
    getAlbum(props.access_token, id).then(res => {
      setAlbum(res)
    })
  }, [id, props.access_token])
  return <div>{props.match.params.id}</div>
}

const mapStateToProps = state => {
  return {
    access_token: state.auth.access_token,
  }
}

export default connect(mapStateToProps)(AlbumContainer)
