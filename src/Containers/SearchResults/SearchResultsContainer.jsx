import React from 'react'
import SearchResults from '../../Components/SearchResults/SearchResults'

const SearchResultsContainer = props => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
      }}
    >
      <SearchResults type="Tracks" results={props.results.tracks} />
      <SearchResults type="Artists" results={props.results.artists} />
      <SearchResults type="Albums" results={props.results.albums} />
    </div>
  )
}
export default SearchResultsContainer
