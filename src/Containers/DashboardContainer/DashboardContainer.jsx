import React, { useState, useEffect } from 'react'
import Dashboard from '../../Components/Dashboard/Dashboard'
import { fetchDashboardInfo } from '../../functions/fetch'
import { connect } from 'react-redux'

const DashboardContainer = props => {
  const [topArtists, setTopArtists] = useState([])
  const [recent, setRecent] = useState([])
  const [featured, setFeatured] = useState([])
  useEffect(() => {
    fetchDashboardInfo(props.access_token).then(res => {
      setTopArtists(res.topArtists)
      setRecent(res.recent)
      setFeatured(res.featured)
    })
  }, [props.access_token])
  return (
    <Dashboard featured={featured} recent={recent} topArtists={topArtists} />
  )
}

const mapStateToProps = state => {
  return state.auth
}

export default connect(mapStateToProps)(DashboardContainer)
