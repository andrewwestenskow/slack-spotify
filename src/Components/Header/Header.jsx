import React, { useState } from 'react'
import SearchResultsContainer from '../../Containers/SearchResults/SearchResultsContainer'
import { search } from '../../functions/fetch'
import { connect } from 'react-redux'
import { refreshAuth } from '../../ducks/authReducer'
import { playAlbum } from '../../functions/playback'

const Header = props => {
  const [searchResults, setSearchResults] = useState({})
  const deleteCode = () => {
    localStorage.removeItem('access_token')
  }

  const handleSearch = async e => {
    if (e.target.value) {
      try {
        const results = await search(e.target.value, props.auth.access_token)
        setSearchResults(results)
      } catch (error) {
        await refreshAuth()
        const results = await search(e.target.value, props.auth.access_token)
        setSearchResults(results)
      }
    } else {
      setSearchResults({})
    }
  }

  const handlePlayback = async () => {
    playAlbum(
      props.auth.access_token,
      props.spotify.deviceId,
      'spotify:album:6UjZgFbK6CQptu8aOobzPV',
      0,
    )
  }

  return (
    <>
      <div className="Header">
        <input onChange={e => handleSearch(e)} type="text" />
        <button onClick={deleteCode}>Reset code</button>
        <button onClick={handlePlayback}>Test changing track</button>
      </div>
      {searchResults.tracks && (
        <div className="search-container-hold">
          <SearchResultsContainer results={searchResults} />
        </div>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return { auth: state.auth, spotify: state.spotify }
}
export default connect(
  mapStateToProps,
  { refreshAuth },
)(Header)
