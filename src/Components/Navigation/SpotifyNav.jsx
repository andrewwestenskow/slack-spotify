import React from 'react'
import { NavLink } from 'react-router-dom'

const SpotifyNav = props => {
  return (
    <div className="Spotify-Nav">
      <NavLink
        activeClassName="spotify-nav-link-active"
        className="spotify-nav-link"
        to="/user/spotify/dashboard"
      >
        Dashboard
      </NavLink>
      <NavLink
        activeClassName="spotify-nav-link-active"
        className="spotify-nav-link"
        to="/user/spotify/library/albums"
      >
        Albums
      </NavLink>
      <NavLink
        activeClassName="spotify-nav-link-active"
        className="spotify-nav-link"
        to="/user/spotify/library/artists"
      >
        Artists
      </NavLink>
    </div>
  )
}
export default SpotifyNav
