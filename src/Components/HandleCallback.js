import React from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuth } from '../ducks/authReducer'

const HandleCallback = props => {
  const urlQuery = new URLSearchParams(useLocation().search)
  const code = urlQuery.get('code')
  axios
    .post(`/callback?code=${code}`)
    .then(response => {
      props.setAuth(response)
      props.history.push('auth/dashboard')
    })
    .catch(error => {
      if (!props.access_token) {
        console.log('yeehaw')
        props.history.push('/')
      } else {
        props.history.push('/auth/dashboard')
      }
    })
  return <div>Logging you in</div>
}

const mapStateToProps = state => {
  return state.auth
}

export default connect(
  mapStateToProps,
  { setAuth },
)(HandleCallback)
