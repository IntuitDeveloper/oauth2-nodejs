import React, {useState} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Profile from "./components/pages/Profile";
import LoginSuccess from './components/pages/Auth/LoginSuccess'
import ForgotPassword from './components/pages/Auth/ForgotPassword';
import ResetPassword from './components/pages/Auth/ResetPassword';
import Login from './components/pages/Auth/Login'
import Landing from './components/pages/Landing'
// connect.sid
import PrivateRoute from "./PrivateRoute";
// import Dashboard from './components/pages/Dashboard/Dashboard';
const App = ()=> {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/login/error">Error logging in!</Route>
          <Route exact path="/login/success" component={LoginSuccess}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/forgot-password" component={ForgotPassword}/>
          <Route exact path="/reset-password" component={ResetPassword}/>
          {/* <PrivateRoute exact path="/profile" component={Profile}/> */}
          {/* <Route exact path="/dashboard" component={Dashboard}/> */}
        </Switch>
      </div>
    </Router>

  );
}

export default App;
