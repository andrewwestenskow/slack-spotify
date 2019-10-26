import React, { useState, useEffect } from 'react'
import Dashboard from '../../Components/Dashboard/Dashboard'
import { fetchTopArtists } from '../../functions/fetch'

const DashboardContainer = props => {
  const access_token = localStorage.getItem('access_token')
  const [topArtists, setTopArtists] = useState([])
  useEffect(() => {
    fetchTopArtists(access_token).then(res => {
      setTopArtists(res)
    })
  }, [access_token])
  return <Dashboard topArtists={topArtists} />
}
export default DashboardContainer
