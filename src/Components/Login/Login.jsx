import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setAuth } from '../../ducks/authReducer'

const Login = props => {
  const login = async () => {
    const response = await axios.get('/login')
    window.location.href = response.data
  }

  if (props.access_token) {
    props.history.push('auth/dashboard')
    return <div></div>
  } else {
    axios
      .get('/session')
      .then(res => {
        props.setAuth(res)
        props.history.push('auth/dashboard')
        return <div></div>
      })
      .catch(err => {
        console.log('he')
        return (
          <div>
            <button onClick={login}>LOG IN HERE</button>
          </div>
        )
      })
  }
}

const mapStateToProps = state => {
  return state.auth
}
export default connect(
  mapStateToProps,
  { setAuth },
)(Login)
