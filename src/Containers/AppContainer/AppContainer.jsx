import React from 'react'
import PlayerWidget from '../PlayerWidget/PlayerWidget'

const AppContainer = props => {
  console.log(props.children)
  return (
    <>
      <div>{props.children}</div>
      <PlayerWidget />
    </>
  )
}
export default AppContainer
