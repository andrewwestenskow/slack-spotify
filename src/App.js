import React, { useEffect } from 'react'
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
        const access_token = localStorage.getItem('access_token')
        const refresh_token = localStorage.getItem('refresh_token')
        if (access_token && refresh_token) {
          try {
            const refresh = await axios.post('/token', {
              access_token,
              refresh_token,
            })
            console.log(refresh)
            props.setAuth(refresh)
            props.setUser(refresh.data.user)
            props.history.push('/user/spotify/dashboard')
          } catch (error) {
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

  return <div className="App">{routes}</div>
}

const mapStateToProps = state => {
  return state.auth
}

export default connect(
  mapStateToProps,
  { setAuth, setUser }
)(withRouter(App))
