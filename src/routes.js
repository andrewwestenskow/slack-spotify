import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HandleCallback from './Components/HandleCallback'
import AppContainer from './Containers/AppContainer/AppContainer'
import DashboardContainer from './Containers/DashboardContainer/DashboardContainer'

export default (
  <Switch>
    <Route exact path="/" component={AppContainer} />
    <Route path="/callback" component={HandleCallback} />
    <Route path="/dashboard" component={DashboardContainer} />
  </Switch>
)
