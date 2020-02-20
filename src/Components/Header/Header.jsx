import React, { useState } from 'react'
import SearchResultsContainer from '../../Containers/SearchResults/SearchResultsContainer'
import UserDetails from './UserDetails'
import { search } from '../../functions/fetch'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import { refreshAuth } from '../../ducks/authReducer'

const Header = props => {
  const [searchResults, setSearchResults] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  // const deleteCode = () => {
  //   localStorage.removeItem('access_token')
  //   localStorage.removeItem('refresh_token')
  // }

  const handleSearch = async e => {
    if (e.target.value) {
      setSearchTerm(e.target.value)
      const results = await search(
        e.target.value,
        props.auth.access_token,
        props.auth.refresh_token
      )
      setSearchResults(results)
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
        <UserDetails />
        <HomeIcon
          onClick={() => props.history.push('/user/spotify/dashboard')}
          className="home-icon"
        />
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
export default withRouter(
  connect(
    mapStateToProps,
    { refreshAuth }
  )(Header)
)
