import React, { useState, useEffect } from 'react'
import Dashboard from '../../Components/Dashboard/Dashboard'
import { fetchTopArtists } from '../../functions/fetch'
import { connect } from 'react-redux'

const DashboardContainer = props => {
  const [topArtists, setTopArtists] = useState([])
  useEffect(() => {
    fetchTopArtists(props.access_token).then(res => {
      setTopArtists(res)
    })
  }, [props.access_token])
  return <Dashboard topArtists={topArtists} />
}

const mapStateToProps = state => {
  return state.auth
}

export default connect(mapStateToProps)(DashboardContainer)
