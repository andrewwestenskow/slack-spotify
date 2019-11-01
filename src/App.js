import React, { useEffect } from 'react'
import routes from './routes'
import './App.scss'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuth } from './ducks/authReducer'

function App(props) {
  useEffect(() => {
    const handleRender = async () => {
      if (props.access_token) {
        props.history.push('/auth/dashboard')
      } else {
        try {
          const session = await axios.get('/session')
          props.setAuth(session)
          props.history.push('/auth/dashboard')
        } catch (error) {
          const access_token = localStorage.getItem('access_token')
          const refresh_token = localStorage.getItem('refresh_token')
          if (access_token && refresh_token) {
            try {
              const { data: refresh } = await axios.post('/token', {
                access_token,
                refresh_token,
              })
              props.setAuth(refresh)
              props.history.push('/auth/dashboard')
            } catch (error) {
              props.history.push('/')
            }
          } else {
            props.history.push('/')
          }
        }
      }
    }
    handleRender()
    // eslint-disable-next-line
  }, [])

  return <div className="App">{routes}</div>
}

const mapStateToProps = state => {
  return state.auth
}

export default connect(
  mapStateToProps,
  { setAuth },
)(withRouter(App))
