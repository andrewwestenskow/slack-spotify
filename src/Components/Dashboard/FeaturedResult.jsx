import React from 'react'

const FeaturedResult = props => {
  const { info } = props
  return (
    <div className="result">
      <p>{info.name}</p>
    </div>
  )
}
export default FeaturedResult
