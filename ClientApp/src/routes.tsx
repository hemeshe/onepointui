import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { DataIngestion } from './pages/data-ingestion';
import { Home } from './pages/home';
import { Mapping } from './pages/mapping';
// import { Commentary } from "./pages/commentary";
import { NewRequest } from './pages/mapping/components/new-request';
import { CallbackPage } from './pages/sso-callback';
import { UnAuthorized } from './pages/unauthorized';
import { NoPermission } from './pages/no-permission';
import { Admin } from './pages/admin';
// import { PoweBiDrls } from "./pages/power-bi-drls";

import { PrivateRoute } from './components/private-route';

const Routes = () => (
  <Switch>
    <Redirect exact path='/' to='/home' />
    <PrivateRoute path='/home'>
      <Home />
    </PrivateRoute>
    <PrivateRoute path='/data-ingestion'>
      <DataIngestion />
    </PrivateRoute>
    <PrivateRoute path='/mapping/new-request'>
      <NewRequest />
    </PrivateRoute>
    <PrivateRoute path='/mapping'>
      <Mapping />
    </PrivateRoute>
    {/* <PrivateRoute path="/commentary">
      <Commentary />
    </PrivateRoute> */}
    <PrivateRoute path='/admin'>
      <Admin />
    </PrivateRoute>
    {/* <PrivateRoute path="/power-bi-drls">
      <PoweBiDrls />
    </PrivateRoute> */}
    <Route path='/callback'>
      <CallbackPage />
    </Route>
    <Route path='/unauthorized'>
      <UnAuthorized />
    </Route>
    <Route path='/no-permission'>
      <NoPermission />
    </Route>
  </Switch>
);

export default Routes;
