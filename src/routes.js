import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import HandleCallback from './Components/HandleCallback'
import AppContainer from './Containers/AppContainer/AppContainer'
import DashboardContainer from './Containers/DashboardContainer/DashboardContainer'

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/callback" component={HandleCallback} />
    <Route
      path="/auth"
      component={() => (
        <AppContainer>
          <Switch>
            <Route path="/auth/dashboard" component={DashboardContainer} />
          </Switch>
        </AppContainer>
      )}
    />
  </Switch>
)
