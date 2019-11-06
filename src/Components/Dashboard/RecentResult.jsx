import React from 'react'

const RecentResult = props => {
  const { info } = props
  return (
    <div>
      <p>{info.track.album.name}</p>
    </div>
  )
}
export default RecentResult
