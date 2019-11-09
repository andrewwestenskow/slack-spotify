import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import HandleCallback from './Components/HandleCallback'
import AppContainer from './Containers/AppContainer/AppContainer'
import DashboardContainer from './Containers/DashboardContainer/DashboardContainer'
import ArtistContainer from './Containers/ArtistContainer/ArtistContainer'

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
          </Switch>
        </AppContainer>
      )}
    />
  </Switch>
)
