import React from 'react'
import Library from '../../Components/Library/Library'

const LibraryContainer = props => {
  const { type } = props.match.params

  switch (type) {
    case 'albums':
      return <Library />
    case 'artists':
      return <Library />
    default:
      return <Library />
  }
}
export default LibraryContainer
