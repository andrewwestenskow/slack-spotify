import React, { useState, useEffect } from 'react'
import Dashboard from '../../Components/Dashboard/Dashboard'
import { fetchTopArtists } from '../../functions/fetch'

const DashboardContainer = props => {
  const [topArtists, setTopArtists] = useState([])
  useEffect(() => {
    fetchTopArtists().then(res => {
      setTopArtists(res)
    })
  }, [])
  return <Dashboard topArtists={topArtists} />
}
export default DashboardContainer
