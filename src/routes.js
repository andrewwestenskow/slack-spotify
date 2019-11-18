import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import HandleCallback from './Components/HandleCallback'
import AppContainer from './Containers/AppContainer/AppContainer'
import DashboardContainer from './Containers/DashboardContainer/DashboardContainer'
import ArtistContainer from './Containers/ArtistContainer/ArtistContainer'
import AlbumContainer from './Containers/AlbumContainer/AlbumContainer'
import PlaylistContainer from './Containers/PlaylistContainer/PlaylistContainer'

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/callback" component={HandleCallback} />
    <Route
      path="/user"
      component={() => (
        <AppContainer>
          <Switch>
            <Route
              path="/user/spotify/dashboard"
              component={DashboardContainer}
            />
            <Route
              path="/user/spotify/artist/:id"
              component={ArtistContainer}
            />
            <Route path="/user/spotify/album/:id" component={AlbumContainer} />
            <Route
              path="/user/spotify/playlist/:id"
              component={PlaylistContainer}
            />
          </Switch>
        </AppContainer>
      )}
    />
  </Switch>
)
