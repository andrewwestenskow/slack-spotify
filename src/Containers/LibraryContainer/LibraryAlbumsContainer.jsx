import React, { useState, useEffect, useCallback } from 'react'
import LibraryAlbums from '../../Components/Library/LibraryAlbums'
import { connect } from 'react-redux'
import { getLibraryAlbums } from '../../functions/fetch'
import { setAlbums } from '../../ducks/libraryReducer'
import usePrevious from '../../functions/usePrevious'

const LibraryAlbumsContainer = props => {
  const [albums, setAlbums] = useState([])
  const [toggle, setToggle] = useState(false)
  const memoSetAlbums = useCallback(props.setAlbums, [props.albums, toggle])
  let prevToggle = usePrevious(toggle)
  if (prevToggle === undefined) {
    prevToggle = false
  }
  useEffect(() => {
    console.log(toggle, prevToggle)
    if (props.albums.length === 0 || toggle !== prevToggle) {
      getLibraryAlbums(props.access_token).then(res => {
        memoSetAlbums(res.items)
        setAlbums(res.items)
      })
    } else {
      setAlbums(props.albums)
    }
  }, [props.access_token, toggle, props.albums, memoSetAlbums, prevToggle])

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
    albums: state.library.albums,
  }
}
export default connect(
  mapStateToProps,
  { setAlbums }
)(LibraryAlbumsContainer)
