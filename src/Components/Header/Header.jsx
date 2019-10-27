import React, { useState } from 'react'
import SearchResultsContainer from '../../Containers/SearchResults/SearchResultsContainer'
import { search } from '../../functions/fetch'
import { connect } from 'react-redux'

const Header = props => {
  const [searchResults, setSearchResults] = useState({})
  const deleteCode = () => {
    localStorage.removeItem('access_token')
  }

  const handleSearch = e => {
    if (e.target.value) {
      search(e.target.value, props.access_token).then(res => {
        setSearchResults(res)
      })
    } else {
      setSearchResults({})
    }
  }

  return (
    <>
      <div className="Header">
        <input onChange={e => handleSearch(e)} type="text" />
        <button onClick={deleteCode}>Reset code</button>
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
  return state.auth
}
export default connect(mapStateToProps)(Header)
