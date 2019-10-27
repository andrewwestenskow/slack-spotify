import React from 'react'
import routes from './routes'
import './App.scss'
import { connect } from 'react-redux'

function App() {
  return <div className="App">{routes}</div>
}

const mapStateToProps = state => {
  return state.auth
}

export default connect(mapStateToProps)(App)
