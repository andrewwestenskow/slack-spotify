import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import spotify from '../../assets/spotify.png'
import slack from '../../assets/slack.svg'
import discord from '../../assets/discord.png'

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
      <NavLink
        isActive={(match, location) => {
          if (location.pathname.includes('slack')) {
            return true
          }
        }}
        activeClassName="sidebar-nav-active"
        className="sidebar-nav"
        to="/user/slack/main"
      >
        <img className="sidebar-nav-image" src={slack} alt="" />
      </NavLink>
      <NavLink
        isActive={(match, location) => {
          if (location.pathname.includes('discord')) {
            return true
          }
        }}
        activeClassName="sidebar-nav-active"
        className="sidebar-nav"
        to="/user/discord/main"
      >
        <img className="sidebar-nav-image" src={discord} alt="" />
      </NavLink>
    </nav>
  )
}
export default withRouter(Sidebar)
