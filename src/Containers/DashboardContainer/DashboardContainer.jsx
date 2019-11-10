import React, { useState, useEffect } from 'react'
import Dashboard from '../../Components/Dashboard/Dashboard'
import { fetchDashboardInfo } from '../../functions/fetch'
import { connect } from 'react-redux'
import { SpotifyLoading } from '../../Components/Loading/Loading'

const DashboardContainer = props => {
  const [topArtists, setTopArtists] = useState([])
  const [recent, setRecent] = useState([])
  const [featured, setFeatured] = useState([])
  const [change, setChange] = useState(false)
  useEffect(() => {
    fetchDashboardInfo(props.access_token).then(res => {
      setTopArtists(res.topArtists)
      setRecent(res.recent)
      setFeatured(res.featured)
    })
  }, [props.access_token, change])
  const toggleChange = () => {
    setChange(!change)
  }

  if (recent.length > 0) {
    return (
      <Dashboard
        toggleChange={toggleChange}
        featured={featured}
        recent={recent}
        topArtists={topArtists}
      />
    )
  } else {
    return <SpotifyLoading />
  }
}

const mapStateToProps = state => {
  return state.auth
}

export default connect(mapStateToProps)(DashboardContainer)
