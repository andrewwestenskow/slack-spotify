import React, { useEffect, useState } from 'react'
import useSocket from 'use-socket.io-client'
import PlayerWidget from '../PlayerWidget/PlayerWidget'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { setSocket, setConnectionConfirmed } from '../../ducks/socketReducer'
import { refreshAuth } from '../../ducks/authReducer'
import { connect } from 'react-redux'

const AppContainer = props => {
  const {
    userId,
    connectionConfirmed,
    setSocket,
    setConnectionConfirmed,
    refreshAuth,
  } = props

  const [socket] = useState(useSocket()[0])

  socket.connect()

  useEffect(() => {
    if (userId && !connectionConfirmed && socket.ids !== undefined) {
      socket.emit('socket join', userId)
    }
  }, [userId, socket, connectionConfirmed])

  socket.on('connection confirmed', data => {
    console.log('CONFIRMED: ', data)
    //THIS NEEDS TO HAPPEN ON REDUX
    setSocket(socket)
    setConnectionConfirmed(true)
  })

  socket.on('auth error', data => {
    console.log('Confirm auth error')
    console.log(data)
    refreshAuth()
  })

  return (
    <>
      <Header />
      <Sidebar />
      <div className="app-children">{props.children}</div>
      <PlayerWidget />
    </>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    connectionConfirmed: state.socket.connectionConfirmed,
  }
}

export default connect(
  mapStateToProps,
  { setSocket, setConnectionConfirmed, refreshAuth }
)(AppContainer)
