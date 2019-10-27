import React from 'react'

const SearchResults = props => {
  const mappedResults = props.results.items.map(element => {
    return <p>{element.name}</p>
  })
  return <div className="SearchResults">{mappedResults}</div>
}
export default SearchResults
