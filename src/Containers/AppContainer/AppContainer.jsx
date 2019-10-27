import React from 'react'
import PlayerWidget from '../PlayerWidget/PlayerWidget'
import Header from '../../Components/Header/Header'

const AppContainer = props => {
  return (
    <>
      <Header />
      <div>{props.children}</div>
      <PlayerWidget />
    </>
  )
}
export default AppContainer
