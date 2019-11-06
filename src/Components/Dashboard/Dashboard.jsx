import React from 'react'
import RecentResult from './RecentResult'

const Dashboard = props => {
  const recent = props.recent.map(element => {
    return <RecentResult key={element.played_at} info={element} />
  })
  return (
    <div className="Dashboard">
      <h1>HOME</h1>
      <div className="dashboard-section recently-played">
        <div className="dashboard-section-label">Recently Played</div>
        <div className="dashboard-section-results">{recent}</div>
      </div>
      <div className="dashboard-section top-artists">
        <div className="dashboard-section-label">Top Artists</div>
        <div className="dashboard-section-results"></div>
      </div>
      <div className="dashboard-section featured">
        <div className="dashboard-section-label">Featured</div>
        <div className="dashboard-section-results"></div>
      </div>
    </div>
  )
}
export default Dashboard
