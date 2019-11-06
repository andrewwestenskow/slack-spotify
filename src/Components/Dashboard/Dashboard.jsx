import React from 'react'
import RecentResult from './RecentResult'
import TopArtistResult from './TopArtistResult'
import FeaturedResult from './FeaturedResult'
import { connect } from 'react-redux'

const Dashboard = props => {
  const recent = props.recent.map(element => {
    return (
      <RecentResult
        access_token={props.access_token}
        deviceId={props.deviceId}
        key={element.played_at}
        info={element}
      />
    )
  })
  const topArtists = props.topArtists.map(element => {
    return (
      <TopArtistResult
        access_token={props.access_token}
        deviceId={props.deviceId}
        key={element.id}
        info={element}
      />
    )
  })
  const featured = props.featured.map(element => {
    return (
      <FeaturedResult
        key={element.id}
        access_token={props.access_token}
        deviceId={props.deviceId}
        info={element}
      />
    )
  })
  return (
    <div className="Dashboard">
      <div className="dashboard-section recently-played">
        <div className="dashboard-section-label">Recently Played</div>
        <div className="dashboard-section-results">{recent}</div>
      </div>
      <div className="dashboard-section top-artists">
        <div className="dashboard-section-label">Top Artists</div>
        <div className="dashboard-section-results">{topArtists}</div>
      </div>
      <div className="dashboard-section featured">
        <div className="dashboard-section-label">Featured</div>
        <div className="dashboard-section-results">{featured}</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    access_token: state.auth.access_token,
    deviceId: state.spotify.deviceId,
  }
}
export default connect(mapStateToProps)(Dashboard)
