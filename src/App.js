import React, { useEffect } from 'react'
import { hideContextMenu } from './ducks/contextMenuReducer'
import ContextMenu from './Components/ContextMenu/ContextMenu'
import routes from './routes'
import './App.scss'
import axios from 'axios'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuth } from './ducks/authReducer'
import { setUser } from './ducks/userReducer'

function App(props) {
  const handleRender = async () => {
    if (props.access_token) {
      return
    } else {
      try {
        const session = await axios.get('/session')
        props.setAuth(session.data.tokens)
        props.setUser(session.data.user)
      } catch (error) {
        console.log('Session check failed')
        const access_token = localStorage.getItem('access_token')
        const refresh_token = localStorage.getItem('refresh_token')
        if (
          access_token &&
          access_token !== 'undefined' &&
          refresh_token &&
          refresh_token !== 'undefined'
        ) {
          try {
            const refresh = await axios.post('/token', {
              access_token,
              refresh_token,
            })
            props.setAuth(refresh)
            props.setUser(refresh.data.user)
            props.history.push('/user/spotify/dashboard')
          } catch (error) {
            console.log('Token check failed')
            props.history.push('/')
          }
        } else {
          props.history.push('/')
        }
      }
    }
  }
  useEffect(() => {
    handleRender()
    // eslint-disable-next-line
  }, [props.access_token])

  window.onbeforeunload = () => {
    handleRender()
  }

  return (
    <div onClick={() => hideContextMenu()} className="App">
      {routes}
      {props.show && <ContextMenu />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { ...state.auth, user: { ...state.user }, ...state.contextMenu }
}

export default connect(mapStateToProps, { setAuth, setUser, hideContextMenu })(
  withRouter(App)
)
