import React from 'react'

const TopArtistResult = props => {
  const { info } = props
  return (
    <div className="result">
      <p>{info.name}</p>
    </div>
  )
}
export default TopArtistResult
