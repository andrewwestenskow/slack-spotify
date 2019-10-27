import React, { useEffect } from 'react'
import routes from './routes'
import './App.scss'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuth } from './ducks/authReducer'

function App(props) {
  const handleRender = async () => {
    if (props.access_token) {
      props.history.push('/auth/dashboard')
    } else {
      try {
        const session = await axios.get('/session')
        props.setAuth(session)
        props.history.push('/auth/dashboard')
      } catch (error) {
        props.history.push('/')
      }
    }
  }

  useEffect(() => {
    handleRender()
  }, [props.access_token])
  return <div className="App">{routes}</div>
}

const mapStateToProps = state => {
  return state.auth
}

export default connect(
  mapStateToProps,
  { setAuth },
)(withRouter(App))
