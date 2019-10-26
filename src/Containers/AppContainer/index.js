import React from 'react'
import axios from 'axios'

const AppContainer = props => {
  const login = async () => {
    const response = await axios.get('/login')
    window.location.href = response.data
  }
  return (
    <div>
      Hello world
      <button onClick={login}>LOG IN HERE</button>
    </div>
  )
}
export default AppContainer
