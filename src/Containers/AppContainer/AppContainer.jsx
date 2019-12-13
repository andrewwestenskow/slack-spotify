import React from 'react'
import PlayerWidget from '../PlayerWidget/PlayerWidget'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'

const AppContainer = props => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="app-children">{props.children}</div>
      <PlayerWidget />
    </>
  )
}
export default AppContainer
