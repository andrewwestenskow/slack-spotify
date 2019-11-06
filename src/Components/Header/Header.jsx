import React, { useState } from 'react'
import SearchResultsContainer from '../../Containers/SearchResults/SearchResultsContainer'
import { search } from '../../functions/fetch'
import { connect } from 'react-redux'
import { refreshAuth } from '../../ducks/authReducer'

const Header = props => {
  const [searchResults, setSearchResults] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  // const deleteCode = () => {
  //   localStorage.removeItem('access_token')
  // }

  const handleSearch = async e => {
    if (e.target.value) {
      try {
        setSearchTerm(e.target.value)
        const results = await search(e.target.value, props.auth.access_token)
        setSearchResults(results)
      } catch (error) {
        refreshAuth().then(() => {
          search(e.target.value, props.auth.access_token).then(results => {
            setSearchResults(results)
          })
        })
      }
    } else {
      setSearchTerm('')
      setSearchResults({})
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    setSearchResults({})
  }

  return (
    <>
      <div className="Header">
        <input
          placeholder="Search Spotify"
          value={searchTerm}
          onChange={e => handleSearch(e)}
          type="text"
        />
        {/* <button onClick={deleteCode}>Reset code</button> */}
      </div>
      {searchResults.tracks && (
        <div className="search-container-hold">
          <SearchResultsContainer
            clearSearch={clearSearch}
            results={searchResults}
          />
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
