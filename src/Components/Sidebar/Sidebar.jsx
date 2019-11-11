import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import spotify from '../../assets/spotify.png'

const Sidebar = props => {
  return (
    <nav className="Sidebar">
      <NavLink
        isActive={(match, location) => {
          if (location.pathname.includes('spotify')) {
            return true
          }
        }}
        activeClassName="sidebar-nav-active"
        className="sidebar-nav"
        to="/user/spotify/dashboard"
      >
        <img className="sidebar-nav-image" src={spotify} alt="" />
      </NavLink>
    </nav>
  )
}
export default withRouter(Sidebar)
