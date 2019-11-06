import React from 'react'
import RecentResult from './RecentResult'

const Dashboard = props => {
  const recent = props.recent.map(element => {
    return <RecentResult key={element.played_at} info={element} />
  })
  return (
    <div className="Dashboard">
      <h1>HOME</h1>
      <div className="recently-played">{recent}</div>
      <div className="top-artists"></div>
      <div className="featured"></div>
    </div>
  )
}
export default Dashboard
