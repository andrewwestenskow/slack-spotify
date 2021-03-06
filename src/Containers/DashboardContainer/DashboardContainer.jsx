import React, { useState, useEffect } from 'react'
import Dashboard from '../../Components/Dashboard/Dashboard'
import { fetchDashboardInfo } from '../../functions/fetch'
import { connect } from 'react-redux'

const DashboardContainer = props => {
  const [topArtists, setTopArtists] = useState([])
  const [recent, setRecent] = useState([])
  const [featured, setFeatured] = useState([])
  const [myPlaylists, setMyPlaylists] = useState([])
  const [change, setChange] = useState(false)
  useEffect(() => {
    fetchDashboardInfo(props.access_token).then(res => {
      setTopArtists(res.topArtists)
      setRecent(res.recent)
      setFeatured(res.featured)
      setMyPlaylists(res.myPlaylists)
    })
  }, [props.access_token, change])
  const toggleChange = () => {
    setChange(!change)
  }
  return (
    <Dashboard
      access_token={props.access_token}
      deviceId={props.deviceId}
      toggleChange={toggleChange}
      featured={featured}
      recent={recent}
      topArtists={topArtists}
      myPlaylists={myPlaylists}
    />
  )
}

const mapStateToProps = state => {
  return state.auth
}

export default connect(mapStateToProps)(DashboardContainer)
